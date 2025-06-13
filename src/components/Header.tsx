import "../css/Header.css";
import bookshelfLogo from "../assets/BookshelfIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";


const Header = () => {

  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const PDF_URL = `api/user/${userId}/books/pdf`;

    if (!userId || !token) {
      alert("User not authenticated!");
      return;
    }

    try {
      const response = await axios.get(PDF_URL, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`
          },
      });

      const blob = new Blob([response.data], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookshelf.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err: any){
      console.log("Erro ao baixar PDF: ", err.response?.data || err.message);
      alert("Erro ao baixar o PDF");
    }
  };

  return (
    <div>
      <header className="app-header">

        <div className="logo"
             onClick={() => navigate("/")}>

          <img src={bookshelfLogo} alt="bookshlf icon"/>
          <p className={"title"}>Bookshelf</p>

        </div>
        <button className={"log-button"}
                onClick={() => navigate('/login')}
        >Log in
        </button>
        <button className={"log-button"}
                onClick={handleDownloadPDF}
        >
          PDF
        </button>
      </header>
    </div>
  );
};

export default Header;