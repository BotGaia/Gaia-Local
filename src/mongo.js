

module.exports = {
    connect: function() {

        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        mongoose.set('debug', true);
        mongoose.connect('mongodb://localhost/test');
        
    } 
}

