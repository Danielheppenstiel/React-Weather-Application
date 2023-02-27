import { useState, useEffect } from "react";
import { WiDayCloudyWindy as SunAndCloud, WiDaySunny as Sunny, WiDaySnow as Snowing, WiCloudy as Cloudy, WiDayRain as Raining, WiCloud as Cloud } from "react-icons/wi";

function WeatherDisplay( {weatherInfo, updateLocation} ) {

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  const weather = weatherInfo;
  const weatherCondition = weather.current && weather.current.condition.text;

  // keep date updated
  useEffect( () => {
    setInterval(() => {
      setCurrentDate(new Date().toDateString());
    }, 1000)
  }, []);

  // keep Time updated
  useEffect( () => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000)
  }, []);

  // update location event
  const handleInput = (event) => {
    const updatedLocation = event.target.value;
    updateLocation(updatedLocation);
  };

  // Display correct weather icon
  const getWeatherIcon = (conditon) => {

      switch (conditon) {
        case 'Sunny':
          return <Sunny size='5rem' color='white' />;
        case 'Raining':
          return <Raining size='5rem' color='white' />;  
        case 'Overcast':
          return <SunAndCloud size='5rem' color='white' />;  
        case 'Snowing':
          return <Snowing size='5rem' color='white' />;
        case 'Coudy':
          return <Cloudy size='5rem' color='white' />;  
        default:
          return <Cloud size='5rem' color='white' />;  
      };

  };
  

  return (
    <div className="weather-card">

      {/* weather display */}
        <div className="main-display">
            {weatherCondition && getWeatherIcon(weatherCondition)}
            <div className="weather-information">
              <h4 className="current-date info-item">
                {currentDate}
              </h4>
              <h4 className="current-time info-item">
               {currentTime}
              </h4>
              {weather && weather.location && <h3 className="current-city info-item">{weather.location.name}</h3>}
              {weather && weather.current && <h1 className="temperature info-item">{weather.current.temp_c} &deg; C </h1>}
            </div>
        </div>

      {/* search city */}
        <div className="main-search">
            <div className="search-information">
              {weather && weather.current && <h5 className="search-item">Precipation: <span>{weather.current.precip_mm} mm</span></h5>}
              {weather && weather.current && <h5 className="search-item">Humidity: <span>{weather.current.humidity}</span></h5>}
              {weather && weather.current && <h5 className="search-item">Wind: <span>{weather.current.wind_kph} kph</span></h5>}
            </div>
            <div className="input-container">
              <input id="input-seach" className="input" type="text" placeholder="Enter a City..." onKeyUp={handleInput} />
            </div>
        </div>

    </div>
  )
}

export default WeatherDisplay