const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : false}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/weather.html");
});

app.post("/", function(req, res) {
    const ville = req.body.ville;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=6f442a515b11ed2078d11e025e494255"

    https.get(url, function(response) {
        response.on("data", function(data) {
            weatherData = JSON.parse(data)
            temperature = weatherData.main.temp
            description = weatherData.weather[0].description

            res.write("La description a " + ville + " est : " + description + "\n")
            res.write("La temperature a " + ville + " est de " + temperature + " degres")
            res.send()
        });
    });
});

app.listen(3000, function () {
    console.log("le serveur marche bien !")
});
