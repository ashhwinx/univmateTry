const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express();
const connectToDb = require('./db/db')
const materialRoutes = require('./routes/material.routes')

// Remove duplicate CORS configurations and allow your frontend domain
app.use(cors({
  origin: ["http://localhost:5173", "https://univmate.com"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/materials', materialRoutes);


module.exports = app;