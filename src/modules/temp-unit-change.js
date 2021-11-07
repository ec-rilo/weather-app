import weatherLogic from './weather-data';
import weatherWeek from './forecast-data';

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

const unitContainer = document.querySelector('.unit-container');
unitContainer.addEventListener('click', () => {
  updateUnitBtn();
  updateDisplayUnit();
  const forecastData = weatherWeek.getCurrForecast();
  weatherWeek.popWeekContainer(data);
});
