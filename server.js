var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var swig = require('swig');
swig.setDefaults({cache: false});
var bodyParser = require('body-parser');
var Products = require('./product.model');

var app = express();
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser());

app.use(methodOverride('method'));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function(req, res) {
	res.render('index', {title: "Home"});
});

app.get('/products', function(req, res) {
	res.render('products', {title: "Products", products: Products.getProducts()});
});

app.get('/products/add', function(req, res) {
	res.render('add', {title: "Add Product"});
})

app.delete('/products/:id', function(req, res, next) {
	Products.deleteProduct(req.params.id*1);
	res.redirect('/products');
});

app.post('/products/add', function(req, res, next) {
	var name = req.body.name;
	Products.addProduct(name);
	res.redirect('/products');
});

app.get('/products/:id/edit', function(req, res, next) {
	res.render('edit', {title: "Edit Product", item: Products.getProducts().filter(function(item) {
		return item.id === req.params.id;
	})});
})

app.put('/products/:id/edit/:name', function(req, res, next) {
	console.log(req.body);
	Products.editProduct(req.params.id*1, req.params.name);
	res.redirect('/products');
});

app.listen(process.env.PORT, function() {
	console.log("Listening on port " + process.env.PORT);
});