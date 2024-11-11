const apiKey = 'a4f564b55bd5ca0ad8131024dadf9f4f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput=document.getElementById("cityInput");
const weatherDetails=document.getElementById("weatherDetails");
const cityNameFeild=document.getElementById("cityName");
const temperatureFeild=document.getElementById("temperature");
const humidityFeild=document.getElementById("humidity");
const windFeild=document.getElementById("windSpeed");
const conditionFeild=document.getElementById("condition");

function getWeather(){
    const city=cityInput.value;
    if(city){
        fetchWeatherData(city);
    }else{
        showError("Please enter a city name");
    }
}

async function fetchWeatherData(city){
    try{
        const response=await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error('City not found');
        }
            const data=await response.json();
            displayWeatherData(data);
            saveSearch(city);
            loadRecentSearches();
    }catch(error){
           showError(error.message);
    }
}

function displayWeatherData(data){
    weatherDetails.classList.remove('hidden');
    cityNameFeild.textContent=data.name;
    temperatureFeild.textContent=`Temperature : ${data.main.temp}C`;
    humidityFeild.textContent=`Humidity : ${data.main.humidity}%`;
    windFeild.textContent=`Wind : ${data.wind.speed} m/s`
    conditionFeild.textContent=`Condition : ${data.weather[0].description}`;
    clearError();
}

function saveSearch(){
    let recentSearches=JSON.parse(localStorage.getItem("recentSearches")) || [];
    if(!recentSearches.includes(city)){
        recentSearches.unshift(city);
        recentSearches=recentSearches.slice(0,5);
        localStorage.setItem("recentSearches",JSON.stringify(recentSearches));
    }
}

function loadRecentSearches(){
    const recentSearchList=document.getElementById("recentSearches");
    recentSearchList.innerHTML="";
    const recentSearches=JSON.parse(localStorage.getItem("recentSearches")) || [];
    recentSearches.forEach(city=>{
        const listItem=document.createElement("li");
        listItem.textContent=city;
        listItem.addEventListener("click",()=>fetchWeatherData(city));
        recentSearchList.appendChild(listItem);
    });
}

function showError(){
    document.getElementById("error").textContent=message;
}
function clearError(){
    document.getElementById("error").textContent="";
}
document.addEventListener("DOMContentLoaded",loadRecentSearches);
