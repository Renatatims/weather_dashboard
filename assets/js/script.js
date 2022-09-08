var APIkey = "appid=4b240ff285db6735e81b43a05878c1bf";
var searchBtn = $("#search");
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var units = "&units=metric"
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
var iconWeatherUrl = "https://openweathermap.org/img/wn/";
var uviUrl = 'https://api.openweathermap.org/data/2.5/uvi'

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
var forecastDate1El = $("#forecastDate1")
var temperature1El = $("#temperature1");
var icon1El =$("#icon1");
var wind1El = $("#wind1");
var humidity1El = $("#humidity1")

var forecastDate2El = $("#forecastDate2")
var temperature2El = $("#temperature2");
var icon2El =$("#icon2");
var wind2El = $("#wind2");
var humidity2El = $("#humidity2");

var forecastDate3El = $("#forecastDate3")
var temperature3El = $("#temperature3");
var icon3El =$("#icon3");
var wind3El = $("#wind3");
var humidity3El = $("#humidity3");

var forecastDate4El = $("#forecastDate4")
var temperature4El = $("#temperature4");
var icon4El =$("#icon4");
var wind4El = $("#wind4");
var humidity4El = $("#humidity4")

var forecastDate5El = $("#forecastDate5")
var temperature5El = $("#temperature5");
var icon5El =$("#icon5");
var wind5El = $("#wind5");
var humidity5El = $("#humidity5");


//History Variables//

var searchHistoryEl = $("#searchHistory");
var historyArr = [];
var clearHistoryBtn =$("#clearHistory")




// Function Init - calls Search City function - once the user types in the city and click the Search button, then fetch will be executed.

function init(){
	weatherForecastEl.hide();
	searchCity();
	historyDisplay();
	historyClear();
	historyClick ();
	

};

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
};

// Function weatherCity - Fetch to get the citie's information//

function weatherCity(userInputCity){
	var queryUrl = weatherUrl + "?q=" + userInputCity + units + "&" + APIkey;

	fetch(queryUrl).then(function(cityResponse){
		if(cityResponse.ok){
			cityResponse.json().then(function (resultWeatherCity){

				weatherForecastEl.show();

				var resultCity = resultWeatherCity;
				var cityName = resultCity.name;
				//var today = new Date();
				//var currentDate = (today.getMonth()+1) + "/" + today.getDate();
				//Current Date displayed//

				var currentDayEl = dayjs().format("dddd, MMMM D");


				var cityTemperature = resultCity.main.temp;
				var cityWind = resultCity.wind.speed;
				var cityHumidity = resultCity.main.humidity;
				var weatherIcon = resultCity.weather[0].icon;
				var iconCompleteUrl = iconWeatherUrl + weatherIcon + '.png';

				historySave(cityName);

				chosenCityEl.text(cityName);
				$("#currentDate").text(currentDayEl);
				//currentDateEl.text(currentDate);
				iconEl.attr("src", iconCompleteUrl);
				temperatureEl.text("Temperature: " + cityTemperature + "°C");
				windEl.text("Wind: " + cityWind + "km/h");
				humidityEl.text("Humidity: " + cityHumidity + "%");


				console.log(resultCity);

				// UV Index // specific URL for UV index

				var latCity = resultCity.coord.lat;
				var lonCity = resultCity.coord.lon;
				var uviQueryUrl = uviUrl + "?" + APIkey + "&lat=" + latCity + "&lon=" + lonCity

				fetch(uviQueryUrl).then(function(uviResponse){
					if(uviResponse.ok){
						uviResponse.json().then(function(resultUvi){
														
							function colorCode(){
								var UVI = resultUvi.value;
							    uvIndexEl.text("UV Index: " + UVI);
								uvIndexEl.each(function(event){
									event.preventDefault;
									if(UVI < 3){
										uvIndexEl.addClass("low");
									}else if (UVI < 6){
										uvIndexEl.addClass("moderate");
									}else if (UVI < 8){
										uvIndexEl.addClass("high");
									}else{
										uvIndexEl.addClass("veryHigh");
									}
									
								})
							}

							colorCode();

										
						});
					};
				});

				

			});
		};
	});
};

// Function - Forecast - 5 days

