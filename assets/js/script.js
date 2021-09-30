var searchBtnEl = document.getElementById('searchBtn');
var currentWeatherContainerEl = document.getElementById("current-weather");
var currentDate = dayjs().format('M-DD-YYYY');


var weatherSearch = function(event) {
    event.preventDefault();

    var searchTerm = document.querySelector("input[name='citySearchTerm']").value;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&appid=460baac12caacdeca58e7bae8f1299bc')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&units=metric&appid=460baac12caacdeca58e7bae8f1299bc')
        .then(function(weather) {
            return weather.json();
        })
        .then(function(weather) {
            console.log(weather);
            displayWeather(weather, searchTerm);
            fiveDayForecast(weather);
        })
    })
};

var displayWeather = function(weather, cityName) {
    var titleEl = $('<h2></h2>')
    .text(cityName + " (" + currentDate + ")");
    var weatherConditionEl = $('<img>')
    .attr('src', 'http://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '@2x.png')
    .attr('alt', '');

    var titleContainerEl = $('<div></div>')
    .addClass('row col-12 justify-content-start align-items-center')
    .attr('id', 'titleContainer');

    $(titleContainerEl).append(titleEl, weatherConditionEl);
    $(currentWeatherContainerEl).append(titleContainerEl);

    var tempEl = $('<p></p>')
    .text("Temp: " + weather.current.temp + " °C");
    var windEl = $('<p></p>')
    .text('Wind: ' + weather.current.wind_speed + " metres/sec");
    var humidityEl = $('<p></p>')
    .text("Humidity: " + weather.current.humidity + "%");
    var uvIndexEl = $('<p></p>')
    .text("UV Index: " + weather.current.uvi);

    $(currentWeatherContainerEl).append(tempEl, windEl, humidityEl, uvIndexEl);
};

var fiveDayForecast = function(weather) {
    var fiveDayContainerEl = document.getElementById('five-day');

    for (var i = 1; i < 6; i++) {
        var forcastCardEl = $('<div></div>')
        .addClass('col-2 forcast p-3 text-light rounded')
        .attr('data-forcast-id', i);

        var dateEl = $('<h4></h4>')
        .text(dayjs().add(i, 'day').format('M-DD-YYYY'));
        var weatherConditionEl = $("<img>")
        .attr('src', 'http://openweathermap.org/img/wn/' + weather.daily[i].weather[0].icon + '@2x.png')
        .attr('alt', '');
        var tempEl = $('<p></p>')
        .text('Temp: ' + weather.daily[i].temp.day + " °C");
        var windEl = $('<p></p>')
        .text('Wind: ' + weather.daily[i].wind_speed + " m/sec");
        var humidityEl = $('<p></p>')
        .text('Humidity: ' + weather.daily[i].humidity + '%');

        $(forcastCardEl).append(dateEl, weatherConditionEl, tempEl, windEl, humidityEl);
        $(fiveDayContainerEl).append(forcastCardEl);
    }
}

searchBtnEl.addEventListener("click", weatherSearch);