import {UserManagerSettings, WebStorageStateStore} from "oidc-client-ts";

const oidcConfig: UserManagerSettings = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY ?? "https://localhost:5001/iamconfiguration",
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID ?? "react",
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI ?? "http://localhost:4200/authentication/callback",
    loadUserInfo: true,
    scope: "openid profile email api",
    userStore: new WebStorageStateStore({store: window.localStorage}),
    response_type: "code",
    post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI ?? "http://localhost:4200/",
    automaticSilentRenew: true,
    silent_redirect_uri: import.meta.env.VITE_OIDC_SILENT_REDIRECT_URI ?? "http://localhost:4200/authentication/silent_callback",
    filterProtocolClaims: true,
    monitorSession: true,
    checkSessionIntervalInSeconds: 10000, // 10s
    revokeTokensOnSignout: true,
};

export default oidcConfig;