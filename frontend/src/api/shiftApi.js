import client from "./client";

export async function fetchShifts(startDate, endDate) {
    const res = await client.get("/shifts", {
        params: { startDate, endDate }
    });
    return res.data;
}

export async function createShift(shift) {
    const res = await client.post("/shifts", shift);
    return res.data;
}

export async function updateShift(id, shift) {
    const res = await client.put(`/shifts/${id}`, shift);
    return res.data;
}

export async function deleteShift(id) {
    await client.delete(`/shifts/${id}`);
}
