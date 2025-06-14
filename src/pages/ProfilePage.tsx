import "../css/ProfilePage.css";
import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
//import { useAuth } from "../contexts/AuthContext.tsx";
//import axios from "axios";

//const navigate = useNavigate();

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  //const {userId} = useAuth();
  //const [error, setError] = useState('');

  // const token = localStorage.getItem("token");

  //const UPDATE_URL = `/api/user/${userId}`;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /*try {
            await axios.put(UPDATE_URL, {name, password}, {
                headers: {Authorization: `Bearer ${token}`},
            });

            navigate('/user');
        } catch (e:any){
            console.error("Error updating user: ", e.response?.data || e.message);
            setError(e?.response?.data?.message || "Error updating account");
        }
        */
  };

  return (
    <div>
      <Header />
      <Outlet />

      <div className={"edit-profile"}>
        <form className={"update-form"} onSubmit={handleUpdate}>
          <input
            className={"update-input"}
            type="text"
            placeholder={"Username"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className={"update-input"}
            type="text"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={"update-button"} type="submit">
            save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
