const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

const weather = {};
weather.temperature = {
  unit: 'celcius'
}

// API Key
const key = "91628f92335ec7857f5958a5802666a0";
// Const variables
const kelvin = 273;

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = 'block;'
  notificationElement.innerHTML = '<p>Browser doesnt support Geolocation.</p>'
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  // Call function getWeather
  getWeather(latitude, longitude);
}


// Show error if an issue with geo location service
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message}</p>`;
}


function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      displayWeather();
      weather.temperature.value = Math.floor(data.main.temp - kelvin);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;

    })
    .then(function () {
      displayWeather();
    })

}

// Displays the visible aspect of the weather app
function displayWeather() {
  iconElement.innerHTML = `<img src=''icons/${weather.iconId}.png'/>`;
  tempElement.innerHTML = `${weather.temperature.value} ˚ <span>C</span>`
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Celsius to Fahrenheit
function celsiusToFahrenheit(temperature) {
  return (temperature * 9 / 5) + 32;
}


// Click function temp conversion

tempElement.addEventListener('click', function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit === 'celcius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}˚<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';

  } else {

    tempElement.innerHTML = `${weather.temperature.value}˚ <span>C</span>`;
    weather.temperature.unit = 'celcius';

  }



})











