import { createIcon } from './dom-creation';
import sunSrc from '../images/icons/sun.png';
import cloudSrc from '../images/icons/cloud.png';
import rainSrc from '../images/icons/rain.png';
import thunderSrc from '../images/icons/thunderstorm.png';
import dangerSrc from '../images/icons/weather-danger.png';
import fogSrc from '../images/icons/fog.png';

class WeatherData {
  #iconIdArr;
  constructor(data, metricData) {
    this.data = data;
    this.metricData = metricData;
    this.#iconIdArr = [];
  }

  get temp() {
    const impUnit = document.querySelector('#imp-unit');
    if (impUnit.classList.contains('selected-unit')) {
      return Math.round(this.data.main.temp);
    } else return Math.round(this.metricData.main.temp);
  }

  get letterUnit() {
    const impUnit = document.querySelector('#imp-unit');
    if (impUnit.classList.contains('selected-unit')) {
      return '°F';
    } else return '°C';
  }

  get maxTemp() {
    return Math.round(this.data.main.temp_max);
  }

  get minTemp() {
    return Math.round(this.data.main.temp_min);
  }

  get weather() {
    return this.data.weather[0].main;
  }

  get weatherDesc() {
    return this.data.weather[0].description;
  }

  #importAllImgs(r) {
    return r.keys().map(r);
  }

  get weatherImg() {
    const images = this.#importAllImgs(
      require.context(
        '../images/icons/weather-icons',
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
    const info = this.data.weather[0].description;
    const iconId = this.data.weather[0].icon;
    let icon;
    switch (iconId) {
      case '01d':
        icon = {
          src: images[0],
          description: info,
        };
        break;
      case '01n':
        icon = {
          src: images[1],
          description: info,
        };
        break;
      case '02d':
        icon = {
          src: images[2],
          description: info,
        };
        break;
      case '02n':
        icon = {
          src: images[3],
          description: info,
        };
        break;
      case '03d':
        icon = {
          src: images[4],
          description: info,
        };
        break;
      case '03n':
        icon = {
          src: images[5],
          description: info,
        };
        break;
      case '04d':
        icon = {
          src: images[6],
          description: info,
        };
        break;
      case '04n':
        icon = {
          src: images[7],
          description: info,
        };
        break;
      case '09d':
        icon = {
          src: images[8],
          description: info,
        };
        break;
      case '09n':
        icon = {
          src: images[9],
          description: info,
        };
        break;
      case '10d':
        icon = {
          src: images[10],
          description: info,
        };
        break;
      case '10n':
        icon = {
          src: images[11],
          description: info,
        };
        break;
      case '11d':
        icon = {
          src: images[12],
          description: info,
        };
        break;
      case '11n':
        icon = {
          src: images[13],
          description: info,
        };
        break;
      case '13d':
        icon = {
          src: images[14],
          description: info,
        };
        break;
      case '13n':
        icon = {
          src: images[15],
          description: info,
        };
        break;
      case '50d':
        icon = {
          src: images[16],
          description: info,
        };
        break;
      case '50n':
        icon = {
          src: images[17],
          description: info,
        };
        break;
      default:
        console.log('An error has occurred in image filtering.');
    }
    return icon;
  }

  get cityName() {
    return this.data.name;
  }

  get lat() {
    return this.data.coord.lat;
  }

  get lon() {
    return this.data.coord.lon;
  }
}

export { WeatherData };
