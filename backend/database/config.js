const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbConnection = async() => {

    mongoose.connection.openUri(process.env.MONGODB_CNN,
        (err, res) => {

        if (err) {
            console.log(process.env.MONGODB_CNN, err);
            throw err;
        }
    
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    
    });

}

module.exports = {
    dbConnection
}
