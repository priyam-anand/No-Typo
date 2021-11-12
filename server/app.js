const express = require("express");
const app = express();
const socket = require('socket.io');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;

const expressServer = app.listen(PORT);
const io = socket(expressServer);

require('./DB/connect.js');
