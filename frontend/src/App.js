import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("pt_user");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUser(parsed);
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem("pt_user");
        setUser(null);
    };

    if (!user) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 16px",
                    borderBottom: "1px solid #ddd",
                    marginBottom: "8px"
                }}
            >
                <div>
                    <strong>{user.name}</strong> 님
                </div>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
            <SchedulePage user={user} />
        </div>
    );
}

export default App;
