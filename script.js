document.addEventListener("DOMContentLoaded", function () {
    var weatherForm = document.getElementById("weatherForm");
    var currentTimeElement = document.getElementById("current-time");
    var apiKey = "cef252326d7bca73b08f89809e86540a"; 
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        currentTimeElement.textContent = hours + ":" + minutes + ":" + seconds;
    }

    setInterval(updateClock, 1000);
    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var city = document.getElementById("cityInput").value;
        var country = document.getElementById("countryInput").value;

        getWeatherData(city, country);
    });

    function getWeatherData(city, country) {
        
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                return response.json();
            })
            .then(data => {
    
                updateWeatherView(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert("Failed to fetch weather data. Please try again later.");
            });
    }

    function updateWeatherView(weatherData) {
        var tempElement = document.getElementById("temp");
        var descriptionElement = document.getElementById("description");
        var iconElement = document.getElementById("icon");

        tempElement.textContent = "Temperature: " + (weatherData.main.temp - 273.15).toFixed(2) + " °C";
        descriptionElement.textContent = "Description: " + weatherData.weather[0].description;
        iconElement.innerHTML = "<img src='http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png'>";
    }
}
