const express = require('express');
const path = require('path');
const hbs = require('hbs');

const {geocode} = require('./utils/geocode');
const {forecast} = require('./utils/forecast');

const app = express();
const port = process.evn.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Alex',
        helpText: 'This is some helpful text'
    });
});

app.get('/weather', (req, res) => {
    const {query} = req;

    if (!query.hasOwnProperty('address')) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const {address} = query;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error
                    });
                }

                return res.send({
                    forecast: data,
                    location,
                    address
                });
            });
        }
    });
});

app.get('/products', (req, res) => {
    const {query} = req;

    if (!query.hasOwnProperty('search')) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(query)
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex',
        errorMessage: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
