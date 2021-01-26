const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const server = express();

server.use(cors({
    credentials: true,
    origin: '*'
}));
server.use(bodyParser.json());

const main = () => {
    try {
        server.listen(PORT, () => {
            console.log("Server started at port: " + PORT);
        })
    } catch (e) {
        console.error(e);
    }
}

main();