import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/core/modules/auth/hooks/useUser";

const PrivateRoute = () => {
    const { user } = useUser();

    const isAuth = !!user;
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
