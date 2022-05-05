import styled from "styled-components";

import MineSweeper from "MineSweeper";

const Container = styled.div`
  text-align: center;
  height: 100%;
  background-color: var(--backgroundColor);
`;

function App() {
  return (
    <Container>
      <MineSweeper />
    </Container>
  );
}

export default App;
