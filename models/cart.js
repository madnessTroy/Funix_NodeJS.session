const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");

module.exports = class Cart {
	static addProduct(id, productPrice) {
		// Lấy ra dữ liệu của giỏ hàng
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			// Xem trong giỏ hàng đã có mặt hàng đó chưa
			const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
			const existingProduct = cart.products[existingProductIndex];

			let updatedProduct;
			console.log(existingProduct);
			// Nếu có rồi thì tăng thêm SL
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice; // update giá của giỏ hàng
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}
};
