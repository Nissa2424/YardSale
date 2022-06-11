import axios from "axios";

const dbURL = "https://localhost:7295/api";

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

export { getAllTreasures, addTreasureToCart };






















