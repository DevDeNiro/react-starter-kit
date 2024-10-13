import { UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";

const oidcConfig: UserManagerSettings = {
    authority: "https://localhost:5001/iamconfiguration",
    client_secret: "secret",
    client_id: "react",
    redirect_uri: "http://localhost:3000/authentication/callback",
    loadUserInfo: true,
    client_authentication: "client_secret_post",
    scope: "openid profile email api",
    userStore: new WebStorageStateStore({ store: window.localStorage }),

    response_type: "code",
    post_logout_redirect_uri: "http://localhost:3000/",
    automaticSilentRenew: true,
    silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
    filterProtocolClaims: true,
};

export default oidcConfig;
