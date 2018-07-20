/*** Created by Jose on Jul, 2018 ***/

var mongoose = require('mongoose');
var Scheema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userScheema = new Scheema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
userScheema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
userScheema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userScheema);