const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9000;
const axios = require("axios");
app.use(express.json());
app.get("/", () => {
  try {
    res.status(200).send("hello Node");
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

app.get("/location", async (req, res, next) => {
  try {
    const { lat, lng } = req.query;
    const encodedCoordinate = encodeURIComponent(lat + "," + lng);
    let result = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?key=${process.env.API_KEY}&q=${encodedCoordinate}&pretty=1&no_annotations=1`
    );
    res.status(200).send(result.data.results[0]);
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
    });
  }
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
