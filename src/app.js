function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let theDate = weekDays[date.getDay()];

  return `${theDate}, ${hours}:${minutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getTemprature(response) {
  let temprature = document.getElementById("temp");
  let icon = document.getElementById("icon");
  let cityName = document.getElementById("city-name");
  let dateTime = document.getElementById("date-time");
  let windSpeed = document.getElementById("wind-speed");
  let humidity = document.getElementById("humidity");
  let description = document.getElementById("description");
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;
  getForecast(lat, lon);

  temprature.innerHTML = `${Math.round(response.data.main.temp)}℃`;
  cityName.innerHTML = response.data.name;
  dateTime.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  windSpeed.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} m/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}
function callWeatherApi(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemprature);
}
function forecast(response) {
  let weatherForecast = response.data.daily;
  let foreCast = document.getElementById("forecast");
  let forcastHtml = `<div class="row custom-row">`;
  weatherForecast.forEach(function (day, index) {
    if (index < 5) {
      forcastHtml += `<div class="col-auto forecast-cards">
            <p>${formatDay(day.dt)}</p>
            <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="${day.weather[0].description}" />
            <div class="row">
              <span class="col-auto max-weather">${Math.round(
                day.temp.max
              )}°</span>
              <span class="col-auto min-weather">${Math.round(
                day.temp.min
              )}°</span>
            </div>
          </div>`;
    }
  });
  forcastHtml += `</div>`;
  foreCast.innerHTML = forcastHtml;
}
function getForecast(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(url).then(forecast);
}

function searchBar(event) {
  event.preventDefault();
  let searchText = document.getElementById("search").value;
  callWeatherApi(searchText);
}
let search = document.getElementById("city-search");
let apiKey = "6643c7326a4c2a38838264a28531d97e";
search.addEventListener("submit", searchBar);

callWeatherApi("tehran");
