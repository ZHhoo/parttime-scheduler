import client from "./client";

export async function login(loginId, password) {
    const res = await client.post("/login", {
        loginId,
        password
    });
    return res.data; // { id, loginId, name }
}
