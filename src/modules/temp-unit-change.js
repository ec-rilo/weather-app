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

function updateForecast() {
  const weekItemsArr = [...document.querySelectorAll('.week-item')];
  const data = weatherWeek.getCurrForecast();

  for (let i = 0; i < 6; ++i) {
    let maxTempElem =
      weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling;
    maxTempElem.innerHTML = data.maxTemp(i);

    let minTempElem =
      weekItemsArr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling
        .nextSibling;
    minTempElem.innerHTML = data.minTemp(i);
  }
}

const unitContainer = document.querySelector('.unit-container');
unitContainer.addEventListener('click', () => {
  updateUnitBtn();
  updateDisplayUnit();
  updateForecast();
});
