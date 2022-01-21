let cfg = require('./config.json');
const express = require('express');
const http = require('http');
const path = require('path');
const cors =  require('cors')


const app = express();
const port = process.env.PORT || 3001;
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/dist/managementView'));
app.use(cors({
    origin: '*'
}));

//routing
const tables = require('./routes/tables')
const users = require('./routes/users')
app.use('/api/tables', tables)
app.use('/api/users', users)





const categories = require('./routes/categories');
app.use('/api/categories', categories);

const menuItems = require('./routes/menu-items');
app.use('/api/menuItems', menuItems);

//const checkAuth = require('./routes/checkAuth');

//const login = require('./routes/login');
//app.use('/login', login);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));