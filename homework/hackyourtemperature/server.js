import express from "express";
import fetch from "node-fetch";
import exphbs from "express-handlebars";
import path from "path";
import { keys } from "./sources/keys.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.city;
  // res.send(cityName);
  try {
    const fetchResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${keys.API_KEY}`
    );
    if (fetchResponse.ok) {
      const responseJson = await fetchResponse.json();
      const temperature = responseJson.main.temp;
      console.log(`The temperature in ${cityName} is ${temperature} °C!`);
      res.json({
        weatherText: `The temperature in ${cityName} is ${temperature} °C!`,
      });
    } else {
      res.json({ weatherText: "City is not found!" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ weatherText: `${error.message}` });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
