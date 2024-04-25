const express = require('express');
const cors = require('cors');
const app = express();
Require('Dotenv').Config();
const port = process.env.PORT || 5000;


//  Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Assignment 10 server is running')
})

app.listen(port, () => {
    console.log(`Assignment 10 server running on: ${port}`)
})