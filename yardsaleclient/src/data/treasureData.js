import axios from 'axios';
const dbURL = "https://localhost:7295/api"

const getAllTreasures = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/treasures`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

  const addTreasureToCart = (treasureId) => new Promise((resolve, reject) => {
    axios.post(`${dbURL}/Cart/${treasureId}`)
      .then(resolve)
      .catch(reject);
  });

  const deleteTreasure = (treasureId) => new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/treasures/${treasureId}`)
      .then(() => getAllTreasures().then(resolve))
      .catch(reject);
  });
  
  const addNewTreasure = (treasureObj) => new Promise((resolve, reject) => {
    axios
      .post(`${dbURL}/treasures`, treasureObj)
      .then(resolve)
      .catch(reject);
  });
  
  const updateTreasure = (treasureId, obj) => new Promise((resolve, reject) => {
    axios
      .put(`${dbURL}/treasures/${treasureId}`, obj)
      .then(() => getAllTreasures().then(resolve))
      .catch(reject);
  });
  
  const getSingleTreasure = (treasureId) => new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/treasures/${treasureId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

export { getAllTreasures, addTreasureToCart, deleteTreasure, addNewTreasure, updateTreasure, getSingleTreasure };