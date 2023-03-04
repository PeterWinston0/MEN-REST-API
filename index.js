const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
//const { verifyToken } = require("./validation");
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Swagger dependencies
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');

//setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition))

//import routes
const tvshowRoutes = require("./routes/tvshow");
const authRoutes = require("./routes/auth");

require("dotenv-flow").config();

// parse request of content-type JSON
app.use(bodyParser.json());

mongoose.connect(
    process.env.DBHOST, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//routes
app.get("/api/welcome", (req, res) => {
    res.status(200).send({message: "Welcome to the REST TV_SHOW API"});
})

//post, put, delete -> CRUD
//to verify token from server.js app.use("/api/tvshow", verifyToken, tvshowRoutes);
app.use("/api/tvshow", tvshowRoutes);
//app.use("/api/tvshow", verifyToken, tvshowRoutes);
app.use("/api/user", authRoutes);

// /api/user/login > post
const PORT = process.env.PORT || 4000;

app.listen(PORT ,function() {
    console.log("server is running on port" + PORT);
})

module.exports = app;

