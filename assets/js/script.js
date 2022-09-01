var APIkey = "&appid=4b240ff285db6735e81b43a05878c1bf";
var searchBtn = $("#search");
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Weather Forecast - Current and 5-days
var weatherForecastEl = $("#weatherForecast");

// Current Weather Variables
var chosenCityEl = $("#chosenCity");
var temperatureEl = $("#temperature");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var uvIndexEl = $("#uvIndex");

// Function Init - calls Search City function - once the user types in the city and click the Search button, then fetch will be executed.

function init(){
	weatherForecastEl.hide();
	searchCity();
}

// Function - Event Listener to Search Button

function searchCity(){
	searchBtn.on("click", function (event){
		event.preventDefault();
		var userInputCity = $("#city").val().trim();
		if (userInputCity === ""){
			return;
		}
		weatherCity(userInputCity);
		
	});
}

// Function weatherCity - Fetch to get the citie's information//

function weatherCity(userInputCity){
	var queryUrl = weatherUrl + "?q=" + userInputCity + APIkey;

	fetch(queryUrl).then(function(cityResponse){
		if(cityResponse.ok){
			cityResponse.json().then(function (response){

				weatherForecastEl.show();

				var results = response;
				var cityName = results.name;
				var cityTemperature = results.main.temp;
				var cityWind = results.wind.speed;
				var cityHumidity = results.main.humidity;

				chosenCityEl.text(cityName);
				temperatureEl.text("Temperature: " + cityTemperature);
				windEl.text("Wind: " + cityWind);
				humidityEl.text("Humidity: " + cityHumidity);


				console.log(results);



			})
		}
	})
};

init();