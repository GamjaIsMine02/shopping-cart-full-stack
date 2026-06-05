import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  img {
    display: block;
    max-width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 100vh;

  background-color: #d3d3d3;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 376px;
  height: min(700px, 100vh);
  overflow: hidden;

  gap: 16px;

  background-color: #ffffff;
`;
