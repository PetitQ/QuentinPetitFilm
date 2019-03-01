var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const open = require('opn');

var port = 8080;

global.MOVIES = [
    {
        id: 1,
        title: "Avengers",
        year: 2012,
        language: 'Anglais',
        director: {
            name: "Joss Whedon",
            nationality: "Britannique",
            birthdate: "1964-06-23"
        },
        poster: null,
        synopsis: "Ceci est le synopsis d'Avengers",
        genre: 'Fantastique',
        ratings: [5,1]
    },
    {
        id: 2,
        title: "Ocean's 8",
        year: 1997,
        language: 'Anglais',
        director: {
            name: "Gary Ross",
            nationality: "Américain",
            birthdate: "1956-11-03"
        },
        poster: null,
        synopsis: "Ceci est le synopsis de Ocean's 8",
        genre: 'Comédie, Policier',
        ratings: [2, 4]
    },
    {
        id: 3,
        title: "Deadpool 2",
        year: 2018,
        language: 'Anglais',
        director: {
            name: "David Leitch",
            nationality: "Américain",
            birthdate: "1975-11-16"
        },
        poster: null,
        synopsis: 'Ceci est le synopsis de Deadpool 2',
        genre: 'Action, Comédie, Aventure',
        ratings: [5, 4, 2]
    }
];

var app = express();

app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

console.log(`App listening on port ${port}...`);

var apiRoutes = require('./routes.js');
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
})

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('src/dist/index.html'));
});

open(`http://localhost:${port}`).catch(() => {
  log.warn(`Failed to open browser automatically.`);
});