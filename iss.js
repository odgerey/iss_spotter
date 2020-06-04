/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fs = require('fs');
const myArg = process.argv.slice(2);


const fetchMyIP = function(callback) { 
  request("https://api.ipify.org?format=json", (error, response, body) =>  {
    if (error) {
      return callback(error, null)
    }

      // if non-200 status, assume server error
    if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
    }

    const result = JSON.parse(body);
    if (result === undefined) {
      callback ("Not a valid IP", null)
    } else {
      callback (null, result)
    }
})
};

module.exports = { fetchMyIP };