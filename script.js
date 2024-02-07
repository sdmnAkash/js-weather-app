

const weatherForm = document.querySelector(".contect-area");
const card = document.querySelector(".weather-info");
const cityInput = document.querySelector(".search-box");
const api = "553bc705a08959f3d6fe403c13ea10b2";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherDtata =  await getWeatherData(city);
            displayWeatherInfo(weatherDtata);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError("Please select a city!")
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error(`Could not fetch weather data for "${city}"`)
    }

    return response.json();
}

function displayWeatherInfo(data){

    const time = giveCurrentTime();

    console.log(data);
    const {name: city, 
           main: {temp, humidity, feels_like}, 
           weather:[{description, id}]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const feelsLike = document.createElement("p");
    const timeDisplay = document.createElement("p");

    timeDisplay.textContent = `🕒 ${time}`
    timeDisplay.classList.add("time-display");
    card.appendChild(timeDisplay);

    cityDisplay.textContent = city;
    cityDisplay.classList.add("city");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp-273).toFixed(1)}°c`;
    tempDisplay.classList.add("temp");
    card.appendChild(tempDisplay);

    feelsLike.textContent = `Feels like: ${(feels_like - 273).toFixed(1)}°c`
    feelsLike.classList.add("feels-like");
    feelsLike.style.fontSize = "20px";
    feelsLike.style.marginBottom = "10px";
    feelsLike.style.fontFamily = "Lucida Sans"
    card.appendChild(feelsLike);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity");
    card.appendChild(humidityDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("emoji")
    card.appendChild(weatherEmoji);

    descDisplay.textContent = description;
    descDisplay.classList.add("desc");
    card.appendChild(descDisplay);
    
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 500):
            return "☔";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "☃️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌁";
        case (weatherId === 800):
            return "☀️";
        case (weatherId > 800):
            return "☁️";
        default:
            return "🤷‍♂️"
    }
}

function displayError(msg){
    const errorMsg = document.createElement("p");
    errorMsg.textContent = msg;
    errorMsg.classList.add("error-info");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorMsg);
}

function giveCurrentTime() {
    let date = new Date();
 
    let hours = date.getHours();
    let minutes = date.getMinutes();
 
    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM';
 
    // Find current hour in AM-PM Format
    hours = hours % 12;
 
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
 
    return (hours + ':' + minutes + ' ' + newformat);
}