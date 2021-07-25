const api = {
    key: "91c427adf6b849ae3cc7111f732145c8",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.szukajka');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather =>{
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.loc .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.loc .date');
    date.innerText = dateBuild(now);

    let temp = document.querySelector('.prop .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.prop .weather');
    weather_el.innerText = weather.weather[0].main

    let icon = document.querySelector('.prop .icon');
    icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

function dateBuild (d) {
    let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}