var APIkey = "&appid=4b240ff285db6735e81b43a05878c1bf";
var searchBtn = $("#search");
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var units = "&units=metric"
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Weather Forecast - Current and 5-days
var weatherForecastEl = $("#weatherForecast");

// Current Weather Variables
var chosenCityEl = $("#chosenCity");
var currentDateEl = $("#currentDate")
var temperatureEl = $("#temperature");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var uvIndexEl = $("#uvIndex");

//5-day Forecast Variables

var temperature5El = $("#temperature5");
var wind5El = $("#wind5");
var humidity5El = $("#humidity5")

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
		forecastCity(userInputCity);
	});
}

// Function weatherCity - Fetch to get the citie's information//

function weatherCity(userInputCity){
	var queryUrl = weatherUrl + "?q=" + userInputCity + units + APIkey;

	fetch(queryUrl).then(function(cityResponse){
		if(cityResponse.ok){
			cityResponse.json().then(function (response){

				weatherForecastEl.show();

				var results = response;
				var cityName = results.name;
				var today = new Date();
				var currentDate = (today.getMonth()+1) + "/" + today.getDate();
				var cityTemperature = results.main.temp;
				var cityWind = results.wind.speed;
				var cityHumidity = results.main.humidity;

				chosenCityEl.text(cityName);
				currentDateEl.text(currentDate);
				temperatureEl.text("Temperature: " + cityTemperature + "°C");
				windEl.text("Wind: " + cityWind + "km/h");
				humidityEl.text("Humidity: " + cityHumidity + "%");


				console.log(results);

				

			})
		}
	})
};

// Function - Forecast - 5 days

function forecastCity (userInputCity){
	var forecastQueryUrl = forecastUrl + "?q=" + userInputCity + units + APIkey;
	fetch(forecastQueryUrl).then(function(city5Response){
		if(city5Response.ok){
			city5Response.json().then(function (response5){

				var results5 = response5;
				console.log(results5);
				
				var cityTemperature5 = results5.list[1].main.temp;
				var cityWind5 = results5.list[1].wind.speed;
				var cityHumidity5 = results5.list[1].main.humidity;

				temperature5El.text("Temperature: " + cityTemperature5 + "°C");
				wind5El.text("Wind: " + cityWind5 + "km/h" );
				humidity5El.text("Humidity: " + cityHumidity5 + "%");
				

})}})};

init();




//var searchHistory =[];

//json.parse

// Function: 5 - day - forecast - for loop



//* UVI color-coded + Weather Icons 

//URL is http://openweathermap.org/img/wn/10d@2x.png



// Function to save the cities in the History area - ol list history



//push to an array - based on search history value localstorage.getitem
// create buttons for every item in the Local Storage

// Save and get from Local Storage

//Init - get the item and render search history -
//Render - create the buttons based on the length of the array

// append - set the item + push the item to the array + call back to search history


// Get Current Location 
