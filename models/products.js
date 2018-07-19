/*** Created by Jose on Jul, 2018 ***/

var mongoose = require('mongoose');
var Scheema = mongoose.Schema;
var scheema = new Scheema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}

});
module.exports = mongoose.model('Product', scheema);