var products = [
	{
		id: 3,
		name: "Stuff"
	},
	{
		id: 5,
		name: "Thing"
	}
];

module.exports = {
	getProducts: function() {
		return products;
	},
	deleteProduct(id) {
		var toDelete = this.getProducts().filter(function(item) {
			return item.id === id;
		})[0];
		var idx = this.getProducts().indexOf(toDelete);
		this.getProducts().splice(idx, 1);
	},
	addProduct(name) {
		var newProduct = {};
		newProduct.name = name;
		var newID = 1;
		while(this.getProducts().filter(function(item) {
			return item.id === newID;
		}).length > 0)
			newID++;
		newProduct.id = newID;
		products.push(newProduct);
	},
	editProduct(id, name) {
		var toEdit = this.getProducts().filter(function(item) {
			return item.id === id;
		})[0];
		toEdit.name = name;
	}
}