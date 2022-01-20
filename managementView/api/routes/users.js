const express = require('express'), router = express.Router()
const pool = require('../pool.js');  // the database pool


router.get('/', async (req,res) => {
    let result = [];
    try{
        result = await pool.query('SELECT * FROM users');
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.get('/:userId', async (req,res) => {
    let result = [];
    try{
        const qGetuser = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [req.params.userId]
        }
        result = await pool.query(qGetuser);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.post('/create', async (req,res) => {
    let result = [];
    try{
        const qCreate = {
            text: 'INSERT INTO users(role_id, username, password) VALUES($1, $2, $3)',
            values: [req.body.role_id,
                     req.body.username,
                     req.body.password]
        }
        result = await pool.query(qCreate);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.put('/:userId', async (req,res) => {
    let result = [];
    try{
        const qUpdate = {
            text: 'UPDATE users SET role_id = $1, username = $2, password = $3 WHERE id=$4',
            values: [req.body.role_id,
                     req.body.username,
                     req.body.password,
                     req.params.userId]
        }
        result = await pool.query(qUpdate);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.delete('/:userId', async (req,res) => {
    let result = [];
    try{
        const qDelete = {
            text: 'DELETE FROM users WHERE id=$1',
            values: [req.params.userId]
        }
        result = await pool.query(qDelete);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})
 
module.exports = router;