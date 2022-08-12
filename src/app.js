const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const assetsPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// provide static resources directory
app.use(express.static(assetsPath));

// to render from views folder
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); 

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Somdeb Mittra'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    message: 'All you need to know about the Weather app!',
    title: 'About Page',
    name: 'Somdeb Mittra'
  });
});

app.get('/weather', (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address to get the forecast'
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      // console.log(`${location}: ${forecastData}`);
      res.send({ forecast: forecastData, location, address: req.query.address  });
    });
  });
  
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'You will get all the help that you need!',
    title: 'Help Page',
    name: 'Somdeb Mittra'
  });
});

app.get('/help/data', (req, res) => {
  res.render('help', {
    message: 'All you need to know about the Weather app!',
    title: 'About Page',
    name: 'Somdeb Mittra'
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help article not found',
    name: 'Somdeb Mittra'
  })
});

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not found',
    name: 'Somdeb Mittra'
  })
});



// respond with plain text/JSON/HTML
// app.get('/help', (req, res) => {
//   res.send('Help Page!');
// });
// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>');
// });


app.listen(port, () => {
  console.log(`App running on port ${port}`);
})