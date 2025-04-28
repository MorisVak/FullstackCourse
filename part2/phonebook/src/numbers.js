import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postNumber = (newNumber) => {
  const request = axios.post(baseUrl, newNumber);
  //post request return the node that we just added.
  console.log("POST NUMBER REQUEST : ", request);

  return request.then((response) => {
    console.log("DATA OF RESPONSE", response.data);

    return response.data;
  });
};

const deleteNumber = (id) => {
  const request = axios.delete(baseUrl + `/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  postNumber,
  deleteNumber,
};
