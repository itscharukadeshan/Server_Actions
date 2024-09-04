/** @format */
const puppeteer = require("puppeteer");
const express = require("express");
const axios = require("axios");
const { BROWSER_ENDPOINT } = require("./config");

const app = express();
const port = 3224;
const meTube_url = "http://192.168.8.100:8081";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Puppeteer Express App!");
});

app.get("/me_tube", async (req, res) => {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_ENDPOINT,
    });

    const page = await browser.newPage();
    await page.goto(meTube_url);

    const downloadButtons = await page.$$("fa-icon .fa-download");
    const clickPromises = downloadButtons.map((button) => button.click());

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await Promise.all(clickPromises);

    await browser.close();

    res.json({ message: "Downloads started successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to run Puppeteer script" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://192.168.8.100:${port}`);
});
