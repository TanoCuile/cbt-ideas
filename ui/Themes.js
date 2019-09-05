import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    line-height: 2;
  }
  a {
    text-decoration: none;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  blue: '#7ccbfe',
  darkBlue: '#2c3c4c',
  black: '#393939',
  gray: '#6f6f6f',
  green: '#006633',
  red: '#dc3545',
  maxWidth: '1000px',
};

const Themes = props => {
  return (
    <ThemeProvider theme={theme}>
      <>
      <GlobalStyles/>
      {props.children}
      </>
    </ThemeProvider>
  )
}

export default Themes
