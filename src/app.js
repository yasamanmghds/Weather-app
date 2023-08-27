function getTemp(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  tempContainer.innerHTML = currentTemp;
  cityHeader.innerHTML = response.data.name;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  weather.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchBar(event) {
  event.preventDefault();
  let searchText = document.getElementById("search").value;

  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemp);
}

function currentPositionTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  tempContainer.innerHTML = currentTemp;
  cityHeader.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].main;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentPositionTemp);
}

let search = document.getElementById("search-form");
let currentLoc = document.getElementById("current-location");
let tempContainer = document.getElementById("cel");
let cityHeader = document.getElementById("city-name");
let weather = document.getElementById("weather");
let windSpeed = document.getElementById("wind-speed");
let humidity = document.getElementById("humidity");
let icon = document.getElementById("icon");

currentLoc.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(currentPosition);
});

search.addEventListener("submit", searchBar);

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();

if (hours < 10) {
  hours = "0" + hours;
}

if (minutes < 10) {
  minutes = "0" + minutes;
}
let currentDate = document.getElementById("current-date");
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = weekDays[date.getDay()];

currentDate.innerHTML = `${today} ${hours}:${minutes}`;
