import axios from "axios";

const API_KEY = "8b0bf82002ca9b7905ce1fe144784145";

const getApi = async (lat, long) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
    );
    console.log(response)
    return response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Error al obtener los datos del clima:", error);
    return null; // Devuelve null en caso de error
  }
};

export default getApi;

