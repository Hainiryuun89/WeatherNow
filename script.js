function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'YOUR_API_KEY_HERE';  // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].description;
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            document.getElementById('weather-info').innerHTML = `
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(err => {
            document.getElementById('weather-info').innerHTML = `<p>Error: ${err}</p>`;
        });
}