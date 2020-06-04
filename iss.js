/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');



// const fetchMyIP = function(callback) { 
//   request("https://api.ipify.org?format=json", (error, response, body) =>  {
//     if (error) {
//       return callback(error, null)
//     }

//       // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//     const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//     callback(Error(msg), null);
//     return;
//     }

//     const ip = JSON.parse(body).ip;
//       callback (null, ip)
//     });
// };

fetchCoordsByIP =  function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) =>  {
    if (error) {
      return callback(error, null)
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }


    const { latitude, longitude} = JSON.parse(body).data;
    callback (null, {latitude, longitude});
  });
};

// module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
