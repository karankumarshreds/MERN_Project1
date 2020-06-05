const mongoose = require('mongoose');
/***********************************
 * config => //npm install config
 * used to get access to the global- 
 * vars we create in the default.json
 */
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            //add these to avoid warnings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;