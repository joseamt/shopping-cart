/*** Created by Jose on Jul, 2018 ***/

var Product = require('../models/products');
var mongoose = require('mongoose');
//mongoose.connect('localhost:27010/shopping');
//db connection
let option = {useNewUrlParser: true};
mongoose.connect('mongodb://localhost:27017/shopping', option);
mongoose.connection.on('connected', function () {
    console.log('MOngodb connection opened');
});
mongoose.connection.on('error', function (err) {
    console.log('MOngodb connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('MOngodb connection disconnected');
});
var product = [new Product({

    imagePath: 'https://images.samsung.com/is/image/samsung/p5/in/smartphones/in-galaxy-on7-prime.png?$ORIGIN_PNG$',
    title: 'Samsung Galaxy S9',
    description: 'samsung mobiles',
    price: 10
}), new Product({

    imagePath: 'https://images.samsung.com/is/image/samsung/p5/in/smartphones/in-galaxy-on7-prime.png?$ORIGIN_PNG$',
    title: 'Samsung Galaxy S9',
    description: 'samsung mobiles',
    price: 12
}), new Product({

    imagePath: 'https://images.samsung.com/is/image/samsung/p5/in/smartphones/in-galaxy-on7-prime.png?$ORIGIN_PNG$',
    title: 'Samsung Galaxy S9',
    description: 'samsung mobiles',
    price: 15
}), new Product({

    imagePath: 'https://images.samsung.com/is/image/samsung/p5/in/smartphones/in-galaxy-on7-prime.png?$ORIGIN_PNG$',
    title: 'Samsung Galaxy S9',
    description: 'samsung mobiles',
    price: 45
}), new Product({

    imagePath: 'https://images.samsung.com/is/image/samsung/p5/in/smartphones/in-galaxy-on7-prime.png?$ORIGIN_PNG$',
    title: 'Samsung Galaxy S9',
    description: 'samsung mobiles',
    price: 62
}), new Product({

    imagePath: 'https://images.samsung.com/is/image/samsung/p5/in/smartphones/in-galaxy-on7-prime.png?$ORIGIN_PNG$',
    title: 'Samsung Galaxy S9',
    description: 'samsung mobiles',
    price: 23
}),];
var done = 0;
for (var i = 0; i < product.length; i++) {
    product[i].save(function (err, result) {
        done++;
        if (done === product.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
