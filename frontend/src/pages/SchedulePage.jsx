import { useState, useMemo, useEffect } from "react";
import { getMonthMatrix, formatMonthTitle, formatDateKey } from "../utils/calendar";
import {
    fetchShifts,
    createShift,
    updateShift,
    deleteShift
} from "../api/shiftApi";

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

function groupShiftsByDate(shifts) {
    const map = {};
    shifts.forEach((shift) => {
        const dateKey = shift.date; 
        if (!map[dateKey]) {
            map[dateKey] = [];
        }
        map[dateKey].push(shift);
    });
    return map;
}

function SchedulePage() {
    const [currentMonthDate, setCurrentMonthDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const [shiftsByDate, setShiftsByDate] = useState({});

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDateKey, setSelectedDateKey] = useState(null);
    const [editingShiftId, setEditingShiftId] = useState(null);
    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
        memo: ""
    });

    const { year, month, weeks } = useMemo(
        () => getMonthMatrix(currentMonthDate),
        [currentMonthDate]
    );

    const handlePrevMonth = () => {
        setCurrentMonthDate((prev) => {
            return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
        });
    };

    const handleNextMonth = () => {
        setCurrentMonthDate((prev) => {
            return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
        });
    };

    useEffect(() => {
        async function loadShifts() {
            try {
                const monthStart = new Date(year, month, 1);
                const monthEnd = new Date(year, month + 1, 0);

                const startDateStr = formatDateKey(monthStart);
                const endDateStr = formatDateKey(monthEnd);

                const shifts = await fetchShifts(startDateStr, endDateStr);

                console.log("📦 loaded from server:", shifts); 

                const grouped = groupShiftsByDate(shifts);
                setShiftsByDate(grouped);
            } catch (err) {
                console.error(err);
                alert("근무 정보를 불러오지 못했습니다.");
            }
        }

        loadShifts();
    }, [year, month]);

    const handleOpenAddShift = (dateKey) => {
        setSelectedDateKey(dateKey);
        setEditingShiftId(null);
        setForm({
            startTime: "",
            endTime: "",
            memo: ""
        });
        setModalOpen(true);
    };

    const handleOpenEditShift = (dateKey, shift) => {
        setSelectedDateKey(dateKey);
        setEditingShiftId(shift.id);
        setForm({
            startTime: shift.startTime,
            endTime: shift.endTime,
            memo: shift.memo || ""
        });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDateKey(null);
        setEditingShiftId(null);
    };

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveShift = async (e) => {
        e.preventDefault();
        if (!selectedDateKey) return;

        if (!form.startTime || !form.endTime) {
            alert("시작시간과 종료시간을 입력해주세요.");
            return;
        }

        try {
            let saved;

            if (editingShiftId == null) {
                saved = await createShift({
                    date: selectedDateKey,
                    startTime: form.startTime,
                    endTime: form.endTime,
                    memo: form.memo
                });

                setShiftsByDate((prev) => {
                    const oldList = prev[selectedDateKey] || [];
                    return {
                        ...prev,
                        [selectedDateKey]: [...oldList, saved]
                    };
                });
            } else {
                saved = await updateShift(editingShiftId, {
                    date: selectedDateKey,
                    startTime: form.startTime,
                    endTime: form.endTime,
                    memo: form.memo
                });

                setShiftsByDate((prev) => {
                    const oldList = prev[selectedDateKey] || [];
                    const newList = oldList.map((shift) =>
                        shift.id === editingShiftId ? saved : shift
                    );
                    return {
                        ...prev,
                        [selectedDateKey]: newList
                    };
                });
            }

            handleCloseModal();
        } catch (err) {
            console.error(err);
            alert("근무 저장 중 오류가 발생했습니다.");
        }
    };

    const handleDeleteShift = async () => {
        if (editingShiftId == null || !selectedDateKey) {
            handleCloseModal();
            return;
        }

        const ok = window.confirm("이 근무를 삭제할까요?");
        if (!ok) return;

        try {
            await deleteShift(editingShiftId);

            setShiftsByDate((prev) => {
                const oldList = prev[selectedDateKey] || [];
                const newList = oldList.filter((shift) => shift.id !== editingShiftId);

                const newState = { ...prev };
                if (newList.length === 0) {
                    delete newState[selectedDateKey];
                } else {
                    newState[selectedDateKey] = newList;
                }
                return newState;
            });

            handleCloseModal();
        } catch (err) {
            console.error(err);
            alert("근무 삭제 중 오류가 발생했습니다.");
        }
    };

    const selectedDateLabel = selectedDateKey || "";

    return (
        <div style={{ padding: "20px" }}>
            <h1>아르바이트 스케줄러</h1>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "20px",
                    marginBottom: "10px"
                }}
            >
                <button onClick={handlePrevMonth}>◀</button>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {formatMonthTitle(currentMonthDate)}
                </div>
                <button onClick={handleNextMonth}>▶</button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "8px",
                    marginBottom: "4px"
                }}
            >
                {dayNames.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "4px"
                }}
            >
                {weeks.map((week) =>
                    week.map((day) => {
                        const dayNumber = day.date.getDate();
                        const isWeekend =
                            day.date.getDay() === 0 || day.date.getDay() === 6;

                        let textColor = "#333";
                        if (!day.isCurrentMonth) {
                            textColor = "#aaa";
                        } else if (isWeekend) {
                            textColor = "#d9534f";
                        }

                        const borderColor = day.isToday ? "#007bff" : "#ddd";

                        const dateShifts = shiftsByDate[day.dateKey] || [];

                        return (
                            <div
                                key={day.dateKey}
                                style={{
                                    minHeight: "90px",
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: "4px",
                                    padding: "4px",
                                    fontSize: "14px",
                                    position: "relative",
                                    backgroundColor: day.isToday ? "#e9f3ff" : "white",
                                    boxSizing: "border-box",
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                                onClick={() => {
                                    handleOpenAddShift(day.dateKey);
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        color: textColor,
                                        marginBottom: "4px"
                                    }}
                                >
                                    {dayNumber}
                                </div>

                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#333",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px"
                                    }}
                                >
                                    {dateShifts.map((shift) => (
                                        <div
                                            key={shift.id}
                                            style={{
                                                padding: "2px 4px",
                                                borderRadius: "3px",
                                                border: "1px solid #ccc",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEditShift(day.dateKey, shift);
                                            }}
                                        >
                                            {shift.startTime}~{shift.endTime}{" "}
                                            {shift.memo}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {modalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            minWidth: "280px"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
                            {editingShiftId == null ? "근무 추가" : "근무 수정"}
                        </h2>
                        <div
                            style={{
                                fontSize: "12px",
                                marginBottom: "8px",
                                color: "#666"
                            }}
                        >
                            날짜: {selectedDateLabel}
                        </div>
                        <form onSubmit={handleSaveShift}>
                            <div style={{ marginBottom: "8px" }}>
                                <label
                                    style={{ display: "block", marginBottom: "4px" }}
                                >
                                    시작 시간 (HH:MM)
                                </label>
                                <input
                                    name="startTime"
                                    value={form.startTime}
                                    onChange={handleChangeForm}
                                    placeholder="18:00"
                                    style={{ width: "100%", boxSizing: "border-box" }}
                                />
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                                <label
                                    style={{ display: "block", marginBottom: "4px" }}
                                >
                                    종료 시간 (HH:MM)
                                </label>
                                <input
                                    name="endTime"
                                    value={form.endTime}
                                    onChange={handleChangeForm}
                                    placeholder="22:00"
                                    style={{ width: "100%", boxSizing: "border-box" }}
                                />
                            </div>
                            <div style={{ marginBottom: "12px" }}>
                                <label
                                    style={{ display: "block", marginBottom: "4px" }}
                                >
                                    메모
                                </label>
                                <input
                                    name="memo"
                                    value={form.memo}
                                    onChange={handleChangeForm}
                                    placeholder="근무 내용 / 장소 등"
                                    style={{ width: "100%", boxSizing: "border-box" }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "8px"
                                }}
                            >
                                {editingShiftId != null && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteShift}
                                        style={{ color: "red" }}
                                    >
                                        삭제
                                    </button>
                                )}
                                <button type="button" onClick={handleCloseModal}>
                                    취소
                                </button>
                                <button type="submit">저장</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SchedulePage;
