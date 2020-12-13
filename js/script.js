function info(city) {
    let apiKey = "125ae54afb30daf43aec3cdb943d26b0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let windElement = document.querySelector("#wind")
    windElement.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
    let dateElemet = document.querySelector("#current-date");
    dateElemet.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].icon);
    celsiusTemp = response.data.main.temp;
}

function formatDate() {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let date = currentDate.getDate();
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let formattedDate = `${day} ${month} ${date}, ${hours}:${minutes}`;
    return formattedDate;
}

function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    console.log(cityInput.value);
    info(cityInput.value)
}

function convertToFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemp*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", searchCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let celsiusTemp = null;

info("Ostend");