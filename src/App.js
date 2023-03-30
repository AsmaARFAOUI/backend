const express = require("express");

// Init App
const app = express();

//Middlewares
app.user(express.json());

//Running the server
