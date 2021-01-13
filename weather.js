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
        this.displayArea = document.getElementById("forecastDisplayArea");
    }

    createCard(cardNumber) {
        // Create main outer card div
        let cardOuter = document.createElement("div");
        cardOuter.style.width = "18rem"
        cardOuter.classList.add("card");
        cardOuter.id = "day" + cardNumber;

        // Create inner card body div
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Create card title (day of forecast)
        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.id = "titleDay" + cardNumber;

        // Create card description (description of forecast)
        let cardDesc = document.createElement("p");
        cardDesc.classList.add("card-text");
        cardDesc.id = "descDay" + cardNumber;

        // Create unordered list to store forecast data
        let cardDataList = document.createElement("ul");
        cardDataList.classList.add("list-group");
        cardDataList.classList.add("list-group-flush");
        cardDataList.id = "dataDay" + cardNumber;

        // Attach all elements to card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDesc);
        cardBody.appendChild(cardDataList);

        // Attach card body to main outer card div
        cardOuter.appendChild(cardBody);

        // Attach card to main display area
        this.displayArea.appendChild(cardOuter);
    }

    display(dataArray) {
        // Create and populate cards by looping through
        for(let i = 0; i < dataArray.length; i++) {
            let forecast = dataArray[i];

            // Create card to display data
            this.createCard(i);

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

            // Add wind data
            let windRow = document.createElement("li");
            windRow.classList.add("list-group-item");
            // Apply wind icon
            windRow.innerHTML = '<i class="fas fa-wind"></i> ';
            windRow.innerHTML += forecast.wind.direction + " | " + forecast.wind.speed.low + " - " + forecast.wind.speed.high + " km/h";
            dataTable.appendChild(windRow);

            // Add humidity data
            let humidityRow = document.createElement("li");
            humidityRow.classList.add("list-group-item");
            // Apply humidity icon
            humidityRow.innerHTML = '<i class="fas fa-tint"></i> '
            humidityRow.innerHTML += forecast.relative_humidity.low + " - " + forecast.relative_humidity.high + "%";
            dataTable.appendChild(humidityRow);
        }
    }
}


function initScreen() {
    let weather = new WeatherForecast();
    let display = new WeatherDisplay();
    weather.forecast().then(function(response) {
        console.log(response.data);
        display.display(response.data.items[0].forecasts);
    },
    function(err) {
        // On error, log the error reason
        console.log(err);
    });
}

window.onload = initScreen;