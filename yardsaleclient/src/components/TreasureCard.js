import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Form, FormGroup, Label, Input,
} from "reactstrap";
import { addNewTreasure, addTreasureToCart, updateTreasure } from "../data/treasureData";
import styled from "styled-components";

const FormStyle = styled(Form)`
  background-color: #F9F6EE;
  border-radius: 10px;
  border: black 5px solid;
  height: 150px;
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const initialState = {
  descriptionId: '',
  designId: '',
  imageLink: '',
  category: '',
  price: ''
};

export default function TreasureForm({ obj = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useNavigate();

  useEffect(() => {
    if (obj.treasureId) {
      setFormInput({
        description: obj.description,
        designId: obj.designId,
        image: obj.image,
        category: obj.category,
        price: obj.price
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    // if (obj.treasureId) {
    //   updateTreasure(obj.treasureId, formInput).then(() => {
    //     history("/shop");
    //   });
    // } else {
      addTreasureToCart({ ...formInput }).then(() => {
		console.log('added to cart')
        resetForm();
        history("/shop");
      });
    // }
  };

  return (
    <Container>
      <FormStyle onSubmit={handleClick}>
        <FormGroup>
          <Label for="description">Treasure Description:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.description || ''}
            type="text"
            name="descriptionId"
            id="descriptionId"
          />
        </FormGroup>
        <FormGroup>
          <Label for="DesignId">Design:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.designId || ''}
            type="text"
            name="design"
            id="design"
          />
        </FormGroup>
        <FormGroup>
          <Label for="imageLink">Image Link:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.imageLink || ''}
            type="text"
            name="imageLink"
            id="imageLink"
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.category || ''}
            type="text"
            name="category"
            id="category"
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price:</Label>
          <Input
            onChange={(e) => handleChange(e)}
            value={formInput.price || ''}
            type="number"
            name="price"
            id="price"
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </FormStyle>
    </Container>
  );
}