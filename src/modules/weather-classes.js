import { createIcon } from './dom-creation';
import sunSrc from '../images/icons/sun.png';
import cloudSrc from '../images/icons/cloud.png';
import rainSrc from '../images/icons/rain.png';
import thunderSrc from '../images/icons/thunderstorm.png';

class WeatherData {
  constructor(data) {
    this.data = data;
  }

  get temp() {
    return this.data.main.temp;
  }

  get maxTemp() {
    return this.data.main.temp_max;
  }

  get minTemp() {
    return this.data.main.temp_min;
  }

  get weather() {
    return this.data.weather[0].main;
  }

  get weatherDesc() {
    return this.data.weather[0].description;
  }

  get weatherImg() {
    let icon;
    switch (this.data.weather[0].main) {
      case 'Clear':
        icon = createIcon(sunSrc, this.data.weather[0].description);
        break;
      case 'Clouds':
        icon = createIcon(cloudSrc, this.data.weather[0].description);
        break;
      case 'Thunderstorm':
        icon = createIcon(thunderSrc, this.data.weather[0].description);
        break;
      case 'Rain':
        icon = createIcon(rainSrc, this.data.weather[0].description);
        break;
      default:
        console.log('An error has occurred in image filtering');
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
