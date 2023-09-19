const express = require('express');
const dotenv = require('dotenv').config();


const app = express()

app.use('/api/user', require('./Routes/UserRoutes'))
app.use('/api/barcode', require('./Routes/BarcodeRoutes'))

app.listen(process.env.PORT, () => {console.log(`server run on ${process.env.PORT}`)})
