let weather = {
    apiKey: "57baaeee8c83c3ac15d2974d4b21d021",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon} = data.weather[0];
      const { temp, feels_like, humidity } = data.main;
      const { speed } = data.wind;
      const { country } = data.sys;
      document.querySelector(".city").innerText = "Weather in " + name + ", " + country;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".temp").innerText = parseInt(temp) + "°C";
      document.querySelector(".feels").innerText ="Feels like: " + parseInt(feels_like) + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?" + name + ")";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };

  let forecast = {
    apiKey: "57baaeee8c83c3ac15d2974d4b21d021",
    fetchForecast: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No forecast found.");
            throw new Error("No forecast found.");
          }
          return response.json();
        })
        .then((data) => this.displayForecast(data));
    },
    displayForecast: function (data) {
      //senus sukurtus div pasisalinam
      var divsToRemove = document.getElementsByClassName("day");
      for (var i = divsToRemove.length-1; i >= 0; i--) {
        divsToRemove[i].remove();
      }
      for (let index = 0; index < data.list.length; index++) {
        var { dt_txt } = data.list[index];
        var d = new Date(dt_txt);
        //duomenys kitos dienos 03:00 ir 15:00
        if (d.getHours() == "0") {
          var { temp } = data.list[index + 4].main
          let out = "<div id='day' class='day'>";
          out += "<p>" + getDayOfWeek(d.getDay()) + "<p>";
          out += "<p>Day: " + parseInt(temp) + "°C<p>";       
          var { temp } = data.list[index + 1].main
          out += "<p>Night: " + parseInt(temp) + "°C<p></div>";
          document.getElementById("forecast").innerHTML += out;   
        }
      }
    },
    search: function () {
      this.fetchForecast(document.querySelector(".search-bar").value);
    }
  };

  let getDayOfWeek = function(dayNum) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return (weekday[dayNum]);
}
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
    forecast.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
        forecast.search();
      }
    });
  
  weather.fetchWeather("Kaunas");
  forecast.fetchForecast("Kaunas");