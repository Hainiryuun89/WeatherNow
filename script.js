const apiKey = 'YOUR_API_KEY_HERE';  // Replace with your OpenWeatherMap API key

// Function to fetch and display weather data
function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) return;  // Prevent empty searches

    showLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                showError(data.message);
            } else {
                displayWeather(data);
                updateRecentCities(city);
            }
        })
        .catch(error => {
            showError('Failed to fetch weather data');
        })
        .finally(() => {
            showLoading(false);
        });
}

// Function to display weather data
function displayWeather(data) {
    const weather = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;

    const weatherInfo = `
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
        <p><strong>Weather:</strong> ${weather}</p>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;

    document.getElementById('weather-info').innerHTML = weatherInfo;
}

// Function to show error message
function showError(message) {
    document.getElementById('weather-info').innerHTML = `<p class="error">${message}</p>`;
}

// Function to show loading indicator
function showLoading(isLoading) {
    document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
}

// Function to update recent cities
function updateRecentCities(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(city)) {
        recentCities.push(city);
    }
    if (recentCities.length > 5) {
        recentCities.shift(); // Keep only the last 5 cities
    }
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    displayRecentCities();
}

// Function to display recent cities
function displayRecentCities() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    const recentCitiesList = document.getElementById('recent-cities');
    recentCitiesList.innerHTML = ''; // Clear the current list

    recentCities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.onclick = () => {
            document.getElementById('city').value = city;
            getWeather();
        };
        recentCitiesList.appendChild(li);
    });
}

// Initialize recent cities on page load
window.onload = function() {
    displayRecentCities();
}
