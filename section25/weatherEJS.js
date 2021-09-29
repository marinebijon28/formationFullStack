const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express()
const fruitModule = require(__dirname + "/fruit.js")


app.use(bodyParser.urlencoded({extended : false}))
app.set("view engine", "ejs")
app.use(express.static("assets"))

app.get("/fruit", function(req, res) {
    const fruit = fruitModule.getFruit()
    res.render('fruit', {fruit : fruit})
});

app.get("/fruitArray", function(req, res) {
    const fruitArray = fruitModule.getFruitArray()
    res.render('fruitArray', {fruitArray : fruitArray})
});

app.get("/weather", function(req, res) {
    res.render('addCity')
});

app.post("/weather", function(req, res) {
    // The data is in request
    const city = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6f442a515b11ed2078d11e025e494255&units=metric"
    const tabWeather = []

    https.get(url, function(response) {
       // console.log(response)
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
           // console.log(weatherData)
            const weather = {
                city: city,
                temperature : weatherData.main.temp,
                describe : weatherData.weather[0].description,
                icon : weatherData.weather[0].icon
            }
            tabWeather.push(weather)
            console.log(tabWeather[0].icon)
            // this response of server
            res.render('weather', {tabWeather : tabWeather})
        })
    })
});

app.listen(3000,  function() {
    console.log("le serveur marche bien !")
});