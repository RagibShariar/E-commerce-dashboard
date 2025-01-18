import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { logout } from "../redux/features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
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
