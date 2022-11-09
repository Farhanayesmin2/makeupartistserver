// ACEP is the basic step us
const express = require('express');
const cors = require('cors');
const app = express();
// set the port 5000;
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API 5000 PORT Running.')
})

app.listen(port, () => {
    console.log(`Makeup Artist runing on ${port}`);
})