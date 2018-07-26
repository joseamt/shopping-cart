var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/products');
var p = require('../seed/product-seeder');
//router.use(csrfProtection);


/* GET home page. */

router.get('/seederproducts', function (req, res, next) {
    p();
});

router.get('/', function (req, res, next) {
    Product.find(function (err, doc) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < doc.length; i += chunkSize) {
            productChunks.push(doc.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log('req.session.cart', req.session.cart);
        res.redirect('/')
    })
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

router.get('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        res.redirect('shop/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice});
});
/*user sign up*/

module.exports = router;
