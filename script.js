const API_KEY = 'c38fe24a2f0bdd5584f972b6bd0481e5';



async function searchWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Введи місто");
        return;
    }

    getWeather(city);
}

async function getWeather(city) {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Місто не знайдено");
        }

        const data = await response.json();

        updateUI(data);

    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data) {

    const city = data.name;
    const temp = Math.round(data.main.temp);
    const feels = Math.round(data.main.feels_like);
    const desc = data.weather[0].description;

    const humidity = data.main.humidity;
    const wind = Math.round(data.wind.speed * 3.6);

    document.getElementById("city").textContent =
        `${city}`;

    document.getElementById("temp").textContent =
        `${temp}°`;

    document.getElementById("feels").textContent =
        `Відчувається як ${feels}°C`;

    document.getElementById("desc").textContent =
        desc;

    
    const stats =
        document.querySelectorAll(".grid-cols-2 .text-3xl");

    if (stats.length >= 2) {
        stats[0].textContent = humidity + "%";
        stats[1].textContent = wind + " км/г";
    }
}



function registerUser() {

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const city =
        document.getElementById("userCity").value.trim();

    const agree =
        document.getElementById("agree").checked;

    
    if (!firstName || !lastName || !email || !city) {
        alert("Заповни всі поля");
        return;
    }

    if (!agree) {
        alert("Погодься з умовами");
        return;
    }

    
    const user = {
        firstName,
        lastName,
        email,
        city
    };

    
    localStorage.setItem(
        "skyviewUser",
        JSON.stringify(user)
    );

    alert(`Вітаємо, ${firstName}! Реєстрація успішна ✅`);

    console.log(user);
}



window.onload = () => {

    
    getWeather("Одеса");

    
    const savedUser =
        localStorage.getItem("skyviewUser");

    if (savedUser) {

        const user = JSON.parse(savedUser);

        console.log(
            `Користувач ${user.firstName} вже зареєстрований`
        );
    }
};