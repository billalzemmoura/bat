const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5432;
const cors = require("cors");
const route = require("./router/ExpressRouter");
app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(route);
app.listen(port, function () {
    console.log("serveur ok on port "+port)
});