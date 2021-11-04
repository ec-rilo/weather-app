import weatherLogic from './weather-data';
import locationLogic from './location-logic';
import { WeatherData } from './weather-classes';

let formLogic = (() => {
  function postContent(data, locationData) {
    weatherLogic.setMainIcon(data);
    weatherLogic.setMainText(data, locationData);
  }

  async function postData(userInput) {
    const locationData = await locationLogic.getData(userInput);
    const coords = locationLogic.getCoords(locationData);
    const units = weatherLogic.getUnits();
    const data = await weatherLogic.getWeather(coords, units);
    postContent(data, locationData);
  }

  const form = document.querySelector('form');
  let userInput = 'San Francisco, CA';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    userInput = document.getElementById('address').value;
    postData(userInput);
    form.reset();
  });

  const unitContainer = document.querySelector('.unit-container');
  unitContainer.addEventListener('click', () => {
    const impUnit = document.querySelector('#imp-unit');
    const metUnit = document.querySelector('#met-unit');
    impUnit.classList.toggle('selected-unit');
    metUnit.classList.toggle('selected-unit');
    postData(userInput);
  });
})();
