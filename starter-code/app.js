const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// 2 lines that set up handlebars template language -- They will always be the same.
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => { // this is how I call my array when it comes back from the API
      // NOW the beers are available
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beersArray: beersFromApi }) // Here we are creating an object with the property beersArray. We could pass the array directly, but it's best to make it an object. it can be complex and nested.
    })
})

app.get('/random-beer', (req, res) => {
  // console.log('req.params.id', req.params.id)
  punkAPI.getRandom()
  .then(randomBeerFromAPI => {
    res.render('random-beer', {randomBeerArray: randomBeerFromAPI});
    console.log('randomBeerArray', randomBeerArray)
  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));