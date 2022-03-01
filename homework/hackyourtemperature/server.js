import express from "express";
import fetch from "node-fetch";
import exphbs from "express-handlebars";
import path from "path";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  console.log(req.body, "request");
  const cityName = req.body.city;
  res.send(cityName);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
