import { useState } from "react";

function RegisterPage() {
    const [loginId, setLoginId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("회원가입 시도:", loginId, name, password);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디</label>
                    <input
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                </div>
                <div>
                    <label>이름</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;
