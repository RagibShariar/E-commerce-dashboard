import PropTypes from "prop-types";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
