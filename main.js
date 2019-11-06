const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//middleware
app.use('/api', (req, res, next) => {
    console.log("method: "+ req.method +" && uri: "+ req.url);
    next();
});

//routes
var routes = require(path.join(__dirname, 'routes', 'crud.routes'));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`server runs at ${port} port`);
});