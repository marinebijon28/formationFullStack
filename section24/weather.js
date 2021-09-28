const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : false}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/weather.html");
});

app.post("/", function(req, res) {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6f442a515b11ed2078d11e025e494255&units=metric"

    https.get(url, function(response) {
        response.on("data", function(data) {
            weatherData = JSON.parse(data)
            temperature = weatherData.main.temp
            description = weatherData.weather[0].description

            res.write("La description a " + city + " est : " + description + "\n")
            res.write("La temperature a " + city + " est de " + temperature + " degres")
            res.send()
        });
    });
});

app.listen(3000, function() {
    console.log("le serveur marche bien !")
});
