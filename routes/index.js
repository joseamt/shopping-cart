var express = require('express');
var router = express.Router();
var csrf = require('csrf');
var csrfProtection = csrf();
var passport = require('passport');
var Product = require('../models/products');
//router.use(csrfProtection);


/* GET home page. */
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
/*user sign up*/
router.get('/user/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    falireFlash: true
}));

router.get('/user/profile', function (req, res, next) {
    res.render('user/profile');
});

module.exports = router;
