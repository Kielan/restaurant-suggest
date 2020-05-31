import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { AuthService, useAuth } from "gatsby-theme-auth0";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Protected from './protected';
import {Auth0Provider} from '../components/auth0-provider';

const Auth0_VARS = {
  "domain": "ddev-prnks3bk.auth0.com",
  "clientId": "ooDBpqK4ZEn8eJJ5yqogDOQRakb6oDbl",
  "callback": "dev-prnks3bk.auth0.com/login",
}

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const IndexPage = () => {
  const { isLoggedIn, profile } = useAuth();

  return (
    <Layout>
      <SEO title="Home" />
      <button onClick={AuthService.login}>Login</button>
    </Layout>
  )
}

export default IndexPage;
{/* <Auth0Provider
domain={Auth0_VARS.domain}
client_id={Auth0_VARS.clientId}
redirect_uri={window.location.origin}
onRedirectCallback={onRedirectCallback}
> */}