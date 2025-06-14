import "../css/LogSig.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import axios from "../services/api";

const LOGIN_URL = "/api/auth/login";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //request HTTP POST to backend server to auth user
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }), { withCredentials: true }
      );

      const token = response.data.token;
      login(token);
      alert("Logged in successfully!");
      navigate(`/user`);   //redirects to UserPage

    } catch (e: any) {
      console.error("Error logging account: ", e.response?.data || e.message);
      setError(e?.response?.data?.message || "Error login in account");
    }
  };

  return (
    <div>
      <div className={"log-sub-container"}>

        <div className={"error"}>
          {error && <p>{error}</p>}
        </div>

        <p>Logar na sua conta</p>

        <form className={"log-sub-form"} onSubmit={handleLogin}>

          <input className={"log-sub-input"}
                 type="text"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
          />

          <input className={"log-sub-input"}
                 type="password"
                 placeholder="Senha"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
          />

          <button className={"log-sub-button"}
                  type="submit">Entrar
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;