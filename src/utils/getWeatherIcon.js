const getWeatherIcon = (main, icon) => {
    switch (icon) {
      case "01d":
        return "/icons/clear-day.svg";
      case "01n":
        return "/icons/clear-night.svg";
      case "02d":
        return "/icons/partly-cloudy-day.svg";
      case "02n":
        return "/icons/partly-cloudy-night.svg";
      case "03d":
      case "03n":
        return "/icons/cloudy.svg";
      case "04d":
      case "04n":
        return "/icons/overcast.svg";
      case "09d":
      case "09n":
        return "/icons/drizzle.svg";
      case "10d":
        return "/icons/rain.svg";
      case "10n":
        return "/icons/rain-night.svg";
      case "11d":
        return "/icons/thunderstorms-day.svg";
      case "11n":
        return "/icons/thunderstorms-night.svg";
      case "13d":
      case "13n":
        return "/icons/snow.svg";
      case "50d":
        return "/icons/fog.svg";
      case "50n":
        return "/icons/fog-night.svg";
      default:
        // Si `icon` no coincide, usa `main`
        switch (main) {
          case "Clear":
            return "/icons/clear-day.svg";
          case "Clouds":
            return "/icons/cloudy.svg";
          case "Rain":
            return "/icons/rain.svg";
          case "Snow":
            return "/icons/snow.svg";
          case "Thunderstorm":
            return "/icons/thunderstorms.svg";
          case "Drizzle":
            return "/icons/drizzle.svg";
          case "Mist":
          case "Fog":
            return "/icons/fog.svg";
          case "Smoke":
            return "/icons/smoke.svg";
          case "Dust":
            return "/icons/dust-day.svg";
          case "Haze":
            return "/icons/haze-day.svg";
          default:
            return "/icons/default.svg"; // Ícono predeterminado
        }
    }
  };
  
  export default getWeatherIcon;