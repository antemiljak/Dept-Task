import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-lg p-4">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-center mx-2">
          <Globe size={24} />
          <h1 className="m-2 text-xl font-bold">Countries Fetching App</h1>
        </div>
        {isLoggedIn && (
          <button onClick={logout} className="btn-primary bg-rose-500 px-2">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
