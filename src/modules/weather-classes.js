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
}

export { WeatherData };
