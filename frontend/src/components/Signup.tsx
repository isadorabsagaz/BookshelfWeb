import "../css/Signup.css";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: username, email: email, password: password}),
            });

            if (!response.ok) {
                throw new Error("Error creating account");
            }

            navigate("/login");   //redirect to login page after sign up
        } catch (e:any) {
            setError(e?.response?.data?.error || "Error creating account");
        }
    };

    return (
        <div>
            <div className={"signup-container"}>
                {error && <p style={{color: "red"}}>{error}</p>}
                <form onSubmit={handleSignup}>
                    <input type="text"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required
                    />

                    <input type="text"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                    />

                    <input type="text"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                    />

                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;