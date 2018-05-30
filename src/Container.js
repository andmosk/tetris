import styled from "styled-components";

export const Container = styled.div`
  outline: none;
  border: 10px solid #ddd;
  background: #333;
  height: ${({ height }) => (height ? height + "px" : "100vh")};
  width: ${({ width }) => (width ? width + "px" : "100vw")};
  position: relative;
`;
