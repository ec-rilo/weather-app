import WeatherForecast from './forecast-class';
import locationLogic from './location-logic';
import { format } from 'date-fns';

// ** pop means "populate" **
const weatherWeek = (() => {
  async function getNewForecast(coords) {
    const apiKey = '6a7c39b80ca83ace536312969e3bfb3b';

    try {
      const responseImp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`,
        { mode: 'cors' }
      );
      const responseMet = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`,
        { mode: 'cors' }
      );
      const imperialData = await responseImp.json();
      const metricData = await responseMet.json();
      currForecast = new WeatherForecast(imperialData, metricData);
      return new WeatherForecast(imperialData, metricData);
    } catch (err) {
      console.log('Error in getWeatherForecast function');
    }
  }

  // DOW is Day of Week
  function popDOW() {
    let currDay = new Date();
    let nextDay = new Date(currDay);
    let formattedDate;
    const weekItemsArr = [...document.querySelectorAll('.week-item')];
    for (let i = 0; i < 6; ++i) {
      nextDay.setDate(nextDay.getDate() + 1);
      formattedDate = format(nextDay, 'EEEE');
      weekItemsArr[i].firstChild.nextSibling.innerHTML = formattedDate;
    }
  }

  function popForecast(data) {
    const impUnit = document.querySelector('#imp-unit');
    const weekItemsArr = [...document.querySelectorAll('.week-item')];
    // populate with imperial data.
    for (let i = 0; i < 6; ++i) {
      let maxTempElem =
        weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling;
      maxTempElem.innerHTML = data.maxTemp(i);

      let minTempElem =
        weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling
          .nextSibling.nextSibling;
      minTempElem.innerHTML = data.minTemp(i);

      let img =
        weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling
          .nextSibling.nextSibling.nextSibling.nextSibling;
      let imgObj = data.weatherImg(i);
      img.src = imgObj.src;
      img.alt = imgObj.description;
    }
  }

  function popWeekContainer(data) {
    popDOW();
    popForecast(data);
  }

  function getCurrForecast() {
    return currForecast;
  }

  let currForecast;
  (async function addDefaultForecast() {
    const locationData = await locationLogic.getData('San Francisco, CA');
    const coords = locationLogic.getCoords(locationData);
    const data = await getNewForecast(coords);
    popWeekContainer(data);
    currForecast = data;
  })();

  async function updateForecast(userInput) {
    const locationData = await locationLogic.getData(userInput);
    const coords = locationLogic.getCoords(locationData);
    const data = await getNewForecast(coords);
    popWeekContainer(data);
  }

  return {
    getCurrForecast,
    popWeekContainer,
    updateForecast,
  };
})();

export default weatherWeek;
