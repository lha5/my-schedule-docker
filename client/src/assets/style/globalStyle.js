import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'NotoSans';
    font-weight: 300;
    color: ${props => props.theme.colors.black};
  }

  body {
    text-align: center;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul {
    list-style: none;
  }

  input[type="button"],
  input[type="submit"],
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    margin: 0;
    padding: 0.5em 0.7em;
  }

  input[type="button"]:active,
  input[type="button"]:focus,
  input[type="button"]:hover,
  input[type="submit"]:active,
  input[type="submit"]:focus,
  input[type="submit"]:hover,
  button:active,
  button:focus,
  button:hover {
    outline: 0;
  }

  .swal-button--confirm {
    background-color: ${props => props.theme.colors.primary};
  }

  .swal-button--confirm:hover {
    background-color: ${props => props.theme.colors.gray};
  }
`;

export default GlobalStyle;
