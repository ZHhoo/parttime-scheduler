import client from "./client";

export async function fetchShifts(startDate, endDate) {
    const res = await client.get("/shifts", {
        params: { startDate, endDate }
    });
    return res.data;
}

export async function createShift({ date, startTime, endTime, memo }) {
    const res = await client.post("/shifts", {
        date,
        startTime,
        endTime,
        memo
    });
    return res.data;
}

export async function updateShift(id, { date, startTime, endTime, memo }) {
    const res = await client.put(`/shifts/${id}`, {
        date,
        startTime,
        endTime,
        memo
    });
    return res.data;
}

export async function deleteShift(id) {
    await client.delete(`/shifts/${id}`);
}
