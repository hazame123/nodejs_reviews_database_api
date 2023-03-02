const express = require('express')
const bodyParser = require('body-parser')
const routesHandler = require('./routes/handler')
const cors = require('cors')
require('dotenv/config')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});