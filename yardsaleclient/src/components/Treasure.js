import React from 'react';
import { useNavigate }from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	Card,
	CardBody,
	CardSubtitle,
	CardImg,
	CardText,
	CardTitle,
	Button,
	} from 'reactstrap';
import { addTreasureToCart } from '../data/treasureData';
import { deleteCartItem } from '../data/cartData';

const CardStyle = styled(Card)`
  background-color: #F9F6EE;
  border-radius: 10px;
  border: black 5px solid;
  margin: 20px;
  padding: 0px;
`;

const ButtonStyle = styled(Button)`
  border-radius: 5px;
  background-color: #F9F6EE;
  width: 150px;
  height: 40px;
  margin-bottom: 10px;
  border: 2px solid black;
  box-shadow: 1px 1px 1px;
`;
export default function Treasure({ treasure, inShop }) {
  const history = useNavigate();
  return (
    <CardStyle>
      <CardBody>
        <CardImg
          style={{ width: "300px", height: "300px" }}
          src={treasure.image}
          alt={treasure.title}
        />
        <CardTitle tag="h2">{treasure.title}</CardTitle>
        <CardText tag="h4">{treasure.artist}</CardText>
        <CardText tag="h4">${treasure.price}</CardText>
        <CardSubtitle tag="h5">{treasure.genre}</CardSubtitle>
        {inShop && (
          <ButtonStyle
            className="add-to-cart-btn"
            onClick={() => {
              addTreasureToCart(treasure.treasureId);
              history("/cart");
            }}
          >
            Add To Cart
          </ButtonStyle>
        )}
        {!inShop && (
          <ButtonStyle
            className="delete-from-cart-btn"
            onClick={() =>
              deleteCartItem(treasure.treasureId)
            }
          >
            Delete From Cart
          </ButtonStyle>
        )}
      </CardBody>
    </CardStyle>
  );
}

Treasure.propTypes = {
  treasure: PropTypes.shape({
    artist: PropTypes.string,
    treasureId: PropTypes.number,
    genre: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};
