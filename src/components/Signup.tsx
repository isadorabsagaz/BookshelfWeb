import "../css/LogSig.css";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState('');
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
                body: JSON.stringify({name: name, email: email, password: password}),
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
            <div className={"log-sub-container"}>
                {error && <p style={{color: "red"}}>{error}</p>}

                <p>Sign up to Bookshelf</p>

                <form className={"log-sub-form"} onSubmit={handleSignup}>

                    <input className={"log-sub-input"}
                           type="text"
                           placeholder="Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required
                    />

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
                            type="submit">Sign up</button>

                </form>
            </div>
        </div>
    );
};

export default Signup;