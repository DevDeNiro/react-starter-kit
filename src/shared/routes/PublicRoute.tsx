import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/core/modules/auth/hooks/useUser";

const PublicRoute = () => {
    const { user } = useUser();

    return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
