import axios from 'axios';

const getShops = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/shops`)
  return response.data
}

const addShops = async (newShop) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/shops`, newShop)
}

const updateShops = async ({ shopId, updatedShop }) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/shops/${shopId}`, updatedShop )
}
export { getShops, addShops, updateShops }