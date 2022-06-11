import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Routing from '../routes';
import { useState } from "react";


const Body = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  position: relative;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
`;

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Body>
      <Navigation expanded={expanded} setExpanded={setExpanded} />
      <Content>
        <Routing />
      </Content>
    </Body>
  );
}

export default App;
