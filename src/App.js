import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay'; 

function App() {

  // STATE
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('Toronto');

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`)
      .then(weatherResponse => weatherResponse.json())
        .then(weatherData => setWeather(weatherData))
          .catch(err => console.log(err))

  }, [location]);

  const updateLocation = (newLocation) => {

      if (newLocation !== '') {
        setLocation(newLocation);
      }
      
  };


  return (
    <div className="App">
      <WeatherDisplay weatherInfo={weather} updateLocation={updateLocation} />
    </div>
  );
}

export default App;
