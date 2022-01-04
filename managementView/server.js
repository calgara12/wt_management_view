const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();
const tables = require('./routes/tables')
const users = require('./routes/users')
let bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static(__dirname + '/dist/managementView'));
//routing
app.use('/api/tables', tables)
app.use('/api/users', users)



app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));