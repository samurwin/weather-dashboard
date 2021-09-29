var searchBtnEl = document.getElementById('searchBtn');
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
        })
    })
};

searchBtnEl.addEventListener("click", weatherSearch);