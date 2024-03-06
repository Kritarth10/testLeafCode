var Weather;
(function (Weather) {
    Weather["Sunny"] = "Sunny";
    Weather["Rainy"] = "Rainy";
    Weather["Windy"] = "Windy";
    Weather["Cloudy"] = "Cloudy";
    Weather["Snowy"] = "Snowy";
    Weather["Heat"] = "Heat";
})(Weather || (Weather = {}));
var weeklyForecast = [Weather.Sunny, Weather.Rainy, Weather.Windy, Weather.Cloudy, Weather.Snowy, Weather.Heat, Weather.Sunny];
function displayForecast(weeklyForecast) {
    for (var i = 0; i < 7; i++) {
        console.log("\"Day ".concat(i + 1, ": ").concat(weeklyForecast[i], "\""));
    }
}
displayForecast(weeklyForecast);
