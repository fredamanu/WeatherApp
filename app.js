const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  const cityName = req.body.cityname
  const newCityName = cityName.slice(0, 1).toUpperCase() + cityName.slice(1)
  const unit = "metric"
  const key = "e04f3e8917a355aa89d38ef4b5c9e38c"
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    newCityName +
    "&units=" +
    unit +
    "&appid=" +
    key
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write(
        `<html> 
        <head>
        <style>
         h2{color: white;
           font-size: 40px;
           margin-bottom: 0}
         h3{color: white;
            font-size: 30px;
            margin-bottom: 0;
            margin-top:5px}
         html{background-image: url(https://images.pexels.com/photos/1755680/pexels-photo-1755680.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);background-repeat: no-repeat;
            background-size: cover;
            background-position: center;}
         h1{font-size: 50px}
            p{color: white; margin-top:5px}
        </style>
        </head>
        <body> 
        <div style="color: #fff; margin: 100px auto 50px; text-align: center">
          <h1>Weather</h1>
        </div>
        <div
         style="
           text-align: center;
           width: 25%;
           height: 300px;
           margin: 0px auto 100px;
           background-color: black;
           opacity: 0.8;
           padding: 20px;
           border-radius: 15px;
         "
       >
        <h2> ${newCityName}</h2>
        <h3 >${Math.floor(temp)}<span>&#176</span></h3>
        <img src=${iconUrl}>
        <p> The weather is currently ${description}</p>
        </div>
        </body>
        </html>`
      )
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log("Server is running on port 3000.")
})
