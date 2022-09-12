//Variables - Urls
var APIkey = "appid=4b240ff285db6735e81b43a05878c1bf";
var searchBtn = $("#search");
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
var units = "&units=imperial"
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
var iconWeatherUrl = "https://openweathermap.org/img/wn/";
var uviUrl = "https://api.openweathermap.org/data/2.5/uvi";

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

//**5-day Forecast Variables**//

//Variables Day 1
var forecastDate1El = $("#forecastDate1")
var temperature1El = $("#temperature1");
var icon1El = $("#icon1");
var wind1El = $("#wind1");
var humidity1El = $("#humidity1")

//Variables Day 2
var forecastDate2El = $("#forecastDate2")
var temperature2El = $("#temperature2");
var icon2El = $("#icon2");
var wind2El = $("#wind2");
var humidity2El = $("#humidity2");

//Variables Day 3
var forecastDate3El = $("#forecastDate3")
var temperature3El = $("#temperature3");
var icon3El = $("#icon3");
var wind3El = $("#wind3");
var humidity3El = $("#humidity3");

//Variables Day 4
var forecastDate4El = $("#forecastDate4")
var temperature4El = $("#temperature4");
var icon4El = $("#icon4");
var wind4El = $("#wind4");
var humidity4El = $("#humidity4")

//Variables Day 5
var forecastDate5El = $("#forecastDate5")
var temperature5El = $("#temperature5");
var icon5El = $("#icon5");
var wind5El = $("#wind5");
var humidity5El = $("#humidity5");

//History Variables//
var searchHistoryEl = $("#searchHistory");
var historyArr = [];
var clearHistoryBtn = $("#clearHistory")


//Function Init - calls Search City function - once the user types in the city and click the Search button, then fetch will be executed.
function init() {
	weatherForecastEl.hide();
	searchCity();
	historyClick();
	historyClear();
	historyDisplay();
	
};

//Function - Event Listener to Search Button
function searchCity() {
	searchBtn.on("click", function (event) {
		event.preventDefault();
		var userInputCity = $("#city").val().trim();
		if (userInputCity === "") {
				return;
		}	
		weatherCity(userInputCity);
		forecastCity(userInputCity);
		
		
	});
};

//Function weatherCity - Fetch to get the citie's information//

