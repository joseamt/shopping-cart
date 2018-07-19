/*** Created by Jose on Jul, 2018 ***/

var mongoose = require('mongoose');
var Scheema = mongoose.Schema;

var userScheema = new Scheema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
module.exports = mongoose.model('User', userScheema);