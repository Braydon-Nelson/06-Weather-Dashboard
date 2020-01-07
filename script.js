$(document).ready(function () {
    // var history = localStorage.getItem("history")
    // $(history).push(localStorage.getItem("history"));
    var input = "";
    var historySection = document.getElementById("historySection");

    for (let i = 0; i < history.length; i++) {
        const element = history[i];

    }


    // CURRENT WEATHER SECTION
    $("#search").click(function () {
        input = $("#searchItem").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response1) {
            console.log(" - Current Weather - ");
            console.log(response1);
            var date = new Date().toLocaleDateString();
            var weather = response1.weather[0].main;
            var temp = response1.main.temp;
            var convertTemp = ((temp - 273.15) * 9 / 5) + 32;
            convertTemp = Math.round(convertTemp);
            var humid = response1.main.humidity;
            var wind = response1.wind.speed;
            wind = wind * 2.236937 //convert to mph
            wind = Math.round(wind);

            var iconcode = response1.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            $('#currentIcon').attr('src', iconurl);

            $("#cityName").text(response1.name)
            $("#date").text(date)
            $("#weather").text("Weather - " + weather)
            $("#temp").text("Temperature - " + convertTemp)
            $("#humid").text("Humidity - " + humid)
            $("#wind").text("Wind Speed - " + wind + " MPH")

            var button = document.createElement('button');
            $(button).attr("class", "btn btn-light form-control historyBtn")
            $(button).attr("type", "button")
            button.innerHTML = response1.name;
            historySection.appendChild(button);
            // $(history).push(response.name);
            // localStorage.setItem("history", history);
        });
    });

    // HISTORY SECTION
    $("#historySection").on("click", "button.historyBtn", function () {
        console.log("lksudhfgljksduhrglisuerhtgoisudhflgiushdfliguhsdrlihg");

        // if ($(this).hasClass("histoyBtn")) {

        console.log(input);
        input = $(this).text();
        console.log(input);

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response2) {
            console.log(" - Current Weather - ");
            console.log(response2);
            var date = new Date().toLocaleDateString();
            var weather = response2.weather[0].main;
            var temp = response2.main.temp;
            var convertTemp = ((temp - 273.15) * 9 / 5) + 32;
            convertTemp = Math.round(convertTemp);
            var humid = response2.main.humidity;
            var wind = response2.wind.speed;
            wind = wind * 2.236937 //convert to mph
            wind = Math.round(wind);

            var iconcode = response2.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            $('#currentIcon').attr('src', iconurl);

            $("#cityName").text(response2.name)
            $("#date").text(date)
            $("#weather").text("Weather - " + weather)
            $("#temp").text("Temperature - " + convertTemp)
            $("#humid").text("Humidity - " + humid)
            $("#wind").text("Wind Speed - " + wind + " MPH")

        });
        // }
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