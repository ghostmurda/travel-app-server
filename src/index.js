const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require("./config/travel-app-808de-firebase-adminsdk-13ojd-0a10d18057.json");

const PORT = process.env.PORT || 8080;
const server = express();

server.use(cors({
    credentials: true,
    origin: '*'
}));
server.use(bodyParser.json());

const main = () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        server.use('/country', require('./controller/countryController'));
        server.use('/media', require('./controller/mediaController'));

        server.listen(PORT, () => {
            console.log("Server started at port: " + PORT);
        })
    } catch (e) {
        console.error(e);
    }
}

main();