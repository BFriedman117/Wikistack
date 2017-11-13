'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const models = require('./models');
const routes = require('./routes');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use(function(err, req, res, next){
  console.log(err);
  res.status(500).send(err);
})


models.db.sync({})
.then(function (){
  app.listen('3000', function (){
    console.log('Server is listening on port 3000!');
  });
})
.catch(console.error);

module.exports = app;
