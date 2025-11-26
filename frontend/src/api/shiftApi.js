import client from "./client";

// 근무 목록 조회
export async function fetchShifts(userId, startDate, endDate) {
    const res = await client.get("/shifts", {
        params: { userId, startDate, endDate },
    });
    return res.data;
}

// 근무 생성
export async function createShift(userId, shift) {
    // shift: { date, startTime, endTime, memo, jobType }
    const res = await client.post("/shifts", shift, {
        params: { userId },
    });
    return res.data;
}

// 근무 수정
export async function updateShift(userId, id, shift) {
    const res = await client.put(`/shifts/${id}`, shift, {
        params: { userId },
    });
    return res.data;
}

// 근무 삭제
export async function deleteShift(userId, id) {
    await client.delete(`/shifts/${id}`, {
        params: { userId },
    });
}
