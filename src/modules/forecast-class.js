import sunSrc from '../images/icons/sun.png';
import cloudSrc from '../images/icons/cloud.png';
import rainSrc from '../images/icons/rain.png';
import thunderSrc from '../images/icons/thunderstorm.png';
import dangerSrc from '../images/icons/weather-danger.png';
import fogSrc from '../images/icons/fog.png';

class WeatherForecast {
  #maxTempArr;
  #minTempArr;
  #iconIdArr;
  #weatherDescripArr;
  #weatherNameArr;
  // met = Metric, imp = Imperial
  constructor(impData, metData) {
    this.impData = impData;
    this.metData = metData;
    this.#maxTempArr = [];
    this.#minTempArr = [];
    this.#iconIdArr = [];
    this.#weatherNameArr = [];
    this.#weatherDescripArr = [];
  }

  get letterUnit() {
    const impUnit = document.querySelector('#imp-unit');
    if (impUnit.classList.contains('selected-unit')) {
      return '°F';
    } else return '°C';
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
    this.#maxTempArr[0] = maxTemp;
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

  #minUpdate1(privIndex, i, tempArr, iconIdArr, imgDescriptionArr) {
    this.#minTempArr[privIndex] = tempArr[i];
    this.#iconIdArr[privIndex] = iconIdArr[i];
    this.#weatherDescripArr[privIndex] = imgDescriptionArr[i];
  }

