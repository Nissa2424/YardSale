import React from 'react'
import {useNavigate} from 'react-router-dom';
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
} from "reactstrap";
import { deleteCartItem } from '../data/cartData';

}

const CardStyle = styled(Card)`
  border: 2px black solid;
  background-color: white;
  border-radius: 5px;
  margin: 20px;
  padding: 0px;
  box-shadow: 8px 8px 4px;
`;

const ButtonStyle = styled(Button)`
  border-radius: 5px;
  background-color: seafoam;
  width: 150px;
  height: 40px;
  margin-bottom: 10px;
  border: 2px solid black;
  box-shadow: 2px 2px 1px;
`;

export default function CartCard({ cart }) {
    const history = useNavigate();
  return (
   <CardStyle>
       <CardBody>
           <CardImg
             style={{ width: "300px", height: "300px" }}
             src={cart.image}
             alt={cart.title}
           />
           <CardTitle tag="h2">{cart.title}</CardTitle>
           <CardText tag="h4">{cart.artist}</CardText>
           <CardText tag="h4">${cart.price}</CardText>
           <CardSubtitle tag="h5">{cart.genre}</CardSubtitle>
           <ButtonStyle
            className="btn btn-danger"
            onClick={() => {
                deleteCartItem(cart.treasureId);
            }}
            >
                Delete From Cart
            </ButtonStyle>
       </CardBody>
   </CardStyle>
  );
}

CartCard.PropTypes = {
  cart: PropTypes.shape({
    artist: PropTypes.string,
    treasureId: PropTypes.number,
    genre: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired
};
