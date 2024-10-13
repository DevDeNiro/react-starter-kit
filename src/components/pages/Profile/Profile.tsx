import { User } from "oidc-client-ts";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ProfileWrapper } from "@pages/Profile/Profile.styled.tsx";

interface ProfileProps {
    user?: User | null;
}

const Profile: FC<ProfileProps> = ({ user }) => {
    const location = useLocation();

    if (!user) {
        return <Navigate to={"/"} state={{ from: location }} replace />;
    }

    return (
        user && (
            <ProfileWrapper>
                <h1>{user.profile.name}</h1>
                <p>Username: {user.profile.sub}</p>
                <p>Email: {user.profile.email}</p>
            </ProfileWrapper>
        )
    );
};

export default Profile;
