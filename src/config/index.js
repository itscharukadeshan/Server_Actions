/** @format */
const dotenv = require("dotenv");

dotenv.config();

const BROWSER_ENDPOINT = process.env.BROWSER_ENDPOINT;

module.exports = {
  BROWSER_ENDPOINT,
};
