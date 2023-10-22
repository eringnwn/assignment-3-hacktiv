const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// main route
app.use(routes);

// handle 404
app.use((req, res, next) => {
    res.status(404).send({
        message: "Not found",
    });
});

// handle error
app.use((err, req, res, next) => {
    res.status(500).send({
        message: "Internal Server Error",
    });
});

module.exports = app;