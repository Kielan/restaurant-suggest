import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
  ::selection {
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.primary.contrast};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  html, body, #__next {
    color: ${(props) => props.theme.palette.text.primary};
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-size: ${(props) => props.theme.typography.fontSize};
    font-weight: 300;
    height: 100%;
    margin: 0;
  }
  
    
  li {
    list-style: none;
  }
  
  a,
  a:hover,
  a:visited {
    color: ${(props) => props.theme.hyperlink.color.main};
    cursor: pointer;
    text-decoration: ${(props) => props.theme.hyperlink.decoration};

    &[disabled] {
      color: ${(props) => props.theme.hyperlink.color.light};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

Reset.displayName = 'Reset';

export default Reset;