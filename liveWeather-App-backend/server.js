const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Weather App Backend is Running!");
});

app.get("/weather", async (req, res) => {
  const { city } = req.query;
  const API_KEY = process.env.API_KEY;
  //   const API_KEY = "7a2e6887ac7f0c3ab652d21c4d639da5";
  //   const city = "chennai";
  console.log("City:", city); // Log the city value
  console.log("API Key:", API_KEY); // Log the API key
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});