import styled from "styled-components";

export const Container = styled.div`
  background: gray;
  height: ${({ height }) => (height ? height + "px" : "100vh")};
  width: ${({ width }) => (width ? width + "px" : "100vw")};
  position: relative;
`;
