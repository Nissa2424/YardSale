import axios from 'axios';

const dbURL = "https://localhost:7295/api";

const getCart = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/Cart`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const deleteCartItem = (treasureId) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/Cart/${treasureId}`)
      .then(() => getCart().then(resolve))
      .catch(reject);
  });

export { getCart, deleteCartItem };
