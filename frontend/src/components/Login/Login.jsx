import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      console.log("Login successful:", data);
      navigate("/admin");
    } catch (err) {
      setError("Invalid username or password.");
      console.error("Error during login:", err);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleLogin}>
        <div className={style.username}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onMouseDown={() => setError("")}
          />
        </div>
        <div className={style.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onMouseDown={() => setError("")}
          />
        </div>
        {error && <p className={style.error}>{error}</p>}
        <button type="submit" className={style.signInButton}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