function weatherCity(userInputCity) {
	var queryUrl = weatherUrl + "?q=" + userInputCity + units + "&" + APIkey;

	fetch(queryUrl).then(function (cityResponse) {
		if (cityResponse.ok) {
			cityResponse.json().then(function (resultWeatherCity) {

				weatherForecastEl.show();

				var resultCity = resultWeatherCity;
				var cityName = resultCity.name;
		
				//Current Date displayed//

				var dtUnixCurrent = resultCity.dt;
				var currentDay = new Date(dayjs.unix(dtUnixCurrent));
				var dateCurrentjs = currentDay.toLocaleString("en-US", { weekday: "short", day: "numeric", month: "numeric", year:"numeric" });
				var cityTemperature = resultCity.main.temp;
				var cityWind = resultCity.wind.speed;
				var cityHumidity = resultCity.main.humidity;
				var weatherIcon = resultCity.weather[0].icon;

				var iconCompleteUrl = iconWeatherUrl + weatherIcon + '.png';

				//Unique values saved to History 
				function uniqueValuesHistory() {
					if (historyArr.includes(cityName) === false) {
						console.log(historyArr);
						historySave(cityName);
					}
				}
				uniqueValuesHistory(cityName);


				//Values displayed on current City Weather section

				chosenCityEl.text(cityName);
				currentDateEl.text(dateCurrentjs);
				iconEl.attr("src", iconCompleteUrl);
				temperatureEl.text("Temp: " + cityTemperature + " °F");
				windEl.text("Wind: " + cityWind + " MPH");
				humidityEl.text("Humidity: " + cityHumidity + " %");


				console.log(resultCity);

				// UV Index - specific URL for UV index

				var latCity = resultCity.coord.lat;
				var lonCity = resultCity.coord.lon;
				var uviQueryUrl = uviUrl + "?" + APIkey + "&lat=" + latCity + "&lon=" + lonCity

				fetch(uviQueryUrl).then(function (uviResponse) {
					if (uviResponse.ok) {
						uviResponse.json().then(function (resultUvi) {

							function colorCode() {
								var UVI = resultUvi.value;
								uvIndexEl.text(UVI);
								uvIndexEl.each(function (event) {
									event.preventDefault;
									if (UVI < 3) {
										uvIndexEl.addClass("low");
										uvIndexEl.removeClass("moderate")
										uvIndexEl.removeClass("high")
										uvIndexEl.removeClass("veryHigh")
									} else if (UVI > 3 && UVI < 6) {
										uvIndexEl.addClass("moderate");
										uvIndexEl.removeClass("low")
										uvIndexEl.removeClass("high")
										uvIndexEl.removeClass("veryHigh")
									} else if (UVI > 6 && UVI < 8) {
										uvIndexEl.addClass("high");
										uvIndexEl.removeClass("low")
										uvIndexEl.removeClass("moderate")
										uvIndexEl.removeClass("veryHigh")
									} else {
										uvIndexEl.addClass("veryHigh");
										uvIndexEl.removeClass("low")
										uvIndexEl.removeClass("moderate")
										uvIndexEl.removeClass("high")
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

function forecastCity(userInputCity) {
	var forecastQueryUrl = forecastUrl + "?q=" + userInputCity + units + "&" + APIkey;
	fetch(forecastQueryUrl).then(function (city5Response) {
		if (city5Response.ok) {
			city5Response.json().then(function (response5) {

				var results5 = response5;
				console.log(results5);

				/*Day 1*/
				var cityTemperature1 = results5.list[2].main.temp;
				var date1 = results5.list[2].dt;
				var dateNew1 = new Date(dayjs.unix(date1));
				var date1dayjs = dateNew1.toLocaleString("en-US", { weekday: "short", day: "numeric", month: "numeric", year:"numeric" });
				var cityWind1 = results5.list[2].wind.speed;
				var cityHumidity1 = results5.list[2].main.humidity;
				var weatherIcon1 = results5.list[2].weather[0].icon;
				var iconCompleteUrl1 = iconWeatherUrl + weatherIcon1 + '.png';

				temperature1El.text("Temp: " + cityTemperature1 + " °F");
				forecastDate1El.text(date1dayjs);
				icon1El.attr("src", iconCompleteUrl1);
				wind1El.text("Wind: " + cityWind1 + " MPH");
				humidity1El.text("Humidity: " + cityHumidity1 + " %");


				/*Day 2*/
				var cityTemperature2 = results5.list[10].main.temp;
				var date2 = results5.list[10].dt;
				var dateNew2 = new Date(dayjs.unix(date2));
				var date2dayjs = dateNew2.toLocaleString("en-US", { weekday: "short", day: "numeric", month: "numeric", year:"numeric" });
				var cityWind2 = results5.list[10].wind.speed;
				var cityHumidity2 = results5.list[10].main.humidity;
				var weatherIcon2 = results5.list[10].weather[0].icon;
				var iconCompleteUrl2 = iconWeatherUrl + weatherIcon2 + '.png';

				temperature2El.text("Temp: " + cityTemperature2 + " °F");
				forecastDate2El.text(date2dayjs);
				icon2El.attr("src", iconCompleteUrl2);
				wind2El.text("Wind: " + cityWind2 + " MPH");
				humidity2El.text("Humidity: " + cityHumidity2 + " %");

				/*Day 3*/
				var cityTemperature3 = results5.list[18].main.temp;
				var date3 = results5.list[18].dt;
				var dateNew3 = new Date(dayjs.unix(date3));
				var date3dayjs = dateNew3.toLocaleString("en-US", { weekday: "short", day: "numeric", month: "numeric", year:"numeric"});
				var cityWind3 = results5.list[18].wind.speed;
				var cityHumidity3 = results5.list[18].main.humidity;
				var weatherIcon3 = results5.list[18].weather[0].icon;
				var iconCompleteUrl3 = iconWeatherUrl + weatherIcon3 + '.png';

				temperature3El.text("Temp: " + cityTemperature3 + " °F");
				forecastDate3El.text(date3dayjs);
				icon3El.attr("src", iconCompleteUrl3);
				wind3El.text("Wind: " + cityWind3 + " MPH");
				humidity3El.text("Humidity: " + cityHumidity3 + " %");

				/*Day 4*/
				var cityTemperature4 = results5.list[26].main.temp;
				var date4 = results5.list[26].dt;
				var dateNew4 = new Date(dayjs.unix(date4));
				var date4dayjs = dateNew4.toLocaleString("en-US", { weekday: "short", day: "numeric", month: "numeric", year:"numeric"});
				var cityWind4 = results5.list[26].wind.speed;
				var cityHumidity4 = results5.list[26].main.humidity;
				var weatherIcon4 = results5.list[26].weather[0].icon;
				var iconCompleteUrl4 = iconWeatherUrl + weatherIcon4 + '.png';

				temperature4El.text("Temp: " + cityTemperature4 + " °F");
				forecastDate4El.text(date4dayjs);
				icon4El.attr("src", iconCompleteUrl4);
				wind4El.text("Wind: " + cityWind4 + " MPH");
				humidity4El.text("Humidity: " + cityHumidity4 + " %");

				/*Day 5*/
				var cityTemperature5 = results5.list[34].main.temp;
				var date5 = results5.list[34].dt;
				var dateNew5 = new Date(dayjs.unix(date5));
				var date5dayjs = dateNew5.toLocaleString("en-US", { weekday: "short", day: "numeric", month: "numeric", year:"numeric" });
				var cityWind5 = results5.list[34].wind.speed;
				var cityHumidity5 = results5.list[34].main.humidity;
				var weatherIcon5 = results5.list[34].weather[0].icon;
				var iconCompleteUrl5 = iconWeatherUrl + weatherIcon5 + '.png';

				temperature5El.text("Temp: " + cityTemperature5 + " °F");
				forecastDate5El.text(date5dayjs);
				icon5El.attr("src", iconCompleteUrl5);
				wind5El.text("Wind: " + cityWind5 + " MPH");
				humidity5El.text("Humidity: " + cityHumidity5 + " %");

			})
		}
	})
};

//History Save//
function historySave(userInputCity) {
	historyArr.push(userInputCity);
	localStorage.setItem("cityHistory", JSON.stringify(historyArr));
	searchHistoryEl.empty();
	historyDisplay();
	console.log(historyArr);

}

//History Display//
function historyDisplay() {
	var getHistory = JSON.parse(localStorage.getItem("cityHistory"));
	for (var i = 0; i < getHistory.length; i++) {
		var cityHistoryLi = $('<li>');
		cityHistoryLi.text(getHistory[i]);
		searchHistoryEl.append(cityHistoryLi);
	}
	return (historyArr = getHistory);

};

//Event Listener to Cities saved on History
function historyClick() {
	searchHistoryEl.on("click", "li", function () {

		var cityLi = $(this).text();
		weatherCity(cityLi);
		forecastCity(cityLi);
	})
};


// Clear Button Function - clears history cities
function historyClear() {
	clearHistoryBtn.on("click", function () {
		searchHistoryEl.empty();
		localStorage.clear();
		historyArr = [];
	})
};

init();

