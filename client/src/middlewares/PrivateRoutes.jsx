import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token") !== null; // Check for token presence console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to='/dash' />;
};

export default PrivateRoute;
