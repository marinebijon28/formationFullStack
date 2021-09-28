const express = require("express")
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended : false}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/caculCarrelage.html")
})

app.post("/", function(req, res) {
    let aire = req.body.aire
    let numberCarreaux = (15 * 15) / aire;
    res.send("Il vous faudra " + numberCarreaux + " pour une surface de " + aire + " m2 !")
})


app.listen(3000, function() {
    console.log('Exemple app listening on port 3000!')
})
