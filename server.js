const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')


const app = express()

app.use('/api/user', cors(), require('./Routes/UserRoutes'))
app.use('/api/barcode', require('./Routes/BarcodeRoutes'))
app.use('/api/event', require('./Routes/EventRoutes'))
app.use('/api/scanner', require('./Routes/ScannerRoutes'))

app.listen(process.env.PORT, () => {console.log(`server run on ${process.env.PORT}`)})
