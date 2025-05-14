import axios from "axios";

const baseUrl = "http://localhost:3002/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postNumber = (newNumber) => {
  const request = axios.post(baseUrl, newNumber);
  //post request return the node that we just added.
  return request.then((response) => {
    console.log("NUMBER ADDED ");
    return response.data;
  });
};

const updateNumber = (id, newNumber) => {
  const request = axios.put(baseUrl + `/${id}`, newNumber);
  return request.then((response) => response.data);
};

const deleteNumber = (id) => {
  const request = axios.delete(baseUrl + `/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  postNumber,
  deleteNumber,
  updateNumber,
};
