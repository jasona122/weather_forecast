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
    }

    display(dataArray) {
        let displayArea = document.getElementById(this.elementId);

        // Populate cards by looping through
        for(let i = 0; i < dataArray.length; i++) {
            let forecast = dataArray[i];

            // Add title data (date and day)
            let forecastDate = new Date(forecast.date);
            let cardTitle = document.getElementById("titleDay" + i);
            cardTitle.innerHTML = forecastDate.toLocaleString('default', { weekday: 'long'}) + ", " + forecastDate.getDate() + 
            " " + forecastDate.toLocaleString('default', {month: 'long'});
            
            // Add weather description of forecast
            let cardDescription = document.getElementById("descDay" + i);
            cardDescription.innerHTML = forecast.forecast;

            // Add rows of specific forecast data
            let dataTable = document.getElementById("dataDay" + i);

            // Clear table before populating
            while(dataTable.hasChildNodes()) {
                dataTable.removeChild(dataTable.lastChild);
            }

            // Add temperature data
            let temperatureRow = document.createElement("li");
            temperatureRow.classList.add("list-group-item");
            // Apply thermometer icon
            temperatureRow.innerHTML = '<i class="fas fa-thermometer-empty"></i> '
            temperatureRow.innerHTML += forecast.temperature.low + " - " + forecast.temperature.high + "&deg;C";
            dataTable.appendChild(temperatureRow);

            //Add wind data
            let windRow = document.createElement("li");
            windRow.classList.add("list-group-item");
            // Apply wind icon
            windRow.innerHTML = '<i class="fas fa-wind"></i> ';
            windRow.innerHTML += forecast.wind.direction + " | " + forecast.wind.speed.low + " - " + forecast.wind.speed.high + " km/h";
            dataTable.appendChild(windRow);

        }
    }
}


function initScreen() {
    let weather = new WeatherForecast();
    let display = new WeatherDisplay();
    weather.forecast().then(function(response) {
        display.display(response.data.items[0].forecasts);
    });
}

initScreen();

//window.onload = initScreen;
