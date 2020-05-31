import auth0 from "auth0-js"
import { navigate } from "gatsby"
const Auth0_VARS = {
    "domain": "ddev-prnks3bk.auth0.com",
    "clientId": "ooDBpqK4ZEn8eJJ5yqogDOQRakb6oDbl",
    "callback": "http://localhost:8000/callback",
 //   "audience": process.env.AUTH0_AUDIENCE!,
    "responseType": "token id_token",
    "scope": "openid email profile",
}

const isBrowser = typeof window !== "undefined"

console.log('kdl ', isBrowser, process.env.GATSBY_AUTH0_DOMAIN);
const auth = isBrowser
  ? new auth0.WebAuth({
      domain: Auth0_VARS.domain,
      clientID: Auth0_VARS.clientId,
      redirectUri: Auth0_VARS.callback,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {};

// insert after auth const
var tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
    if (!isBrowser) {
        return;
    }

    return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
    if (!isBrowser) {
        return
    }

    auth.authorize()
}

const setSession = (cb = () => {}) => (err, authResult) => {
    if (err) {
        navigate("/")
        cb()
        return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        tokens.accessToken = authResult.accessToken
        tokens.idToken = authResult.idToken
        tokens.expiresAt = expiresAt
        user = authResult.idTokenPayload
        localStorage.setItem("isLoggedIn", true)
        console.log('kdl nav to protected')
        navigate("/protected")
        cb()
    }
}

export const silentAuth = callback => {
    if (!isAuthenticated()) return callback();
    auth.checkSession({}, setSession(callback));
}

export const handleAuthentication = () => {
    if (!isBrowser) {
        return;
    }

    auth.parseHash(setSession())
}

export const getProfile = () => {
    return user
}