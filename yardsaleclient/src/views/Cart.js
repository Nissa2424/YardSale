import React, { useState, useEffect} from 'react';
import styled  from 'styled-components';
import Treasure from '../components/Treasure';
import { getCart } from '../data/cartData';

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
`;

const Total = styled.div`
  display: flex;
  width: 200px;
  height: 65px;
  border: 5px solid black;
  border-radius: 10px;
  justify-content: center;
  align-content: center;
  background-color: #F9F6EE;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyCartTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100px;
  border-radius: 10px;
  border: black 5px solid;
  background-color: #F9F6EE;
`;

export default function Cart() {
  const [treasures, setTreasures] = useState([]);
  const [orderTotal, setOrderTotal] = useState();

  const getCartTotal = (treasures) => {
    let orderTotal = 0;
    treasures.forEach((treasure) => {
      orderTotal += treasure.price;
    });
    setOrderTotal(orderTotal);
  };

  useEffect(() => {
    let isMounted = true;
    getCart().then((treasuresArray) => {
      if (isMounted) setTreasures(treasuresArray);
    });
    return () => {
      isMounted = false;
    };
  }, [treasures]);

  useEffect(() => {
    getCartTotal(treasures);
  }, [treasures]);

  return (
    <Content>
      {treasures.length === 0 ? (
        <EmptyCartTextContainer>
          <h2>Your Cart is Empty!</h2>
        </EmptyCartTextContainer>
      ) : (
        <Container>
          <Total>
            <h3>Order Total: ${orderTotal}</h3>
          </Total>
          <Content>
          {treasures.map((treasure) => (
            <Treasure key={treasure.treasureId} treasure={treasure} />
          ))}
          </Content>
        </Container>
      )}
    </Content>
  );
}
