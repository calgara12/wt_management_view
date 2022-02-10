const express = require('express'), router = express.Router()
const pool = require('../pool.js');  // the database pool
const QRCode = require('qrcode')


router.get('/', async (req,res) => {
    let result = [];
    try{
        result = await pool.query('SELECT * FROM tables');
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }

    res.status(200).json(result.rows);
})

router.get('/:tableId', async (req,res) => {
    let result = [];
    try{
        const qGetTable = {
            text: 'SELECT * FROM tables WHERE id = $1',
            values: [req.params.tableId]
        }
        result = await pool.query(qGetTable);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.get('/:tableId/qrcode', async (req,res) => {
    let qrcode = "";
    try{
        const qGetTable = {
            text: 'SELECT * FROM tables WHERE id = $1',
            values: [req.params.tableId]
        }
        result = await pool.query(qGetTable);

        qrcode = await QRCode.toDataURL(`http://localhost:4200/guest/table/${result.rows[0].id}`)
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(qrcode);
})

router.post('/create', async (req,res) => {
    let result = [];
    try{

        const qCreate = {
            text: 'INSERT INTO tables(seats, location) VALUES($1, $2)',
            values: [req.body.seats,
                     req.body.location]
        }
        result = await pool.query(qCreate);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.put('/:tableId', async (req,res) => {
    let result = [];
    try{
        const qUpdate = {
            text: 'UPDATE tables SET seats = $1, location = $2 WHERE id=$3',
            values: [req.body.seats,
                     req.body.location,
                     req.params.tableId]
        }
        result = await pool.query(qUpdate);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})

router.delete('/:tableId', async (req,res) => {
    let result = [];
    try{
        const qDelete = {
            text: 'DELETE FROM tables WHERE id=$1',
            values: [req.params.tableId]
        }
        result = await pool.query(qDelete);
    }
    catch(err){
        res.status(500).send("This should not have happened!");
    }
    res.status(200).json(result.rows);
})
 
module.exports = router;

async function generateQRCode(seats, location){

    QRCode.toDataURL(`Seats: ${seats}, Location: ${location}`, function (err, url) {
        
        console.log(url)
        return url;
    })
}