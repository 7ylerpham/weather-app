const key = "API_KEY_HERE";
const formE1 = document.querySelector("form");
const details = document.querySelector(".details");

formE1.addEventListener("submit", (e) => {
    e.preventDefault();
    details.innerHTML = "<h1>Loading...</h1>";
    const location = e.target.location.value;
    weatherApp(location)
});

// Fetch API and generate HTML
async function weatherApp(location){
    const data = await fetchAPI(location);
    generateHTML(data);
}

async function fetchAPI(location){
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    return data
}

function generateHTML(data){
    const html = `
    <h1 class="temp">${data.main.temp}\u00B0 F</h1>
    <h1 class="status">${data.weather[0].main}, ${data.weather[0].description}</h1>
    <div class="more-info">
        <p>Humidity - ${data.main.humidity}%</p>
        <p>Wind Speed - ${data.wind.speed}km/h</p>
        <p>Wind Direction - ${data.wind.deg}\u00B0 </p>
        <p>Pressure - ${data.main.pressure}MB</p>
    </div>
    <div class="query">${data.name}, ${data.sys.country}</div>
    `;
    details.innerHTML = html;
}