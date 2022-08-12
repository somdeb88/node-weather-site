const request = require('request');
const ACCESS_TOKEN = 'pk.eyJ1Ijoic29tZGVibWl0dHJhIiwiYSI6ImNsNmpibDdpbDExMXgzbW52cGE2dno1NDYifQ.e4q4-BYDMQC4zQHw2H-lbg';

const geocode = (address, callaback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${ACCESS_TOKEN}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      // console.error(err);
      callaback('Unable to connect to location services!', undefined);
      return;
    } else if (body && body.features && body.features.length === 0) {
      callaback('Unable to connect to location services!', undefined);
      return;
    }
    if (body && body.features && body.features[0]) {
      callaback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  });
};

module.exports = geocode;