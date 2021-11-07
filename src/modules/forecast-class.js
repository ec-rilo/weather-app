import sunSrc from '../images/icons/sun.png';
import cloudSrc from '../images/icons/cloud.png';
import rainSrc from '../images/icons/rain.png';
import thunderSrc from '../images/icons/thunderstorm.png';
import dangerSrc from '../images/icons/weather-danger.png';
import fogSrc from '../images/icons/fog.png';

class WeatherForecast {
  #maxTempArr;
  #minTempArr;
  #weatherNameArr;
  #weatherDescripArr;
  // met = Metric, imp = Imperial
  constructor(impData, metData) {
    this.impData = impData;
    this.metData = metData;
    this.#maxTempArr = [];
    this.#minTempArr = [];
    this.#weatherNameArr = [];
    this.#weatherDescripArr = [];
  }

  /* IMPORTANT
   *
   * The reason the filters go in intervals is because in the list
   * from the api where I get the temps and other information
   *
   * The intervals between:
   * 0 - 4 cover 1st day forecast.
   * 5 - 12 cover 2nd day forecast.
   * 13 - 20 cover 3rd day forecast.
   * 21 - 28 cover 4th day forecast.
   * 29 - 36 cover 5th day forecast.
   * 37 - 39 cover 6th day forecast.
   *
   * Leaving a total of 40 items in the list.
   */

  #filterMaxTemp() {
    let tempArr = [];
    for (let i = 0; i < 40; ++i) {
      tempArr.push(Math.round(this.impData.list[i].main.temp_max));
    }

