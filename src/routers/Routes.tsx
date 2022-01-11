import React from "react";
import styled from "styled-components";
import Home from "../pages/Home";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

const Routes: React.FC = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default Routes;
