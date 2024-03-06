enum Weather {
    Sunny='Sunny',
    Rainy='Rainy',
    Windy='Windy',
    Cloudy='Cloudy',
    Snowy='Snowy',
    Heat='Heat'
}

let weeklyForecast:string[]=[Weather.Sunny,Weather.Rainy,Weather.Windy,Weather.Cloudy,Weather.Snowy,Weather.Heat,Weather.Sunny];

function displayForecast(weeklyForecast){
    for(let i=0;i<7;i++){
        console.log(`"Day ${i+1}: ${weeklyForecast[i]}"`)
    }
}

displayForecast(weeklyForecast);