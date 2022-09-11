# weather_dashboard

This application consists of a Weather Dashboard

# Features:

1. Search weather by city - current and future weather conditions

2. Current weather conditions consists of:
    - City Name
    - Current Date
    - Icon representation of the current weather condition
    - Temperature
    - Wind Speed
    - Humidity
    - UV index - color coded to the following: favorable (green), moderate (orange) or severe (red).

3. Future Weather conditions - 5-day forecast displays:
    - Date
    - Icon representation of the weather conditions
    - Temperature
    - Wind Speed
    - Humidity

4. Search history saved - the user can also access the city's weather conditions through the history.
    - Only unique values are saved with the following functions:

 ````java

 function uniqueValuesHistory() {
					if (historyArr.includes(cityName) === false) {
						console.log(historyArr);
						historySave(cityName);
					}
				}
				uniqueValuesHistory(cityName);
    
````

````java

function historySave(userInputCity) {
	historyArr.push(userInputCity);
	localStorage.setItem("cityHistory", JSON.stringify(historyArr));
	searchHistoryEl.empty();
	historyDisplay();
	console.log(historyArr);

}

````



## Preview



## Tools

- OpenWeather One Call API 1.0.: https://openweathermap.org/api/one-call-api. 
 According to Open Weather:

"The One Call API 1.0 provides the following weather data for any geographical coordinates:
 - Current weather
 - Minute forecast for 1 hour
 - Hourly forecast for 48 hours
 - Daily forecast for 7 days
 - National weather alerts
 - Historical weather data for the previous 5 days "



