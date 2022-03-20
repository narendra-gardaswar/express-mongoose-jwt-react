import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handlelogin = async () => {
    let result = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.auth && result.user.name) {
      alert("login successful");
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("login failed");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter Email"
      />
      <input
        type="password"
        className="inputBox"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      />
      <button className="appButton" type="button" onClick={handlelogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
