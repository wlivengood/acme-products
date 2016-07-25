var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var Products = require('./product.model');

var router = express();
router.use(bodyParser());

router.use(methodOverride('method'));

router.get('/', function(req, res) {
	res.render('index', {title: "Home"});
});

router.get('/products', function(req, res) {
	res.render('products', {title: "Products", products: Products.getProducts()});
});

router.get('/products/add', function(req, res) {
	res.render('add', {title: "Add Product"});
})

router.delete('/products/:id', function(req, res, next) {
	Products.deleteProduct(req.params.id*1);
	res.redirect('/products');
});

router.post('/products/add', function(req, res, next) {
	var name = req.body.name;
	Products.addProduct(name);
	res.redirect('/products');
});

router.get('/products/:id/edit', function(req, res, next) {
	var item = Products.getProducts().filter(function(item) {
		return item.id === Number(req.params.id);
	})[0];
	res.render('edit', {title: "Edit Product", item: item});
});

router.put('/products/:id/edit/:name', function(req, res, next) {
	Products.editProduct(req.params.id*1, req.body.name);
	res.redirect('/products');
});

module.exports = router;