// External imports
import {useAuth} from "react-oidc-context";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// Local imports
import "./globals.css";
import Home from "@components/pages/Home/Home.tsx";
import Error from "@pages/Error/Error.tsx";
import MainLayout from "@organisms/MainLayout.tsx";
import Login from "@pages/Login/Login.tsx";
import Profile from "@pages/Profile/Profile.tsx";
import PrivateRoute from "@shared/PrivateRoute.tsx";

function App() {
    const auth = useAuth();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout/>,
            errorElement: <Error/>,
            children: [
                // Public routes
                {path: "/", element: <Home user={auth.user}/>},
                {path: "/auth/oauth2/login", element: <Login auth={auth}/>},
                {
                    element: <PrivateRoute/>,
                    children: [
                        {path: "/profile", element: <Profile user={auth.user}/>},
                    ],
                },
            ],
        },
        // callback OIDC
        {
            path: "/authentication/callback",
            element: <div>Processing the connexion...</div>, // callback component
        },
        {
            path: "/authentication/silent_callback",
            element: <div>Silent renewal...</div>, // silence callback
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
