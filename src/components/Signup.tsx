import "../css/LogSig.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { toast } from "react-toastify";

const SIGNUP_URL = "/api/auth/signup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ name, email, password }),
        { withCredentials: true },
      );

      console.log("Created user: ", JSON.stringify(response.data));
      toast.success("Conta criada com sucesso!");

      navigate("/login"); //redirect to login page after sign up
    } catch (e: any) {
      console.error("Error creating account: ", e.response?.data || e.message);
      setError(e?.response?.data?.message || "Error creating account");
    }
  };

  return (
    <div>
      <div className={"log-sub-container"}>
        <div className={"error"}>{error && <p>{error}</p>}</div>

        <p>Inscreva-se na Bookshelf</p>

        <form className={"log-sub-form"} onSubmit={handleSignup}>
          <input
            className={"log-sub-input"}
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className={"log-sub-input"}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={"log-sub-input"}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={"log-sub-button"} type="submit">
            Inscreva-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
