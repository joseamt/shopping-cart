/*** Created by Jose on Jul, 2018 ***/

var express = require('express');
var router = express.Router();
var csrf = require('csrf');
var passport = require('passport');

var csrfProtection = csrf();
//router.use(csrfProtection);
router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    falireFlash: true
}));

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    falireFlash: true
}));
router.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/');
});
router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;