import React from "react";
import styled from "styled-components";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

interface HoverButtonProps {
  onClick: () => void;
  text: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({ onClick, text }) => {
  const { theme } = useTheme();
  return (
    <StyledWrapper themeMode={theme}>
      <button onClick={onClick}>{text}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ themeMode: string }>`
  button {
    font-family: inherit;
    display: inline-block;
    width: 9em;
    height: 3em;
    line-height: 2.5em;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--color);
    transition:
      color 0.5s,
      background 0.5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    background: transparent;

    /* Theme-based colors */
    ${({ themeMode }) =>
      themeMode === "dark"
        ? `
          --color: #635bfa; /* Sky-400 */
          --hover-color: #ffffff;
          --active-color: red; /* Darker Sky */
        `
        : `
          --color: #4f46e5; /* Indigo-600 */
          --hover-color: #ffffff;
          --active-color: #4338ca; /* Darker Indigo */
        `}

    color: var(--color);
    border-color: var(--color);
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover {
    color: var(--hover-color);
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: var(--active-color);
    transition: background 0s;
  }
`;

export default HoverButton;
