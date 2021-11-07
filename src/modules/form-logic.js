import weatherLogic from './weather-data';
import locationLogic from './location-logic';
import weatherWeek from './forecast-data';

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
    weatherWeek.updateForecast(userInput);
    form.reset();
  });
})();
