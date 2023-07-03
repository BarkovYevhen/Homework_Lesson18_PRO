document.addEventListener("DOMContentLoaded", function () {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Помилка отримання погодних даних. Статус: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
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
    })
    .catch((error) => {
      console.log(error.message);
    });
});
