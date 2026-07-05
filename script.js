document.addEventListener('DOMContentLoaded',() => {
    const cityInput = document.getElementById("city-input");
    const getWeatherbtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message")

    const API_KEY = "c93973056cedfd97e57a52c78d5146c5" 
    getWeatherbtn.addEventListener('click', async () => {
      const city = cityInput.value.trim();
      if(!city)return;
      
     //   it may throw an error
    // server/database is always in another continent
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
       showError();
    }



    })

    async function fetchWeatherData(city){
        // gets the data
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("city not found");
        }
        const data = await response.json()
         return data;
    }

    function displayWeatherData(weatherData){
        
        console.log(weatherData);
        const{name, main, weather} = weatherData;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `temperature : ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        // unlock the display
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});