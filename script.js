document.addEventListener("DOMContentLoaded", function () {
  const xhr = new XMLHttpRequest();
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19";

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const { temp, pressure, description, humidity, wind } = data.main;
      const { speed, deg } = data.wind;
      const icon = data.weather[0].icon;

      const weatherHtml = `
                <p>Температура: ${temp}°C</p>
                <p>Тиск: ${pressure} гПа</p>
                <p>Опис: ${description}</p>
                <p>Вологість: ${humidity}%</p>
                <p>Швидкість вітру: ${speed} м/с</p>
                <p>Напрям вітру: ${deg}°</p>
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
            `;

      const weatherContainer = document.getElementById("weather");
      weatherContainer.innerHTML = weatherHtml;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.log(`Помилка отримання погодних даних. Статус: ${xhr.status}`);
    }
  };

  xhr.send();
});
