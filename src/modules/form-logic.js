import weatherLogic from './weather-data';
import locationLogic from './location-logic';

let formLogic = (() => {
  function postContent(data, locationData) {
    weatherLogic.setMainIcon(data);
    weatherLogic.setMainText(data, locationData);
  }

  async function postData(userInput) {
    const locationData = await locationLogic.getData(userInput);
    const coords = locationLogic.getCoords(locationData);
    const data = await weatherLogic.getWeather(coords);
    postContent(data, locationData);
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('address').value;
    postData(userInput);
  });
})();
