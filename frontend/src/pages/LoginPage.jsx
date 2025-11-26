import { useState } from "react";
import { login } from "../api/loginApi";

function LoginPage({ onLoginSuccess }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(loginId, password);
            localStorage.setItem("pt_user", JSON.stringify(data));

            onLoginSuccess(data);
        } catch (err) {
            console.error(err);
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5"
            }}
        >
            <div
                style={{
                    width: "320px",
                    padding: "24px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
            >
                <h2 style={{ marginTop: 0, marginBottom: "16px", textAlign: "center" }}>
                    아르바이트 스케줄러 로그인
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "12px" }}>
                        <label
                            style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
                        >
                            아이디
                        </label>
                        <input
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "8px"
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                        <label
                            style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "8px"
                            }}
                        />
                    </div>
                    {error && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "13px",
                                marginBottom: "8px"
                            }}
                        >
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#007bff",
                            color: "white",
                            fontSize: "15px",
                            cursor: "pointer"
                        }}
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
