// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchISSFlyOverTimes} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("162.245.144.188", (error, coords) => {
//   if (error) {
//     console.log ("Error fetch details:", error);
//     return;

//   } else  {
//     console.log ("It Worked! Returned Coords:", coords);
//   }
// });

// fetchISSFlyOverTimes("{latitude: '49.27670', longitude: '-30.13000'}", (error, pass) => {
//   if (error) {
//     console.log ("Error fetch details:", error);
//     return;
    
//   } else {
//     console.log ("It Worked! Returned:", pass);
//   }
// });

// index.js

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});