import "../css/Login.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            //request HTTP POST to backend server to auth user
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},                      //request in form of JSON
                body: JSON.stringify({email: email, password: password}),     //JSON with {email, password}
            });

            if (!response.ok) {
                throw new Error("User not registered");
            }

            const data = await response.json();         //converts response to JS Object
            localStorage.setItem("token", data.token);  //store token in localStorage if login is successful
            navigate("/");                          //redirects to App
        } catch (e: any) {
            setError(e.message?.response?.data?.error || "Error login in account");
        }
    };

    return (
        <div>
            <div className={"login-container"}>
                {error && <p style={{color: "red"}}>{error}</p>}

                <p>Log in to your account</p>

                <form className={"login-form"} onSubmit={handleLogin}>

                    <input className={"login-input"}
                           type="text"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                    />

                    <input className={"login-input"}
                           type="text"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />

                    <button className={"login-button"}
                            type="submit">Log in</button>
                </form>

            </div>
        </div>
    );
};

export default Login;