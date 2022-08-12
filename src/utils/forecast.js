const request = require('request');

const ACCESS_KEY = '962539d757101770b6b322f3cccf887c';
const BASE_URL = 'http://api.weatherstack.com';
const END_POINT = 'current';

const forecast = (latitude, longitude, callback) => {
  const url = `${BASE_URL}/${END_POINT}?access_key=${ACCESS_KEY}&query=${latitude},${longitude}&units=m`;
  request({ url, json: true}, (err, { body }) => {
    if (err) {
      callback('1Could not connect to weather services!', undefined);
      return;
    } else if (body.error) {
      callback('Unable to find forecast for provided location!', undefined);
      return;
    }
    // console.log(data.current);
    if (body && body.current && body.current.weather_descriptions && body.current.weather_descriptions[0]) {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out.`);
    } else {
      callback('Weather details could not be fetched!', undefined);
      return;
    }
  });
}

module.exports = forecast;