  #minUpdate2(privIndex, nextIndex, minTemp, iconIdArr, imgDescriptionArr) {
    this.#minTempArr[privIndex] = minTemp;
    this.#iconIdArr[privIndex] = iconIdArr[nextIndex];
    this.#weatherDescripArr[privIndex + 1] = imgDescriptionArr[nextIndex];
  }

  #initMinDefaults(index, tempArr, iconIdArr, imgDescriptionArr) {
    this.#minTempArr[index] = tempArr[index];
    this.#iconIdArr[index] = iconIdArr[index];
    this.#weatherDescripArr[index] = imgDescriptionArr[index];
  }

  // The below method also updates weather description and name array.
  #filterMinTemp() {
    let tempArr = [];
    for (let i = 0; i < 40; ++i) {
      tempArr.push(Math.round(this.impData.list[i].main.temp_min));
    }

    let iconIdArr = [];
    let imgDescriptionArr = [];
    for (let i = 0; i < 40; ++i) {
      iconIdArr.push(this.impData.list[i].weather[0].icon);
      imgDescriptionArr.push(this.impData.list[i].weather[0].description);
    }

    let minTemp = tempArr[0];
    this.#initMinDefaults(0, tempArr, iconIdArr, imgDescriptionArr);
    for (let i = 0; i < 40; ++i) {
      // Checking min temp for first day.
      if (i <= 4) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minUpdate1(0, i, tempArr, iconIdArr, imgDescriptionArr);
        }
        if (i === 4) {
          minTemp = tempArr[5];
          this.#minUpdate2(1, 5, minTemp, iconIdArr, imgDescriptionArr);
        }
      }

      // Checking min temp for second day.
      else if (i <= 12) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minUpdate1(1, i, tempArr, iconIdArr, imgDescriptionArr);
        }
        if (i === 12) {
          minTemp = tempArr[13];
          this.#minUpdate2(2, 13, minTemp, iconIdArr, imgDescriptionArr);
        }
      }
      // Checking min temp for third day.
      else if (i <= 20) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minUpdate1(2, i, tempArr, iconIdArr, imgDescriptionArr);
        }
        if (i === 20) {
          minTemp = tempArr[21];
          this.#minUpdate2(3, 21, minTemp, iconIdArr, imgDescriptionArr);
        }
      }

      // Checking min temp for forth day.
      else if (i <= 28) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minUpdate1(3, i, tempArr, iconIdArr, imgDescriptionArr);
        }
        if (i === 28) {
          minTemp = tempArr[29];
          this.#minUpdate2(4, 29, minTemp, iconIdArr, imgDescriptionArr);
        }
      }

      // Checking min temp for fifth day.
      else if (i <= 36) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minUpdate1(4, i, tempArr, iconIdArr, imgDescriptionArr);
        }
        if (i === 36) {
          minTemp = tempArr[37];
          this.#minUpdate2(5, 37, minTemp, iconIdArr, imgDescriptionArr);
        }
      }

      // Checking min temp for sixth day.
      if (i <= 39) {
        if (minTemp > tempArr[i]) {
          minTemp = tempArr[i];
          this.#minUpdate1(5, i, tempArr, iconIdArr, imgDescriptionArr);
        }
      }
    }
  }

  #getMaxTemp(index) {
    let maxTemp;
    this.letterUnit === '°F'
      ? (maxTemp = `${this.#maxTempArr[index]} °F`)
      : (maxTemp = `${this.#maxTempArr[index]} °C`);
    return maxTemp;
  }

  maxTemp(date) {
    this.#filterMaxTemp();
    switch (date) {
      case 0:
        return this.#getMaxTemp(0);
        break;
      case 1:
        return this.#getMaxTemp(1);
        break;
      case 2:
        return this.#getMaxTemp(2);
        break;
      case 3:
        return this.#getMaxTemp(3);
        break;
      case 4:
        return this.#getMaxTemp(4);
        break;
      case 5:
        return this.#getMaxTemp(5);
        break;
      default:
        console.log('please enter a valid integer value (0 - 5)');
    }
  }

  #getMinTemp(index) {
    let minTemp;
    this.letterUnit === '°F'
      ? (minTemp = `${this.#minTempArr[index]} °F`)
      : (minTemp = `${this.#minTempArr[index]} °C`);
    return minTemp;
  }

  minTemp(date) {
    this.#filterMinTemp();
    switch (date) {
      case 0:
        return this.#getMinTemp(0);
        break;
      case 1:
        return this.#getMinTemp(1);
        break;
      case 2:
        return this.#getMinTemp(2);
        break;
      case 3:
        return this.#getMinTemp(3);
        break;
      case 4:
        return this.#getMinTemp(4);
        break;
      case 5:
        return this.#getMinTemp(5);
        break;
      default:
        console.log('please enter a valid integer value (0 - 5)');
    }
  }

  #importAllImgs(r) {
    return r.keys().map(r);
  }

  weatherImg(index) {
    this.#filterMinTemp();
    const images = this.#importAllImgs(
      require.context(
        '../images/icons/weather-icons',
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
    const info = this.#weatherDescripArr[index];
    const iconId = this.#iconIdArr[index];
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
          src: images[3],
          description: info,
        };
        break;
      case '02n':
        icon = {
          src: images[4],
          description: info,
        };
        break;
      case '03d':
        icon = {
          src: images[5],
          description: info,
        };
        break;
      case '03n':
        icon = {
          src: images[6],
          description: info,
        };
        break;
      case '04d':
        icon = {
          src: images[7],
          description: info,
        };
        break;
      case '04n':
        icon = {
          src: images[8],
          description: info,
        };
        break;
      case '09d':
        icon = {
          src: images[9],
          description: info,
        };
        break;
      case '09n':
        icon = {
          src: images[10],
          description: info,
        };
        break;
      case '10d':
        icon = {
          src: images[11],
          description: info,
        };
        break;
      case '10n':
        icon = {
          src: images[12],
          description: info,
        };
        break;
      case '11d':
        icon = {
          src: images[13],
          description: info,
        };
        break;
      case '11n':
        icon = {
          src: images[14],
          description: info,
        };
        break;
      case '13d':
        icon = {
          src: images[15],
          description: info,
        };
        break;
      case '13n':
        icon = {
          src: images[16],
          description: info,
        };
        break;
      case '50d':
        icon = {
          src: images[17],
          description: info,
        };
        break;
      case '50n':
        icon = {
          src: images[18],
          description: info,
        };
        break;
      default:
        console.log('An error has occurred in image filtering.');
    }
    return icon;
  }
}

export default WeatherForecast;
