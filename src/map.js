const http = require("http");

function getUserLocation(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  http
    .get(`http://ipinfo.io/${ip}/json`, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const location = JSON.parse(data);
        res.json({
          ip: location.ip,
          city: location.city,
          region: location.region,
          country: location.country,
          loc: location.loc, // latitude,longitude
        });
      });
    })
    .on("error", (error) => {
      console.error("Error fetching IP information:", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve location information." });
    });
}

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/user-location", (req, res) => {
  getUserLocation(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
