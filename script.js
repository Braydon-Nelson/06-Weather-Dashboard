$(document).ready(function () {
    var searchHistory = [];
    console.log(searchHistory);


    if (localStorage.getItem("searchHistory") != null) {
        searchHistory.push(localStorage.getItem("searchHistory"));
        console.log(searchHistory);

    }

    var input = "";
    var historySection = document.getElementById("historySection");


    // CURRENT WEATHER SECTION
    $("#search").click(function () {
        input = $("#searchItem").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(" - Current Weather - ");
            console.log(response);
            var date = new Date().toLocaleDateString();
            var weather = response.weather[0].main;
            var temp = response.main.temp;
            var convertTemp = ((temp - 273.15) * 9 / 5) + 32;
            convertTemp = Math.round(convertTemp);
            var humid = response.main.humidity;
            var wind = response.wind.speed;
            wind = wind * 2.236937 //convert to mph
            wind = Math.round(wind);

            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            $('#currentIcon').attr('src', iconurl);

            $("#cityName").text(response.name)
            $("#date").text(date)
            $("#weather").text("Weather - " + weather)
            $("#temp").text("Temperature - " + convertTemp)
            $("#humid").text("Humidity - " + humid)
            $("#wind").text("Wind Speed - " + wind + " MPH")

            var button = document.createElement('button');
            $(button).attr("class", "btn btn-light form-control historyBtn")
            $(button).attr("type", "button")
            button.innerHTML = response.name;
            historySection.appendChild(button);
            searchHistory.push(response.name);
            localStorage.setItem("searchHistory", searchHistory);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=867846926f7695cf1c8783b6139ee9f8&lat=" + lat + "&lon=" + lon + ""
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                $("#uvIndex").text("UV Index - " + response2.value)
            });


        });



        forecastSearch(input)
    });



    // HISTORY SECTION
    if (localStorage.getItem("searchHistory") != null) {

        console.log("kajsdlhfiuhasrpiogunsd;oifng;sodjfng;oisdjf;ogijs");

        var array = searchHistory[0].split(",");
        console.log(array);
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            var button = document.createElement('button');
            $(button).attr("class", "btn btn-light form-control historyBtn")
            $(button).attr("type", "button")
            button.innerHTML = element;
            historySection.appendChild(button);
            console.log(array);

        }
        input = array.slice(-1)[0]
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(" - Current Weather - ");
            console.log(response);
            var date = new Date().toLocaleDateString();
            var weather = response.weather[0].main;
            var temp = response.main.temp;
            var convertTemp = ((temp - 273.15) * 9 / 5) + 32;
            convertTemp = Math.round(convertTemp);
            var humid = response.main.humidity;
            var wind = response.wind.speed;
            wind = wind * 2.236937 //convert to mph
            wind = Math.round(wind);

            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            $('#currentIcon').attr('src', iconurl);

            $("#cityName").text(response.name)
            $("#date").text(date)
            $("#weather").text("Weather - " + weather)
            $("#temp").text("Temperature - " + convertTemp)
            $("#humid").text("Humidity - " + humid)
            $("#wind").text("Wind Speed - " + wind + " MPH")


            localStorage.setItem("searchHistory", searchHistory);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=867846926f7695cf1c8783b6139ee9f8&lat=" + lat + "&lon=" + lon + ""
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                $("#uvIndex").text("UV Index - " + response2.value)
            });



        });
        forecastSearch(input)
    }

    $("#historySection").on("click", "button.historyBtn", function () {
        input = $(this).text();

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var date = new Date().toLocaleDateString();
            var weather = response.weather[0].main;
            var temp = response.main.temp;
            var convertTemp = ((temp - 273.15) * 9 / 5) + 32;
            convertTemp = Math.round(convertTemp);
            var humid = response.main.humidity;
            var wind = response.wind.speed;
            wind = wind * 2.236937 //convert to mph
            wind = Math.round(wind);

            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            $('#currentIcon').attr('src', iconurl);

            $("#cityName").text(response.name)
            $("#date").text(date)
            $("#weather").text("Weather - " + weather)
            $("#temp").text("Temperature - " + convertTemp)
            $("#humid").text("Humidity - " + humid)
            $("#wind").text("Wind Speed - " + wind + " MPH")

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=867846926f7695cf1c8783b6139ee9f8&lat=" + lat + "&lon=" + lon + ""
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                $("#uvIndex").text("UV Index - " + response2.value)
            });

        });
        forecastSearch(input);
    });


    // FORECAST SECTION
    function forecastSearch(input) {
        $("#forecastSection").empty();

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(" - Forecast - ");
            console.log(response);

            var array = response.list
            console.log(array.length);
            for (let i = 0; i < array.length; i += 8) {
                const element = array[i];
                console.log(element);

                //calls weather
                console.log(element.weather[0].main);

                var date = new Date().toLocaleDateString();
                var weather = element.weather[0].main;
                var temp = element.main.temp;
                var convertTemp = ((temp - 273.15) * 9 / 5) + 32;
                convertTemp = Math.round(convertTemp);
                var humid = element.main.humidity;
                var wind = element.wind.speed;
                wind = wind * 2.236937 //convert to mph
                wind = Math.round(wind);

                var iconcode = element.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

                var codeBlock = "<div class='col'>" +
                    "<div class='card'>" +
                    "<img src='" + iconurl + "' class='' alt='...'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + date + "</h5>" +
                    "<p class='card-text'>" + weather + "</p>" +
                    "<p class='card-text'>" + temp + "</p>" +
                    "<p class='card-text'>" + humid + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";


                document.getElementById("forecastSection").innerHTML += codeBlock;

            }

            // ((kelvinTemp - 273.15) * 9/5) + 32

        });
        console.log(input);
    }
});