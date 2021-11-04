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
      const units = weatherLogic.getUnits();
      const data = await weatherLogic.getWeather(coords, units);
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

  function updateUnit() {
    const impUnit = document.querySelector('#imp-unit');
    const metUnit = document.querySelector('#met-unit');
    impUnit.classList.toggle('selected-unit');
    metUnit.classList.toggle('selected-unit');
  }

  let pastInput = '';
  const unitContainer = document.querySelector('.unit-container');
  unitContainer.addEventListener('click', () => {
    if (userInput === '' && pastInput === '') {
      userInput = 'San Francisco, CA';
      pastInput = userInput;
      updateUnit();
      postData(pastInput);
    } else if (userInput !== '') {
      pastInput = userInput;
      updateUnit();
      postData(pastInput);
    } else {
      updateUnit();
      postData(pastInput);
    }
  });
})();
