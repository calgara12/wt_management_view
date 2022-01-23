let cfg = require('../config.json');
const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        let decodedToken = jwt.verify(token, 'secret');
        let userName = decodedToken.user;
        let role = decodedToken.role;

        if(role !== "management") {
            res.send("Not a manager");
            console.log(role);
        } else {
            req.user = userName;
            req.role = role;
            next();
        }
    } catch (error) {
        res.status(401).json({messsage: "Authentication failed"});
        console.log(error);
    }
};