import { useLocation, useNavigate } from "react-router";
import { Button } from "reactstrap";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/login", { state: { from: location.pathname } });
  };
  return (
    <>
      <nav className="py-3 px-4 border-bottom bg-primary text-white d-flex align-items-center justify-content-end">
        <Button onClick={handleLogout} className=" btn-danger ">
          Logout
        </Button>
      </nav>
    </>
  );
};

export default Header;
