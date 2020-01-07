$(document).ready(function () {

    var input = $("#searchItem").val();
    var historySection = document.getElementById("historySection");


    // CURRENT WEATHER SECTION
    $("#search").on("click", function () {
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
            $(button).attr("type", "button")
            $(button).attr("class", "btn btn-light form-control")
            button.innerHTML = response.name;
            historySection.appendChild(button);
        });
    });


    // FORECAST SECTION
    $("#search").on("click", function () {
        input = $("#searchItem").val();
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


            }

            // ((kelvinTemp - 273.15) * 9/5) + 32

        });

        console.log(input);

    });

});