import styled from "styled-components";

export const Block = styled.div`
  width: 44px;
  height: 44px;
  background: black;
  position: absolute;
  border: 3px solid white;
  top: ${({ top }) => (top ? top + "px" : 0 + "px")};
  left: ${({ left }) => (left ? left + "px" : 0 + "px")};
  color: white;
`;
