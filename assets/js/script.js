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
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&appid=460baac12caacdeca58e7bae8f1299bc')
        .then(function(weather) {
            return weather.json();
        })
        .then(function(weather) {
            console.log(weather);
            displayWeather(weather, searchTerm);
        })
    })
};

var displayWeather = function(weather, cityName) {
    var titleEl = $('<h2></h2>')
    .text(cityName + " (" + currentDate + ")");
    var weatherConditionEl = $('<img>')
    .attr('src', 'http://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '@2x.png')
    .attr('alt', '')

    var titleContainerEl = $('<div></div>')
    .addClass('row col-12 justify-content-start align-items-center')
    .attr('id', 'titleContainer');

    $(titleContainerEl).append(titleEl, weatherConditionEl);
    $(currentWeatherContainerEl).append(titleContainerEl);

};

searchBtnEl.addEventListener("click", weatherSearch);