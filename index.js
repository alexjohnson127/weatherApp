const timeBlock = document.getElementById("timeBlock");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("submit");
const currentWeather = document.querySelector(".currentConditon");
const curTemp = document.querySelector("#curTemp");
const curCond = document.getElementById("curCond");
const wind = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const extendedForecast = document.getElementById("extendedForecast");
const forecastButton = document.getElementById("forecastButton");

const APIKEY = 'c6094e9c05134d49b8e170231231903';


window.onload = updateTime;
setInterval(updateTime, 1000);
searchButton.addEventListener("click", getWeather);
forecastButton.addEventListener("click", getForecast);

function updateTime(){
    let curTime = new Date();
    let minutes = curTime.getMinutes();
    let hours = curTime.getHours();
    let amPm = 'AM';
    if (hours >= 12){
        amPm = 'PM';
        hours = (hours == 12) ? 12 : hours % 12;
    }
    minutes = (minutes < 10) ? '0'+minutes : minutes;
    timeBlock.innerHTML = `${hours}:${minutes} ${amPm}`;
}

function getWeather(){
    let city = cityInput.value;
    let url = `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            curTemp.innerText = `${result.current.temp_f} \u00B0F`;
            curCond.innerText = `${result.current.condition.text}`;
            wind.innerText = `Wind: ${result.current.wind_mph} MPH`;
            feelsLike.innerText = `Feels Like: ${result.current.feelslike_f} \u00B0F`;
        }) 
}

function getForecast(){
    let city = cityInput.value;
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=1&aqi=no&alerts=no`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            let forecastData = result;
            console.log(forecastData);
            for (let i in forecastData.forecast.forecastday[0].hour){
                console.log(forecastData.forecast.forecastday[0].i.temp_f);
            }
        })

    
}