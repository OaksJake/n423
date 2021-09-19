function addEventListner() {
    $("#submit").click(function(e) {
        e.preventDefault();
        let cityZipName = $("#location").val();

        getWeather(cityZipName);
    })
}

function getWeather(cityZip) {
    $.get(`http://api.weatherapi.com/v1/current.json?key=e2164d2ea6e04c93896202934211309&q=${cityZip}&aqi=no`, function (data) {
        console.log(data);
        $("#name").html(`<h1>${data.location.name}</h1>`);
        $("#image").html(`<img src="${data.current.condition.icon}" />`);
        $("#lowHigh").html(`<div><h3>${data.current.temp_f}℉<div>|</div>${data.current.temp_c}℃</h3></div>`);
        $("#description").html(`<h2>${data.current.condition.text}</h2>`);
        $("#other").html(`<h3>Wind: ${data.current.wind_mph}mph/${data.current.wind_kph}kph | Humidity: ${data.current.humidity} | Feels Like: ${data.current.feelslike_f}℉/${data.current.feelslike_c}℃</h3>`);
    }).fail(function(e) {
        console.log(e);
    })
}

$(document).ready(function() {
    addEventListner();
});
