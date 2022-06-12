import React from 'react';
import styled from 'styled-components';

const HomeStyle = styled.div`
  h1 {
    margin-bottom: 50px;
  }
  h3 {
    margin: 50px;
  }
  img {
    border: 1px solid black;
  }
  text-align: center;
`;


export default function Home() {
  return (
    <HomeStyle>
      <h1>Issa Yard-Sale</h1>
      <img
        src="https://www.ccad.edu/sites/default/files/styles/693pxw/public/yard%20sale%20applications-10.jpg?itok=33bj4piB"
        alt="Issa YardSale"
        width="800"
        height="600"
      />
      <h3>ISSA Yard-Sale!</h3>
    </HomeStyle>
  );
}

