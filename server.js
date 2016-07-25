var express = require('express');
var path = require('path');
var swig = require('swig');
swig.setDefaults({cache: false});
var Products = require('./product.model');

var app = express();
app.use(express.static(path.join(__dirname, "node_modules")));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

var routes = require('./products.routes.js');
app.use('/', routes);

app.listen(process.env.PORT, function() {
	console.log("Listening on port " + process.env.PORT);
});