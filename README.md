# Weather Dashboard

This application consists of a Weather Dashboard using the Open Weather API. It allows the user to search the current and 5 day-forecast weather for over 200,000 cities.

## Preview

![Preview](./assets/screenshots/Preview.PNG)

## Link to application:
https://renatatims.github.io/weather_dashboard/

# Features:

1. Search weather by city 

2. Current weather conditions consists of:
    - City Name
    - Current Date
    - Icon representation of the current weather condition
    - Temperature
    - Wind Speed
    - Humidity
    - UV index - color coded to the following: low (green), moderate (yellow), high(orange), severe(red).

3. Five day forecast conditions - displays:
    - Date
    - Icon representation of the weather conditions
    - Temperature
    - Wind Speed
    - Humidity

4. Search history saved - the user can also access the city's weather conditions through the history.
    - Only unique values are saved to history.
    - Clear button included - the user can clear the history

## Tools

- Open Weather One Call API 1.0

 - Current Weather Url = "https://api.openweathermap.org/data/2.5/weather";
 - Forecast Url = "https://api.openweathermap.org/data/2.5/forecast";
 - Icon Url = "https://openweathermap.org/img/wn/";
 - UV index Url = "https://api.openweathermap.org/data/2.5/uvi";

## Functions:
-  Function searchCity () - event Listener to Search Button will get the user's input and return the city's current and 5-day forecast weather
- Function weatherCity ()- will fetch the Current Weather Url and UV index Url and return the current weather parameters, displaying in the main card.
- Function forecastCity() - will fetch the Forecast Url and display the 5-day forecast parameters in the 5 cards below the main card.
- Function colorCode () - applied to the UV index, 4 conditions to determine the color based on it's value.
- Function historySave () - will save the user's input in the local storage
- Function historyDisplay ()- will display the history in the history side navigation.
- Function historyClick ()- once the user clicks over a city from the history list, it will also display current and 5-day forecast info. It enables a second way for the user to access the information.
- Function historyClear ()- clears the history, and the user can built a new history once there is a new input and search.
- Function uniqueValuesHistory ()- guarantees only new values are included in the history list.

## Sources:
- Open Weather API: https://openweathermap.org/api
- Ultraviolet API: https://www.programmableweb.com/api/openweathermap-ultraviolet-index-rest-api-v25
- https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys


## Link to application:
https://renatatims.github.io/weather_dashboard/

