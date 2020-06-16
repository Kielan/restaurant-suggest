import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  background: {
    primary: {
      contrast: '#515151',
      light: '#ffffff',
      main: '#ffffff',
    },
    secondary: {
      contrast: '#8098ba',
      light: '#f2f3f8',
      main: '#f2f3f8',
    },
  },
  button: {
    background: '#ffffff',
    backgroundDisabled: '#eeeeee',
    borderColor: '#e1e1e1',
    borderRadius: '1.3125rem',
    borderStyle: 'solid',
    borderWidth: '0.0625rem',
    fontSize: '1rem',
    fontWeight: '400',
    margin: '0',
    padding: '0.625rem 1rem',
    squaredBorderRadius: '0.25rem',
  },
  dropdownMenu: {
    menuItem: {
      alert: {
        color: '#d2063a',
        hoverBackground: '#e7eeff',
        hoverColor: '#d2063a',
      },
      default: {
        color: '#325b8b',
        hoverBackground: '#e7eeff',
        hoverColor: '#325b8b',
      },
    },
    toggle: {
      openBackground: '#e7eeff',
      openBorderRadius: '50%',
    },
  },
  header: {
    background: {
      contrast: '#ffffff',
      light: '#21446d',
      main: '#0e2745',
    },
  },
  hyperlink: {
    color: {
      light: '#d0ddfc',
      main: '#4276f2',
    },
    decoration: 'none',
  },
  input: {
    background: '#ffffff',
    borderColor: '#e1e1e1',
    borderRadius: '0.25rem',
    borderStyle: 'solid',
    borderWidth: '0.0625rem',
    fontSize: '1rem',
    margin: '0.125rem',
    padding: '0.625rem',
  },
  inputLabel: {
    color: '#aaaaaa',
    fontSize: '0.875rem',
    margin: '0.125rem',
    padding: '0 0.625rem',
    requiredIndicator: {
      color: '#ff0000',
      margin: '0 2px',
    },
  },
  palette: {
    error: {
      contrast: '#ffffff',
      gradient: ['#ff0000 5%', '#ff5100 77%'],
      light: '#fff1f1',
      main: '#f26d5c',
    },
    primary: {
      contrast: '#ffffff',
      gradient: ['#4176f2 7%', '#199edb 91%'],
      light: '#d0ddfc',
      main: '#4276f2',
    },
    secondary: {
      contrast: '#ffffff',
      light: '#c9d1e2',
      main: '#a0a0a0',
    },
    success: {
      contrast: '#ffffff',
      light: '#a9f8d0',
      main: '#4ce899',
    },
    text: {
      disabled: '#a0a0a0',
      hint: '#3c3c3c',
      primary: '#3c3c3c',
      secondary: '#a0a0a0',
    },
    warning: {
      contrast: '#3c3c3c',
      light: '#ffedaf',
      main: '#f2d05c',
    },
  },
  separator: {
    color: '#c9d1e2',
    style: 'solid',
    width: '2px',
  },
  form: {
    background: {
      contrast: '#3c3c3c',
      light: '#ffffff',
      main: '#ffffff',
    },
    header: {
      borderColor: '#c9d1e2',
      color: '#a4adc1',
    },
    maxWidth: '35rem',
    row: {
      borderColor: '#c9d1e2',
    },
  },
  formSuggestion: {
    background: {
      main: 'rgba(0, 0, 0, 0.5)',
    },
  },
  typography: {
    fontFamily: '"Frutiger", sans-serif',
    fontSize: '16px',
  },
};

export default theme;