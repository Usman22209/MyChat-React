import React from "react";
import styled from "styled-components";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const { theme } = useTheme(); 

  return (
    <StyledWrapper theme={theme}>
      <div>
        <input
          hidden
          className="check-icon"
          id="check-icon"
          name="check-icon"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label className="icon-menu" htmlFor="check-icon">
          <div className="bar bar--1" />
          <div className="bar bar--2" />
          <div className="bar bar--3" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .icon-menu {
    --gap: 5px;
    --height-bar: 2px;
    --pos-y-bar-one: 0;
    --pos-y-bar-three: 0;
    --scale-bar: 1;
    --rotate-bar-one: 0;
    --rotate-bar-three: 0;
    width: 25px;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    cursor: pointer;
    position: relative;
  }

  .bar {
    position: relative;
    height: var(--height-bar);
    width: 100%;
    border-radius: 0.5rem;
   background-color: ${({ theme }) => (theme === "dark" ? "#E0E0E0" : "#333")};

    transition: background-color 0.3s ease;
  }

  .bar--1 {
    top: var(--pos-y-bar-one);
    transform: rotate(var(--rotate-bar-one));
    transition:
      top 200ms 100ms,
      transform 100ms;
  }

  .bar--2 {
    transform: scaleX(var(--scale-bar));
    transition: transform 150ms 100ms;
  }

  .bar--3 {
    bottom: var(--pos-y-bar-three);
    transform: rotate(var(--rotate-bar-three));
    transition:
      bottom 200ms 100ms,
      transform 100ms;
  }

  .check-icon:checked + .icon-menu > .bar--1 {
    transition:
      top 200ms,
      transform 200ms 100ms;
  }

  .check-icon:checked + .icon-menu > .bar--3 {
    transition:
      bottom 200ms,
      transform 200ms 100ms;
  }

  .check-icon:checked + .icon-menu {
    --pos-y-bar-one: calc(var(--gap) + var(--height-bar));
    --pos-y-bar-three: calc(var(--gap) + var(--height-bar));
    --scale-bar: 0;
    --rotate-bar-one: 45deg;
    --rotate-bar-three: -45deg;
  }
`;

export default Switch;
