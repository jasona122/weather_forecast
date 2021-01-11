const axios = require("axios");

class WeatherForecast {
    constructor() {
        this._apiUrl = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast";
    }

    _getForecastData() {
        return axios.get(this._apiUrl);
    }

    forecast() {
        return this._getForecastData()
    }
}


class WeatherDisplay {
    constructor() {
        this.elementId = "weatherDisplay";
        this._image_map = {
            "sunny": "./img/sunny_image.jpg",
            "cloudy": "./img/cloudy_image.jpg"
        }
    }

    display(dataArray) {
        let displayArea = document.getElementById(this.elementId);

        // Populate cards with loop
        for(let i = 0; i < dataArray.length; i++) {
            let forecast = dataArray[i];
            console.log(forecast);
            let forecastDate = new Date(forecast.date);

            let cardTitle = document.getElementById("titleDay" + i);
            cardTitle.innerHTML = forecastDate.toLocaleString('default', { weekday: 'long'}) + " " + forecastDate.getDate() + 
            " " + forecastDate.toLocaleString('default', {month: 'long'});

            let cardImg = document.getElementById("imgDay" + i);
            //cardImg.src = this._image_map["sunny"];
        }
    }
}


function initScreen() {
    let weather = new WeatherForecast();
    let display = new WeatherDisplay();
    weather.forecast().then(function(response) {
        console.log(response.data.items[0].forecasts);
        display.display(response.data.items[0].forecasts);
    });
}

initScreen();

//window.onload = initScreen;
