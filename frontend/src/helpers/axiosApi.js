import axios from "axios";

const getOffertById = async (id, options) => {
  try {
    const { data: response } = await axios.get(`/offer/${id}`, options);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



export { getOffertById };
