/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import "./layout.css";
import { ThemeProvider } from "./theme-provider";

const StyledMain = styled.main`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div
        style={{
          height: '100%',
          marginTop: `6.0875rem`,
          margin: `1.0875rem 0 auto`,
          maxWidth: 960,
          padding: `1.0875rem 1.45rem 1.0875rem 1.45rem`,
          flexDirection: 'column',
         // alignItems: 'center',
          justifyContent: 'flex-start',
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <StyledMain>{children}</StyledMain>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
