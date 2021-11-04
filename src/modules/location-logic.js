let locationLogic = (() => {
  function formatLocation(userInput) {
    userInput = userInput.replace(',', '');
    let arrOfStr = userInput.split(' ');
    return arrOfStr;
  }

  function getState(userInput) {
    const arrOfStr = formatLocation(userInput);
    const state = arrOfStr[arrOfStr.length - 1];
    if (state.length === 2) {
      return state;
    } else return '';
  }

  function getCity(userInput) {
    const arrOfStr = formatLocation(userInput);
    if (!getState(userInput) == '') {
      arrOfStr.pop();
      const city = arrOfStr.join(' ');
      return city;
    } else {
      const city = arrOfStr.join(' ');
      return city;
    }
  }

  function getCoords(data) {
    const coords = {
      lat: data.results[0].geometry.location.lat,
      lon: data.results[0].geometry.location.lng,
    };
    return coords;
  }

  async function getData(userInput) {
    const apiKey = 'AIzaSyD_kDl3O6qjcGG3sNHWMnUyqHtjBEcHEJo';
    const city = getCity(userInput);
    const state = getState(userInput);

    try {
      if (city !== '' && state !== '') {
        const dataResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${apiKey}`,
          { mode: 'cors' }
        );
        const data = await dataResponse.json();

        return data;
      } else return 'error';
    } catch (err) {
      alert(err);
    }
  }

  return { getData, getCoords };
})();

export default locationLogic;
