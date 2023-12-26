import { useLocation, Navigate } from "react-router-dom";

const InsteadRoute = () => {
    let { pathname } = useLocation();
    // console.log(pathname);
    if (pathname === "/account" || pathname === "/account/") {
        return <Navigate to='/account/edit-profile' />;
    }
};

export default InsteadRoute;
