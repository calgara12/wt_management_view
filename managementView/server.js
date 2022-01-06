let cfg = require('./config.json');
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.static(__dirname + '/dist/managementView'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());

const categories = require('./routes/categories');
const menuItems = require('./routes/menu-items');


app.use('/api/categories', categories);
app.use('/api/menu-items', menuItems);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));