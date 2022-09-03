var APIkey = "&appid=4b240ff285db6735e81b43a05878c1bf";
var searchBtn = $("#search");
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var units = "&units=metric"
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
var iconWeatherUrl = "https://openweathermap.org/img/wn/";


// Weather Forecast - Current and 5-days
var weatherForecastEl = $("#weatherForecast");

// Current Weather Variables
var chosenCityEl = $("#chosenCity");
var iconEl = $("#icon");
var currentDateEl = $("#currentDate")
var temperatureEl = $("#temperature");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var uvIndexEl = $("#uvIndex");

//5-day Forecast Variables

var temperature1El = $("#temperature1");
var icon1El =$("#icon1");
var wind1El = $("#wind1");
var humidity1El = $("#humidity1")

var temperature2El = $("#temperature2");
var icon2El =$("#icon2");
var wind2El = $("#wind2");
var humidity2El = $("#humidity2");

var temperature3El = $("#temperature3");
var icon3El =$("#icon3");
var wind3El = $("#wind3");
var humidity3El = $("#humidity3");

var temperature4El = $("#temperature4");
var icon4El =$("#icon4");
var wind4El = $("#wind4");
var humidity4El = $("#humidity4")

var temperature5El = $("#temperature5");
var icon5El =$("#icon5");
var wind5El = $("#wind5");
var humidity5El = $("#humidity5");

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
				var weatherIcon = results.weather[0].icon;
				var iconCompleteUrl = iconWeatherUrl + weatherIcon + '.png';

				chosenCityEl.text(cityName);
				currentDateEl.text(currentDate);
				iconEl.attr("src", iconCompleteUrl);
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

				/*Day 1*/
									
				var cityTemperature1 = results5.list[1].main.temp;
				var cityWind1 = results5.list[1].wind.speed;
				var cityHumidity1 = results5.list[1].main.humidity;
				var weatherIcon1 = results5.list[1].weather[0].icon;
				var iconCompleteUrl1 = iconWeatherUrl + weatherIcon1 + '.png';

				temperature1El.text("Temperature: " + cityTemperature1 + "°C");
				icon1El.attr("src", iconCompleteUrl1);
				wind1El.text("Wind: " + cityWind1 + "km/h" );
				humidity1El.text("Humidity: " + cityHumidity1 + "%");
				

				/*Day 2*/

				var cityTemperature2 = results5.list[2].main.temp;
				var cityWind2 = results5.list[2].wind.speed;
				var cityHumidity2 = results5.list[2].main.humidity;

				temperature2El.text("Temperature: " + cityTemperature2 + "°C");
				wind2El.text("Wind: " + cityWind2 + "km/h" );
				humidity2El.text("Humidity: " + cityHumidity2 + "%");

				/*Day 3*/

				var cityTemperature3 = results5.list[3].main.temp;
				var cityWind3 = results5.list[3].wind.speed;
				var cityHumidity3 = results5.list[3].main.humidity;

				temperature3El.text("Temperature: " + cityTemperature3 + "°C");
				wind3El.text("Wind: " + cityWind3 + "km/h" );
				humidity3El.text("Humidity: " + cityHumidity3 + "%");

				/*Day 4*/
				var cityTemperature4 = results5.list[4].main.temp;
				var cityWind4 = results5.list[4].wind.speed;
				var cityHumidity4 = results5.list[4].main.humidity;

				temperature4El.text("Temperature: " + cityTemperature4 + "°C");
				wind4El.text("Wind: " + cityWind4 + "km/h" );
				humidity4El.text("Humidity: " + cityHumidity4 + "%");

				/*Day 5*/

				var cityTemperature5 = results5.list[5].main.temp;
				var cityWind5 = results5.list[5].wind.speed;
				var cityHumidity5 = results5.list[5].main.humidity;

				temperature5El.text("Temperature: " + cityTemperature5 + "°C");
				wind5El.text("Wind: " + cityWind5 + "km/h" );
				humidity5El.text("Humidity: " + cityHumidity5 + "%");
				
				}

		)}
})};

init();


//For loop//
/*
var results5Arr = [];
for (var i = 1; i<6; i++){
	results5days = {};

	results5Arr.push()
*/



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
