import React from 'react';
import styled from 'styled-components';

const CardBody = styled.div`
  
`;

const YardSaleCover = styled.img``;
const YardSaleInfo = styled.div`
  display: flex;
`;

const Title = styled.div``;

function TreasureCard(props) {
  return (
    <CardBody>
      <YardSaleCover />

      Treasure
    </CardBody>
  )
}

TreasureCard.propTypes = {}

export default TreasureCard
