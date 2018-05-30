import styled from "styled-components";

export const Block = styled.div`
  box-sizing: border-box;
  ${({ blockSize = 45 }) => {
    return `
     width: ${blockSize}px;
     height: ${blockSize}px;
    `;
  }};
  background: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 3px solid #ddd;
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.25);
  top: ${({ top }) => (top ? top + "px" : 0 + "px")};
  left: ${({ left }) => (left ? left + "px" : 0 + "px")};
  color: #ddd;
`;
