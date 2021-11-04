import { WeatherData } from './weather-classes';
import locationLogic from './location-logic';
import { format } from 'date-fns';
import { endOfDay } from 'date-fns';

const weatherLogic = (() => {
  function getUnits() {
    const impUnit = document.querySelector('#imp-unit');
    if (impUnit.classList.contains('selected-unit')) {
      return 'imperial';
    } else return 'metric';
  }

  async function getWeather(coords, units) {
    const apiKey = '6a7c39b80ca83ace536312969e3bfb3b';

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
    const icon = iconContainer.firstChild;
    icon.classList.add('main-icon');
    icon.src = data.weatherImg.src;
    icon.alt = data.weatherImg.description;
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = ('0' + minutes).slice(-2);
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function setMainText(data, locationData) {
    const contentContainer = document.querySelector('.main-content-container');

    // Sets the Temperature
    const impUnit = document.querySelector('#imp-unit');
    let unit;
    impUnit.classList.contains('selected-unit') ? (unit = '°F') : (unit = '°C');
    const temp = contentContainer.firstChild.nextSibling;
    temp.classList.add('main-temp');
    temp.innerHTML = `${data.temp} ${unit}`;

    // Sets the Description
    const description = temp.nextSibling.nextSibling;
    description.classList.add('main-desc');
    description.innerHTML = data.weatherDesc;

    // Sets the City and State
    const location = description.nextSibling.nextSibling;
    location.classList.add('main-city');
    location.innerHTML = locationData.results[0].formatted_address;

    // Sets the SubContainer and Day
    const subContainer = document.querySelector('.main-subcontent-container');
    const day = subContainer.firstChild.nextSibling;
    day.innerHTML = format(endOfDay(new Date()), 'EEEE, MMM dd');

    // Sets the Time
    const date = formatAMPM(new Date());
    const time = day.nextSibling.nextSibling;
    time.innerHTML = date;
  }

  (async function addDefaultWeather() {
    const locationData = await locationLogic.getData('San Francisco, CA');
    const coords = locationLogic.getCoords(locationData);
    const units = getUnits();
    const data = await getWeather(coords, units);
    setMainIcon(data);
    setMainText(data, locationData);
  })();

  return {
    getWeather,
    setMainIcon,
    setMainText,
    getUnits,
  };
})();

export default weatherLogic;
