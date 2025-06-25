import "../css/ProfilePage.css";
import Header from "../components/Header.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import axios from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { userId } = useAuth();
  const {t} = useTranslation()

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const UPDATE_URL = `/api/user/${userId}`;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(UPDATE_URL, { name, password }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Informações atualizadas!");
      navigate('/user');
    } catch (e: any) {
      toast.error("Não foi possível atualizar as informações");
      console.error("Error updating user: ", e.response?.data || e.message);
    }
  };

  return (
    <div>
      <Header/>
      <Outlet/>

      <div className={"edit-profile"}>
        {t('edit_profile')}
        <form className={"update-form"} onSubmit={handleUpdate}>
          <input
            className={"update-input"}
            type="text"
            placeholder={t('new_name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className={"update-input"}
            type="password"
            placeholder={t('new_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={"update-button"} type="submit">
            {t('save_changes')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
