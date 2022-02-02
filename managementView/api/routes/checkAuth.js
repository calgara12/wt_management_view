let cfg = require('../config.json');
const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        let decodedToken = jwt.verify(token, 'secret');
        let userName = decodedToken.user;
        let role = decodedToken.role;

        req.user = userName;
        req.role = role;
        if(req.baseUrl === '/api/users' && req.method === 'DELETE'){
            if(role !== "management") {
                     res.status(401).json("Unauthorized");
            }
            else{
                next()
            }
            
        }
        else{
            next();
        }

    } catch (error) {
        res.status(401).json({messsage: "Authentication failed"});
        console.log(error);
    }
};