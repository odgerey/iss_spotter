/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');



const fetchMyIP = function(callback) { 
  request("https://api.ipify.org?format=json", (error, response, body) =>  {
    if (error) {
      return callback(error, null)
    }


    if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
    }

    const ip = JSON.parse(body).ip;
      callback (null, ip)
    });
};

fetchCoordsByIP =  function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) =>  {
    if (error) {
      return callback(error, null)
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    // const latitude = JSON.parse(body).data.latitude
    // const longitude = JSON.parse(body).data.longitude
    
    const { latitude, longitude } = JSON.parse(body).data;
    callback (null, {latitude, longitude});
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }

    if (response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    return;
    }

    const results= JSON.parse(body).response;
    callback (null, results);


  });
};
// module.exports = { fetchISSFlyOverTimes };
    
    
// iss.js 

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };