import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import { addNewTreasure, addTreasureToCart, getSingleTreasure, updateTreasure } from "../data/treasureData";
import { deleteCartItem } from "../data/cartData";

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
export default function Treasure({ treasure, inShop, setHeaderText }) {
  const history = useNavigate();
  const [isediting, setIsEditing] = React.useState(false)
  const [selectedTreasure, setSelectedTreasure] = React.useState({})
  const handleEditClick = (treasure) => {
     setIsEditing(true)

	 setSelectedTreasure(treasure)
	 console.log(selectedTreasure)
  }
  const handleSubmitUpdate = (treasure) => {
	updateTreasure(treasure)	
	setIsEditing(false) 

	setSelectedTreasure({})
	console.log(selectedTreasure)
 }
  //console.log(treasure);
  return (
    <CardStyle>
      <CardBody>
        <CardImg
          style={{ width: "300px", height: "300px" }}
          src={treasure.imageLink}
          alt={treasure.description}
        />

		{isediting ? 
		<input type= "Text" value={selectedTreasure.description} onChange = {(e) => selectedTreasure.description = e.target.value} />
		 :
		<CardTitle tag="h2">{treasure.description}</CardTitle>
		}	
        <CardText tag="h4">{treasure.categoryId}</CardText>
        <CardText tag="h4">${treasure.price}</CardText>
        <CardSubtitle tag="h5">{treasure.design}</CardSubtitle>
        {inShop && (
        <>
		<ButtonStyle
            className="add-to-cart-btn"
            onClick={() => {
              addTreasureToCart(treasure.treasureId);
              history("/cart");
              setHeaderText("Cart");
            }}
          >
            Add To Cart
          </ButtonStyle>

		  <ButtonStyle
		  className="add-to-cart-btn"
		  onClick={() => {
			handleEditClick(treasure)
		  }}
		>
		  Edit Description 
		</ButtonStyle>
		</>
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

	{isediting && (
          <ButtonStyle
            className="delete-from-cart-btn"
           onClick = {() => handleSubmitUpdate((selectedTreasure))}
			 >
         Done 
          </ButtonStyle>
       )}
      </CardBody>
    </CardStyle>
  );
}

Treasure.propTypes = {
  treasure: PropTypes.shape({
   designId: PropTypes.number,
    treasureId: PropTypes.number,
    categoryId: PropTypes.number,
    description: PropTypes.string,
    price: PropTypes.number,
    imageLink: PropTypes.string,
  }).isRequired,
  setHeaderText: PropTypes.func
};

Treasure.defaultProps = {
  setHeaderText: () => {}
}