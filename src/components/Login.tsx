import "../css/LogSig.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode, JwtPayload} from "jwt-decode";
import axios from "../services/api";

const LOGIN_URL = "/api/auth/login";

interface CustomJwtPayload extends JwtPayload {
    id: string;
}

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

            console.log("Logged user: ", JSON.stringify(response.data));    //converts response to JS Object
            alert("Logged in successfully!");

            const token = response.data.token;
            localStorage.setItem("token", token);     //store token in localStorage if login is successful

            const decoded = jwtDecode<CustomJwtPayload>(token)
            console.log(decoded.id);
            localStorage.setItem("userId", decoded.id);

            navigate(`/user`);   //redirects to UserPage

        } catch (e: any) {
            console.error("Error logging account: ", e.response?.data || e.message);
            setError(e?.response?.data?.message || "Error login in account");
        }
    };

    //const changeLoginButton = async () => {}

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
                           type="password"
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