import WeatherForecast from './forecast-class';
import locationLogic from './location-logic';
import { format } from 'date-fns';
import { endOfDay } from 'date-fns';

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
    // Populates all elements with forecast data.
    // populates the second child of a weekItem with the max temp.
    // populates the third child of the weekItem with the min temp.
    // populates the last child (4th) of the weekItem with the weather.

    const impUnit = document.querySelector('#imp-unit');
    const weekItemsArr = [...document.querySelectorAll('.week-item')];
    if (impUnit.classList.contains('selected-unit')) {
      // populate with imperial data.
      for (let i = 0; i < 6; ++i) {
        let maxTempElem =
          weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling;
        maxTempElem.innerHTML = data.impMaxTemp(i);

        let minTempElem =
          weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling;
        minTempElem.innerHTML = data.impMinTemp(i);

        let img =
          weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling.nextSibling.nextSibling;
        let imgObj = data.weatherImg(i);
        img.src = imgObj.src;
        img.alt = imgObj.description;
      }
    } else {
      // populate with metric data.
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

  return {
    getCurrForecast,
    popWeekContainer,
  };
})();

export default weatherWeek;
