const axios = require("axios");

class Weather {
    constructor() {
        this._apiUrl = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast";
    }

    _getForecastData() {
        return axios.get(this._apiUrl);
    }

    _formatForecastData() {

    }

    forecast() {
        
    }
}

let weather = new Weather();

weather._getForecastData().then(function(response) {
    console.log(response.data.items[0].forecasts[0].wind.speed);
});