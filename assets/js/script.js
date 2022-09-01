var APIkey = "&appid=4b240ff285db6735e81b43a05878c1bf"
var searchBtn = $("#search")
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather"

// Function Init - calls Search City function - once the user types in the city and click the Search button, then fetch will be executed.

function init(){
	searchCity ();
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

				var results = response;
				console.log(results);
			})
		}
	})
};

init();