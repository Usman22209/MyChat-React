import React from "react";
import styled from "styled-components";

const HoverbuttonPrimary = ({ onClick, text }: any) => {
  return (
    <StyledWrapper>
      <button
        onClick={onClick}
        className="animated-button mx-auto bg-indigo-600 dark:bg-indigo-500 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">{text}</span>
        <span className="circle" />
        <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 11px 36px;
    border: 4px solid transparent;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 600;
    box-shadow: 0 0 0 2px theme("colors.indigo.600");
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
  }

  .animated-button:hover {
    transform: scale(1.05);
  }

  .animated-button:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 4px theme("colors.indigo.500");
  }

  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: white;
    transition: all 0.3s ease-in-out;
  }

  .animated-button .arr-1 {
    right: 16px;
  }

  .animated-button .arr-2 {
    left: -25%;
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s ease-in-out;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }
`;

export default HoverbuttonPrimary;
