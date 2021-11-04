import { WeatherData } from './weather-classes';
import locationLogic from './location-logic';
import { format } from 'date-fns';
import { endOfDay } from 'date-fns';

const weatherLogic = (() => {
  async function getWeather(coords) {
    const apiKey = '6a7c39b80ca83ace536312969e3bfb3b';
    const units = 'imperial';

    try {
      const weatherDataResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=${apiKey}`,
        { mode: 'cors' }
      );
      const weatherData = await weatherDataResponse.json();

      return new WeatherData(weatherData);
    } catch (err) {
      alert('Looks like you input a incorrect value.');
    }
  }

  function setMainIcon(data) {
    const iconContainer = document.querySelector('.main-icon-container');
    const icon = data.weatherImg;
    iconContainer.appendChild(icon);
  }

  function setMainText(data, locationData) {
    const contentContainer = document.querySelector('.main-content-container');

    // Sets the Temperature
    const temp = contentContainer.firstChild.nextSibling;
    temp.classList.add('main-temp');
    temp.innerHTML = data.temp;

    // Sets the Description
    const description = temp.nextSibling.nextSibling;
    description.classList.add('main-desc');
    description.innerHTML = data.weatherDesc;

    // Sets the City and state
    const location = description.nextSibling.nextSibling;
    location.classList.add('main-city');
    location.innerHTML = locationData.results[0].formatted_address;
    console.log(locationData);
    // location.innerHTML = locationText;

    // Sets the SubContainer and Day
    const subContainer = document.querySelector('.main-subcontent-container');
    const day = subContainer.firstChild.nextSibling;
    day.innerHTML = format(endOfDay(new Date()), 'EEEE, MMM dd');

    // Sets the Date
    const date = new Date();
    const amPM = date.getHours() >= 12 ? 'pm' : 'am';
    const time = day.nextSibling.nextSibling;
    time.innerHTML = `${date.getHours()}:${date.getMinutes()}${amPM}`;
  }

  (async function addDefaultWeather() {
    const locationData = await locationLogic.getData('San Francisco, CA');
    const coords = locationLogic.getCoords(locationData);
    const data = await getWeather(coords);
    setMainIcon(data);
    setMainText(data, locationData);
  })();

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('address').value;
    getWeather(userInput);
  });
})();
