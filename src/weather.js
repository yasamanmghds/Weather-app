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

  return `${theDate} ${hours}:${minutes}`;
}

function getTemp(response) {
  let tempContainer = document.getElementById("cel");
  let cityHeader = document.getElementById("city-name");
  let weather = document.getElementById("weather");
  let windSpeed = document.getElementById("wind-speed");
  let humidity = document.getElementById("humidity");
  let icon = document.getElementById("icon");
  let currentDate = document.getElementById("current-date");

  celsiusTemp = response.data.main.temp;

  let currentTemp = Math.round(celsiusTemp);

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
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

function apiRequest(city) {
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemp);
}

function searchBar(event) {
  event.preventDefault();
  let searchText = document.getElementById("search").value;
  apiRequest(searchText);
}

function calculateFarTemp() {
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temprature = document.getElementById("cel");
  let calc = (celsiusTemp * 9) / 5 + 32;
  temprature.innerHTML = Math.round(calc);
}
function calculateCelTemp() {
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temprature = document.getElementById("cel");
  temprature.innerHTML = Math.round(celsiusTemp);
}

let search = document.getElementById("search-form");

let fahrenheit = document.getElementById("far-unit");
let celsius = document.getElementById("cel-unit");

let celsiusTemp = null;

fahrenheit.addEventListener("click", calculateFarTemp);
celsius.addEventListener("click", calculateCelTemp);
search.addEventListener("submit", searchBar);
apiRequest("Tokyo");
