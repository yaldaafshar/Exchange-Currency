import { useState } from "react";
import { handleLogin } from "../Services/login-logout";
import { useSessionUser } from "../Services/userContext";

const LoginLogout = () => {
  const [username, setUsername] = useState("");
  const context = useSessionUser();
  const login = async () => {
    const user = await handleLogin(username);
    context.setUser(user);
  };

  const handleLogout = async () => {
    const response = await fetch("/logout", { method: "POST" });
    if (response.ok) {
      const res = await response.json();
      console.log("logged out message:-->", res);

      if (res.message == "Logout Successul") {
        context.setUser(undefined);
      }
    } else {
      const error = await response.json();
      console.log("Error--->", error);
    }
  };
  return (
    <div
      style={{
        width: "vw",
        backgroundColor: "#ADD8E6",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 8,
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <input
          style={{ borderRadius: 4 }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button style={{ padding: 4, borderRadius: 4 }} onClick={() => login()}>
          Login
        </button>
        <button style={{ padding: 4, borderRadius: 4 }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoginLogout;
