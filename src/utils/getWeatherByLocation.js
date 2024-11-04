// utils/getWeatherByLocation.js
import axios from "axios";

const API_KEY = "8b0bf82002ca9b7905ce1fe144784145"; // Reemplaza con tu propia API key

// Función para obtener datos del clima por ciudad o país
const getWeatherByLocation = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos del clima:", error);
    return null; // Devuelve null si hay un error
  }
};

export default getWeatherByLocation;
