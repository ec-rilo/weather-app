import { WeatherData } from './weather-classes';
import locationLogic from './location-logic';
import { createIcon } from './dom-creation';
import { format } from 'date-fns';
import { endOfDay } from 'date-fns';

const weatherLogic = (() => {
  async function getNewWeather(coords, units) {
    const apiKey = '6a7c39b80ca83ace536312969e3bfb3b';

    try {
      const responseImp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`,
        { mode: 'cors' }
      );
      const responseMetric = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`,
        { mode: 'cors' }
      );
      const imperialData = await responseImp.json();
      const metricData = await responseMetric.json();
      currWeather = new WeatherData(imperialData, metricData);

      return new WeatherData(imperialData, metricData);
    } catch (err) {
      alert('Looks like you input a incorrect value.');
    }
  }

  function setMainIcon(data) {
    const iconContainer = document.querySelector('.img-container');
    if (iconContainer.firstChild === null) {
      const newIcon = createIcon(
        data.weatherImg.src,
        data.weatherImg.description
      );
      iconContainer.appendChild(newIcon);
      setTimeout(() => {
        newIcon.classList.add('show-icon');
      }, 10);
    } else {
      const prevIcon = document.querySelector('.main-icon');
      prevIcon.classList.toggle('hide-icon');

      const newIcon = createIcon(
        data.weatherImg.src,
        data.weatherImg.description
      );
      iconContainer.appendChild(newIcon);
      setTimeout(() => {
        newIcon.classList.add('show-icon');
      }, 1000);
      setTimeout(() => {
        prevIcon.remove();
      }, 1000);
    }
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

  let currWeather;
  (async function addDefaultWeather() {
    const locationData = await locationLogic.getData('San Francisco, CA');
    const coords = locationLogic.getCoords(locationData);
    const data = await getNewWeather(coords);
    setMainIcon(data);
    setMainText(data, locationData);
    currWeather = data;
  })();

  function getCurrWeather() {
    return currWeather;
  }

  return {
    getNewWeather,
    setMainIcon,
    setMainText,
    getCurrWeather,
  };
})();

export default weatherLogic;
