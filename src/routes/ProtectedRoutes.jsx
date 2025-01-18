import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
