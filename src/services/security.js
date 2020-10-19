import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
    authority: "https://buckler.highgroundvision.com/",
    client_id: "js",
    response_type: "code",
    scope: "openid api discord steam",
    redirect_uri: "https://localhost:8080/callback",
    post_logout_redirect_uri: "https://localhost:8080/",
})

export default mgr;