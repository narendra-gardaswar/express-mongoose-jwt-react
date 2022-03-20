import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const dataCollect = async () => {
    let result = await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();

    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter name"
      />
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter email"
      />
      <input
        type="password"
        className="inputBox"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter password"
      />
      <button type="button" className="appButton" onClick={dataCollect}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
