$(document).ready(function () {

    var input = $("#searchItem").val();

    $("#search").on("click", function () {
        input = $("#searchItem").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&APPID=867846926f7695cf1c8783b6139ee9f8"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });

        console.log(input);

    });

});