const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
// const bodyParser = require('body-parser');

//connect database
connectDB();

/********************************************************
 *  Middleware to send CORS header response first before
 * routes send their individual responses(all requests)
 */
app.use((req, res, next) => {
    //you can also specify a specific host with IP
    //this is for the client checked by browser
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', '*');
    //this is for the browser itself
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    next();
});

//accept json data middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

