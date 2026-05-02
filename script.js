const API_KEY = 'c38fe24a2f0bdd5584f972b6bd0481e5'; 


async function searchWeather() {
    const city = document.getElementById('cityInput').value.trim();

    if (!city) {
        alert("Введи місто");
        return;
    }

    getWeather(city);
}


async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Місто не знайдено");
        }

        const data = await res.json();

        updateUI(data);

    } catch (err) {
        alert(err.message);
    }
}


function updateUI(data) {
    const city = data.name;
    const temp = Math.round(data.main.temp);
    const feels = Math.round(data.main.feels_like);
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = Math.round(data.wind.speed * 3.6); // м/с → км/г

    
    document.querySelector(".hero-bg h2").textContent = `${city}, Україна`;
    document.querySelector(".text-7xl").textContent = `+${temp}°`;
    document.querySelector(".text-xl").textContent = `Відчувається як +${feels}°C`;
    document.querySelector(".bg-white\\/20").textContent = desc;

    // Показники
    const stats = document.querySelectorAll(".grid-cols-5 div p.text-3xl");

    if (stats.length >= 2) {
        stats[0].textContent = humidity + "%"; // вологість
        stats[1].textContent = wind + " км/г"; // вітер
    }
}


function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ua`;

        const res = await fetch(url);
        const data = await res.json();

        updateUI(data);
    });
}


window.onload = () => {
    getLocationWeather();
};