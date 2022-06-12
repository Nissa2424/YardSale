import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { getAllTreasures } from '../data/treasureData';
import Treasure from '../components/Treasure';
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
`;

export default function Shop() {
  const [treasures, setTreasures] = useState([]);
  const [inShop] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getAllTreasures().then((treasureArray) => {
      if (isMounted) setTreasures(treasureArray);
    });
  });

  return (
    <Content>
      {treasures.map((treasure) => (
        <Treasure key={treasure.treasureId} treasure={treasure} inShop={inShop} />
      ))}
    </Content>
  );
}
