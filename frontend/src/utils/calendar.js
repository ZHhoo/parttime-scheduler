export function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function getMonthMatrix(baseDate) {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayWeekIndex = firstDayOfMonth.getDay();

    const startDate = new Date(year, month, 1 - firstDayWeekIndex);

    const today = new Date();
    const todayKey = formatDateKey(today);

    const weeks = [];
    let current = new Date(startDate);

    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
        const week = [];

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const dateCopy = new Date(
                current.getFullYear(),
                current.getMonth(),
                current.getDate()
            );

            const dateKey = formatDateKey(dateCopy);

            week.push({
                date: dateCopy,
                dateKey,
                isCurrentMonth: dateCopy.getMonth() === month,
                isToday: dateKey === todayKey,
            });

            current.setDate(current.getDate() + 1);
        }

        weeks.push(week);
    }

    return {
        year,
        month,
        weeks,
    };
}

export function formatMonthTitle(baseDate) {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth() + 1;
    return `${year}년 ${month}월`;
}