    let maxTemp = tempArr[0];
    for (let i = 0; i < 40; ++i) {
      // Checking max temp for first day.
      if (i <= 4) {
        if (maxTemp < tempArr[i]) {
          maxTemp = tempArr[i];
          this.#maxTempArr[0] = tempArr[i];
        }
        if (i === 4) {
          maxTemp = tempArr[5];
          this.#maxTempArr[1] = maxTemp;
        }
      }

      // Checking max temp for second day.
      else if (i <= 12) {
        if (maxTemp < tempArr[i]) {
          maxTemp = tempArr[i];
          this.#maxTempArr[1] = tempArr[i];
        }
        if (i === 12) {
          maxTemp = tempArr[13];
          this.#maxTempArr[2] = maxTemp;
        }
      }

      // Checking max temp for third day.
      else if (i <= 20) {
        if (maxTemp < tempArr[i]) {
          maxTemp = tempArr[i];
          this.#maxTempArr[2] = tempArr[i];
        }
        if (i === 20) {
          maxTemp = tempArr[21];
          this.#maxTempArr[3] = maxTemp;
        }
      }

      // Checking max temp for forth day.
      else if (i <= 28) {
        if (maxTemp < tempArr[i]) {
          maxTemp = tempArr[i];
          this.#maxTempArr[3] = tempArr[i];
        }
        if (i === 28) {
          maxTemp = tempArr[29];
          this.#maxTempArr[4] = maxTemp;
        }
      }

      // Checking max temp for fifth day.
      else if (i <= 36) {
        if (maxTemp < tempArr[i]) {
          maxTemp = tempArr[i];
          this.#maxTempArr[4] = tempArr[i];
        }
        if (i === 36) {
          maxTemp = tempArr[37];
          this.#maxTempArr[5] = maxTemp;
        }
      }

      // Checking max temp for sixth day.
      else if (i <= 39) {
        if (maxTemp < tempArr[i]) {
          maxTemp = tempArr[i];
          this.#maxTempArr[5] = tempArr[i];
        }
      }
    }
  }

  // The below method also updates weather description and name array.
  #filterMinTemp() {
    let tempArr = [];
    for (let i = 0; i < 40; ++i) {
      tempArr.push(Math.round(this.impData.list[i].main.temp_min));
    }

    let imgNameArr = [];
    let imgDescriptionArr = [];
    for (let i = 0; i < 40; ++i) {
      imgNameArr.push(this.impData.list[i].weather[0].main);
      imgDescriptionArr.push(this.impData.list[i].weather[0].description);
    }

    let minTemp = tempArr[0];
    this.#minTempArr[0] = tempArr[0];
    this.#weatherNameArr[0] = imgNameArr[0];
    this.#weatherDescripArr[0] = imgDescriptionArr[0];
    for (let i = 0; i < 40; ++i) {
      // Checking min temp for first day.
      if (i <= 4) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minTempArr[0] = tempArr[i];
          this.#weatherNameArr[0] = imgNameArr[i];
          this.#weatherDescripArr[0] = imgDescriptionArr[i];
        }
        if (i === 4) {
          minTemp = tempArr[5];
          this.#minTempArr[1] = minTemp;
          this.#weatherNameArr[1] = imgNameArr[5];
          this.#weatherDescripArr[1] = imgDescriptionArr[5];
        }
      }

      // Checking min temp for second day.
      else if (i <= 12) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minTempArr[1] = tempArr[i];
          this.#weatherNameArr[1] = imgNameArr[i];
          this.#weatherDescripArr[1] = imgDescriptionArr[i];
        }
        if (i === 12) {
          minTemp = tempArr[13];
          this.#minTempArr[2] = minTemp;
          this.#weatherNameArr[2] = imgNameArr[13];
          this.#weatherDescripArr[2] = imgDescriptionArr[13];
        }
      }

      // Checking min temp for third day.
      else if (i <= 20) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minTempArr[2] = tempArr[i];
          this.#weatherNameArr[2] = imgNameArr[i];
          this.#weatherDescripArr[2] = imgDescriptionArr[i];
        }
        if (i === 20) {
          minTemp = tempArr[21];
          this.#minTempArr[3] = minTemp;
          this.#weatherNameArr[3] = imgNameArr[21];
          this.#weatherDescripArr[3] = imgDescriptionArr[21];
        }
      }

      // Checking min temp for forth day.
      else if (i <= 28) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minTempArr[3] = tempArr[i];
          this.#weatherNameArr[3] = imgNameArr[i];
          this.#weatherDescripArr[3] = imgDescriptionArr[i];
        }
        if (i === 28) {
          minTemp = tempArr[29];
          this.#minTempArr[4] = minTemp;
          this.#weatherNameArr[4] = imgNameArr[29];
          this.#weatherDescripArr[4] = imgDescriptionArr[29];
        }
      }

      // Checking min temp for fifth day.
      else if (i <= 36) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minTempArr[4] = tempArr[i];
          this.#weatherNameArr[4] = imgNameArr[i];
          this.#weatherDescripArr[4] = imgDescriptionArr[i];
        }
        if (i === 36) {
          minTemp = tempArr[37];
          this.#minTempArr[5] = minTemp;
          this.#weatherNameArr[5] = imgNameArr[37];
          this.#weatherDescripArr[5] = imgDescriptionArr[37];
        }
      }

      // Checking min temp for sixth day.
      else if (i <= 39) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minTempArr[5] = tempArr[i];
          this.#weatherNameArr[5] = imgNameArr[i];
          this.#weatherDescripArr[5] = imgDescriptionArr[i];
        }
      }
    }
  }

  impMaxTemp(date) {
    this.#filterMaxTemp();
    switch (date) {
      case 0:
        return `${this.#maxTempArr[0]} °F`;
        break;
      case 1:
        return `${this.#maxTempArr[1]} °F`;
        break;
      case 2:
        return `${this.#maxTempArr[2]} °F`;
        break;
      case 3:
        return `${this.#maxTempArr[3]} °F`;
        break;
      case 4:
        return `${this.#maxTempArr[4]} °F`;
        break;
      case 5:
        return `${this.#maxTempArr[5]} °F`;
        break;
      default:
        console.log('please enter a valid integer value (0 - 5)');
    }
  }

  impMinTemp(date) {
    this.#filterMinTemp();
    switch (date) {
      case 0:
        return `${this.#minTempArr[0]} °F`;
        break;
      case 1:
        return `${this.#minTempArr[1]} °F`;
        break;
      case 2:
        return `${this.#minTempArr[2]} °F`;
        break;
      case 3:
        return `${this.#minTempArr[3]} °F`;
        break;
      case 4:
        return `${this.#minTempArr[4]} °F`;
        break;
      case 5:
        return `${this.#minTempArr[5]} °F`;
        break;
      default:
        console.log('please enter a valid integer value (0 - 5)');
    }
  }

  weatherImg(index) {
    const weatherName = this.#weatherNameArr[index];
    const weatherDescrip = this.#weatherDescripArr[index];
    let icon;
    switch (weatherName) {
      case 'Clear':
        icon = {
          src: sunSrc,
          description: weatherDescrip,
        };
        break;
      case 'Clouds':
        icon = {
          src: cloudSrc,
          description: weatherDescrip,
        };
        break;
      case 'Thunderstorm':
        icon = {
          src: thunderSrc,
          description: weatherDescrip,
        };
        break;
      case 'Rain':
        icon = {
          src: rainSrc,
          description: weatherDescrip,
        };
        break;
      case 'Smoke':
        icon = {
          src: dangerSrc,
          description: weatherDescrip,
        };
        break;
      case 'Dust':
        icon = {
          src: dangerSrc,
          description: weatherDescrip,
        };
        break;
      case 'Haze':
        icon = {
          src: dangerSrc,
          description: weatherDescrip,
        };
        break;
      case 'Fog':
        icon = {
          src: fogSrc,
          description: weatherDescrip,
        };
        break;
      case 'Sand':
        icon = {
          src: dangerSrc,
          description: weatherDescrip,
        };
        break;
      default:
        console.log(
          'An error has occurred in image filtering.' +
            `"${this.data.weather[0].main}" is not a case. `
        );
    }
    return icon;
  }
}

export default WeatherForecast;
