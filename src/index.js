let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

function minutesFormat() {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return `${minutes}`;
  }
}

let todayDate = document.querySelector("h6");
todayDate.innerHTML = `${day} ${hours}:${minutesFormat()} `;

function weather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureCity = document.querySelector("#temp");
  temperatureCity.innerHTML = `${temperature}°C`;
  console.log(temperature);

  let description = response.data.weather[0].description;
  let descriptionCity = document.querySelector("#text-description");
  descriptionCity.innerHTML = ` ${description} `;

  let humidity = response.data.main.humidity;
  let humidityCity = document.querySelector("#text-humidity");
  humidityCity.innerHTML = `Humidity:  ${humidity}% `;

  let wind = Math.round(response.data.wind.speed);
  let windCity = document.querySelector("#text-wind");
  windCity.innerHTML = `Wind:  ${wind}  km/h`;
}

function searchCity(city) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weather);
}

function typeCity(event) {
  event.preventDefault();
  let searching = document.querySelector("h1");
  let input = document.querySelector("#type-a-city");
  searching.innerHTML = input.value;
  searchCity(input.value);
}
let typeSearch = document.querySelector("#form");
typeSearch.addEventListener("submit", typeCity);

//////////////////////////////////////////////////////////////

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKEY = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKEY}`;

  function weatherLocal(response) {
    let location = response.data.name;
    let locationL = document.querySelector("h1");
    locationL.innerHTML = `${location}`;
    console.log(locationL);

    let temperatureL = Math.round(response.data.main.temp);
    let temperatureCityL = document.querySelector("#temp");
    temperatureCityL.innerHTML = `${temperatureL}°C`;
    console.log(temperatureL);

    let descriptionL = response.data.weather[0].description;
    let descriptionCityL = document.querySelector("#text-description");
    descriptionCityL.innerHTML = ` ${descriptionL} `;

    let humidityL = response.data.main.humidity;
    let humidityCityL = document.querySelector("#text-humidity");
    humidityCityL.innerHTML = `Humidity:  ${humidityL}% `;

    let windL = Math.round(response.data.wind.speed);
    let windCityL = document.querySelector("#text-wind");
    windCityL.innerHTML = `Wind:  ${windL}  km/h`;
  }
  axios.get(apiURL).then(weatherLocal);
}

function showLocalTemperature() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", showLocalTemperature);