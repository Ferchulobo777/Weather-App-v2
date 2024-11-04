import { useEffect, useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import getApi from "./utils/getApi";
import getWeatherByLocation from "./utils/getWeatherByLocation";
import getWeatherIcon from "./utils/getWeatherIcon";
import countryNames from "./utils/countryNames";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [latlong, setLatlong] = useState();
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [year, setYear] = useState(null);

  useEffect(() => {
    const success = async (pos) => {
      // Asegúrate de que sea una función async
      console.log(pos.coords);
      const obj = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
      setLatlong(obj);

      // Llama a getApi y espera a obtener los datos del clima
      const data = await getApi(obj.lat, obj.long); // Usa await aquí
      setWeatherData(data);
    };

    const error = (error) => {
      console.log("Error obteniendo la geolocalización:", error);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const toggleDarkmode = () => {
    setDarkMode((prevMode) => !prevMode);

    if (!isDarkMode) {
      localStorage.setItem("darkmode", "true");
    } else {
      localStorage.removeItem("darkmode");
    }
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);


  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkmode");
    if (darkModePreference) {
      setDarkMode(true);
    }

    document.body.className = isDarkMode ? "dark-mode" : "";
  }, [isDarkMode]);
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Función de conversión de temperatura
  const convertTemperature = (tempInKelvin) => {
    return isCelsius
      ? Math.round(tempInKelvin - 273.15) // Celsius
      : Math.round(((tempInKelvin - 273.15) * 9) / 5 + 32); // Fahrenheit
  };

  // Función para manejar la búsqueda
  const handleSearch = async () => {
    if (!searchLocation) return; // Si el input está vacío, no hacer nada
    const data = await getWeatherByLocation(searchLocation);
    if (data)
      setWeatherData(data); // Actualizar el clima si los datos son válidos
    else console.log("No se encontraron datos para esa ubicación");
  };

  return (
    <div className={`container-fluid py-4 ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <div>
          <h1 className="box">Weather App</h1>
        </div>

        <div>
          <div className="search">
            <label htmlFor="search-input" className="visually-hidden">
              Buscar Ciudad o Región
            </label>
            <input
              type="text"
              id="search-input"
              className="input-search"
              placeholder="País o Ciudad"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button className="btn btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
        <div>
          {" "}
          <button className="btn btn-toggle" onClick={toggleDarkmode}>
            {isDarkMode ? (
              <i className="bi bi-sun"></i>
            ) : (
              <i className="bi bi-moon"></i>
            )}
          </button>
        </div>
      </div>

      <div className="modal">
        {weatherData && (
          <div className="weather-info">
            <div className="weather-info-header">
              <h3 className="weather-temp">
                {convertTemperature(weatherData.main.temp)}
              </h3>
              <img
                className="img-thermometer"
                src={`/icons/thermometer-${
                  isCelsius ? "celsius" : "fahrenheit"
                }.svg`}
                alt="thermometer-icon"
              />
              <div className="img-icon">
                <img
                  src={getWeatherIcon(
                    weatherData.weather[0].main,
                    weatherData.weather[0].icon
                  )}
                  alt="weather-icon"
                />
              </div>
            </div>
            <div className="weather-temp-data">
              <p className="temp-max">
                Máxima: {convertTemperature(weatherData.main.temp_max)}°
                {isCelsius ? "C" : "F"}
              </p>
              <p className="temp-min">
                Mínima: {convertTemperature(weatherData.main.temp_min)}°
                {isCelsius ? "C" : "F"}
              </p>
              <p className="temp-feels-like">
                Sensación Térmica:{" "}
                {convertTemperature(weatherData.main.feels_like)}°
                {isCelsius ? "C" : "F"}
              </p>
              <p className="humidity">Humedad: {weatherData.main.humidity}%</p>
            </div>
            <button
              className="btn-unit-toggle"
              onClick={toggleTemperatureUnit}
            >
              <img
                width={"100px"}
                src={
                  isCelsius
                    ? "../public/icons/fahrenheit.svg"
                    : "../public/icons/celsius.svg"
                }
                alt=""
              />
            </button>
            <h3 className="locality">{weatherData?.name}</h3>
            <h3 className="country">
              {countryNames[weatherData?.sys?.country] ||
                weatherData?.sys?.country}
            </h3>
          </div>
        )}
      </div>
      <footer className="footer">
        <h4 className="name">Fernando Rodriguez Software Developer</h4>
        <p className="rights">All rights reserved.</p>
        <p className="year">© {year}</p>
      </footer>
    </div>
  );
}

export default App;
