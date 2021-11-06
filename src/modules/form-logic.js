import weatherLogic from './weather-data';
import locationLogic from './location-logic';
import { WeatherData } from './weather-classes';

let formLogic = (() => {
  function postContent(data, locationData) {
    weatherLogic.setMainIcon(data);
    weatherLogic.setMainText(data, locationData);
  }

  function postError() {
    const error = document.querySelector('.error-msg');
    const searchBtn = document.querySelector('.search-btn');
    error.classList.toggle('show-error');
    searchBtn.style.pointerEvents = 'none';
    setTimeout(() => {
      error.classList.toggle('show-error');
      searchBtn.style.pointerEvents = 'auto';
    }, 3000);
  }

  async function postData(userInput) {
    const locationData = await locationLogic.getData(userInput);
    if (locationData !== 'error') {
      const coords = locationLogic.getCoords(locationData);
      const data = await weatherLogic.getNewWeather(coords);
      postContent(data, locationData);
    } else {
      postError();
    }
  }

  const form = document.querySelector('form');
  let userInput = '';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    userInput = document.getElementById('address').value;
    postData(userInput);
    form.reset();
  });

  function updateUnitBtn() {
    const impUnit = document.querySelector('#imp-unit');
    const metUnit = document.querySelector('#met-unit');
    impUnit.classList.toggle('selected-unit');
    metUnit.classList.toggle('selected-unit');
  }

  function updateDisplayUnit() {
    const weatherObj = weatherLogic.getCurrWeather();
    const displayUnit = document.querySelector('.main-temp');
    displayUnit.innerHTML = `${weatherObj.temp} ${weatherObj.letterUnit}`;
  }

  let pastInput = '';
  const unitContainer = document.querySelector('.unit-container');
  unitContainer.addEventListener('click', () => {
    if (userInput === '' && pastInput === '') {
      userInput = 'San Francisco, CA';
      pastInput = userInput;
      updateUnitBtn();
      updateDisplayUnit();
    } else if (userInput !== '') {
      pastInput = userInput;
      updateUnitBtn();
      updateDisplayUnit();
    } else {
      updateUnitBtn();
      updateDisplayUnit();
    }
  });
})();
