const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.API_PORT || 3000;
const webapp_hostname = process.env.WEBAPP_HOSTNAME;

app.use(cors(
    {
        origin: webapp_hostname,
        methods: ['POST'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With'
        ]
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
