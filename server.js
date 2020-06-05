const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

//connect database
connectDB();

//accept json data middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

