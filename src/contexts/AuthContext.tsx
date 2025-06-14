import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  id: string;
}

interface AuthContextProps {
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        setUserId(decoded.id);
      } catch (err) {
        console.log("Invalid token: ", err);
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setUserId(decoded.id);
      localStorage.setItem("token", token);
    } catch (err) {
      console.log("Error decoding token: ", err);
    }
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No auth context.");
  return context;
};