function forecastCity (userInputCity){
	var forecastQueryUrl = forecastUrl + "?q=" + userInputCity + units + "&" + APIkey;
	fetch(forecastQueryUrl).then(function(city5Response){
		if(city5Response.ok){
			city5Response.json().then(function (response5){

				var results5 = response5;
				console.log(results5);

				/*Day 1*/
									
				var cityTemperature1 = results5.list[1].main.temp;
				var date1 = results5.list[2].dt;
				var date1dayjs = new Date(dayjs.unix(date1));
				var d1js = date1dayjs.toLocaleString("en-US", {weekday: "long", day: "numeric", month: "numeric"});
				var cityWind1 = results5.list[1].wind.speed;
				var cityHumidity1 = results5.list[1].main.humidity;
				var weatherIcon1 = results5.list[1].weather[0].icon;
				var iconCompleteUrl1 = iconWeatherUrl + weatherIcon1 + '.png';

				temperature1El.text("Temperature: " + cityTemperature1 + "°C");
				forecastDate1El.text(d1js);
				icon1El.attr("src", iconCompleteUrl1);
				wind1El.text("Wind: " + cityWind1 + "km/h" );
				humidity1El.text("Humidity: " + cityHumidity1 + "%");
				

				/*Day 2*/

				var cityTemperature2 = results5.list[2].main.temp;
				var date2 = results5.list[10].dt;
				var date2dayjs = dayjs.unix(date2)
				var cityWind2 = results5.list[2].wind.speed;
				var cityHumidity2 = results5.list[2].main.humidity;
				var weatherIcon2 = results5.list[2].weather[0].icon;
				var iconCompleteUrl2 = iconWeatherUrl + weatherIcon2 + '.png';

				temperature2El.text("Temperature: " + cityTemperature2 + "°C");
				forecastDate2El.text(date2dayjs);
				icon2El.attr("src", iconCompleteUrl2);
				wind2El.text("Wind: " + cityWind2 + "km/h" );
				humidity2El.text("Humidity: " + cityHumidity2 + "%");

				/*Day 3*/

				var cityTemperature3 = results5.list[3].main.temp;
				var date3 = results5.list[18].dt;
				var date3dayjs = dayjs.unix(date3)
				var cityWind3 = results5.list[3].wind.speed;
				var cityHumidity3 = results5.list[3].main.humidity;
				var weatherIcon3 = results5.list[3].weather[0].icon;
				var iconCompleteUrl3 = iconWeatherUrl + weatherIcon3 + '.png';

				temperature3El.text("Temperature: " + cityTemperature3 + "°C");
				forecastDate3El.text(date3dayjs);
				icon3El.attr("src", iconCompleteUrl3);
				wind3El.text("Wind: " + cityWind3 + "km/h" );
				humidity3El.text("Humidity: " + cityHumidity3 + "%");

				/*Day 4*/
				var cityTemperature4 = results5.list[4].main.temp;
				var date4 = results5.list[26].dt;
				var date4dayjs = dayjs.unix(date4)
				var cityWind4 = results5.list[4].wind.speed;
				var cityHumidity4 = results5.list[4].main.humidity;
				var weatherIcon4 = results5.list[4].weather[0].icon;
				var iconCompleteUrl4 = iconWeatherUrl + weatherIcon4 + '.png';

				temperature4El.text("Temperature: " + cityTemperature4 + "°C");
				forecastDate4El.text(date4dayjs);
				icon4El.attr("src", iconCompleteUrl4);
				wind4El.text("Wind: " + cityWind4 + "km/h" );
				humidity4El.text("Humidity: " + cityHumidity4 + "%");

				/*Day 5*/

				var cityTemperature5 = results5.list[5].main.temp;
				var date5 = results5.list[34].dt;
				var date5dayjs = dayjs.unix(date5);
				var cityWind5 = results5.list[5].wind.speed;
				var cityHumidity5 = results5.list[5].main.humidity;
				var weatherIcon5 = results5.list[5].weather[0].icon;
				var iconCompleteUrl5 = iconWeatherUrl + weatherIcon5 + '.png';

				temperature5El.text("Temperature: " + cityTemperature5 + "°C");
				forecastDate5El.text(date5dayjs);
				icon5El.attr("src", iconCompleteUrl5);
				wind5El.text("Wind: " + cityWind5 + "km/h" );
				humidity5El.text("Humidity: " + cityHumidity5 + "%");
				
				}

		)}
})};



//History Save//


function historySave (userInputCity){
	var historyObj = {};
	historyObj["historyCity"] = userInputCity;
	historyArr.push(historyObj);
	localStorage.setItem("cityHistory", JSON.stringify(historyArr));
	searchHistoryEl.empty();
	historyDisplay();
	
}

//History Display//

function historyDisplay (){
	var getHistory = JSON.parse(localStorage.getItem("cityHistory"));
	for (var i=0; i < getHistory.length; i++){
		var cityHistoryLi = $('<li>');
		cityHistoryLi.text(getHistory[i].historyCity);
		searchHistoryEl.append(cityHistoryLi);
	}
	return (historyArr = getHistory);
	
};

//Event Listener to Cities saved on History

function historyClick (){
	searchHistoryEl.on("click", "li", function(){

		var cityLi = $(this).text();
		weatherCity(cityLi);
		forecastCity(cityLi);
	})
};


function historyClear(){
	clearHistoryBtn.on("click", function(){
		searchHistoryEl.empty();
		localStorage.clear();
	})
};



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
