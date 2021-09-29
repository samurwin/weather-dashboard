var currentDate = dayjs().format('M-DD-YYYY');
console.log(currentDate);
var cityName = 'Toronto';

var weatherSearch = function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=460baac12caacdeca58e7bae8f1299bc')
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

weatherSearch();