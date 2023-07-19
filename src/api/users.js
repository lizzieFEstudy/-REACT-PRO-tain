import axios from "axios";

const getUsers = async () => {
  const response = await axios.get("http://localhost:4000/users")
  return response.data
}

const addUsers = async (newUser) => {
  await axios.post("http://localhost:4000/users", newUser)
}

export { getUsers, addUsers}