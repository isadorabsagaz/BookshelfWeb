import "../css/LogSig.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../services/api";

const LOGIN_URL = "/api/auth/login";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            //request HTTP POST to backend server to auth user
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email, password}), {withCredentials: true}
            );

            console.log("Logged user: ", JSON.stringify(response.data));
            alert("Logged in successfully!");     //converts response to JS Object

            localStorage.setItem("token", response.data.token);  //store token in localStorage if login is successful
            navigate("/");   //redirects to App

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

                <p>Log in to your account</p>

                <form className={"log-sub-form"} onSubmit={handleLogin}>

                    <input className={"log-sub-input"}
                           type="text"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                    />

                    <input className={"log-sub-input"}
                           type="text"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />

                    <button className={"log-sub-button"}
                            type="submit">Log in
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;