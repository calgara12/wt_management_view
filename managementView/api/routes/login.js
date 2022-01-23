const express = require('express'), router = express.Router();

const pool = require('../pool.js');
const jwt = require('jsonwebtoken');

router.post('/', async(req,res) => {
    let result = [];

    if(req.body === null) {
        res.status(400).send("Body cannot be empty");
    }

    try {
        let userName = req.body.user;
        let userPass= req.body.pass;

        if(userName === null || userPass === null || userName === "" || userPass === "") {
            res.status(400).send("Username or password cannot be empty");
            return;
        }


        result = await pool.query({
            text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
            values: [userName, userPass]
        });

        if(result.rowCount !== 1) {
            res.status(400).send("Username or Password is incorrect!");
            return;
        }

        let user = result.rows[0];
        let roleId = user.role_id;
        console.log(user.role_id);
        result = await pool.query({
            text: 'SELECT * FROM roles WHERE id = $1',
            values: [roleId]
        });
        let roleName = result.rows[0].name;
        console.log(roleName);
        const token = jwt.sign({user: userName, role: roleName}, "secret", {expiresIn: 60*60});
        res.status(200).json({
            message: "Login successful",
            user: userName,
            role: roleName,
            token: token,
        });

    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
        return;
    }
});

module.exports = router;