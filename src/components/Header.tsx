import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { toast } from "react-toastify";
import bookshelfLogo from "../assets/BookshelfIcon.svg";
import axios from "../services/api";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const {t} = useTranslation()

  const handleDownloadPDF = async () => {
    const token = localStorage.getItem("token");
    const PDF_URL = `api/user/${userId}/books/pdf`;

    if (!userId || !token) {
      toast.error("Usuário não autenticado!");
      return;
    }

    const downloadPromise = axios.get(PDF_URL, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.promise(downloadPromise, {
      pending: "Gerando PDF...",
      success: "Download concluído!",
      error: "Erro ao gerar o PDF",
    });

    try {
      const response = await downloadPromise;

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookshelf.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.log("Erro ao baixar PDF: ", err.response?.data || err.message);
      toast.error("Erro ao baixar o PDF");
    }
  };

  return (
    <div>
      <header className="app-header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={bookshelfLogo} alt="bookshlf icon" />
          <p className={"title"}>Bookshelf</p>
        </div>

        {!userId ? (
          <button className={"log-button"} onClick={() => navigate("/login")}>
            {t('login_button')}
          </button>
        ) : (
          <>
            <div className={"user-buttons"}>
              <button
                className={"log-button"}
                onClick={() => navigate("/user")}
              >
                {t('your_profile')}
              </button>
              <button className={"log-button"} onClick={handleDownloadPDF}>
                PDF
              </button>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
