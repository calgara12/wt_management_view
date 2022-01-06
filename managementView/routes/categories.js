const express = require('express'), router = express.Router()
const pool = require('../pool.js');

router.get('/', async (req,res) => {                //view all categories
    let result = [];
    try {
        result = await pool.query('SELECT * FROM categories');
        res.status(200).json(result.rows);
    } catch(err) {
        res.status(500).send("Error");
    }
})

router.get('/:categoryId', async (req,res) => {     //get category by ID
    let result = [];
    try {
        const queryGetCategory = {text: 'SELECT * FROM categories WHERE id = $1', values: [req.params.categoryId]};
        result = await pool.query(queryGetCategory);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Error");
    }
})

router.post('/create', async (req,res) => {         //create category
    let result = [];
    try {
        const queryCreateCategory = {
            text: 'INSERT INTO categories(id, name, type_id) VALUES($1, $2, $3)',
            values: [req.body.id, req.body.name, req.body.type_id]
        };
        result = await pool.query(queryCreateCategory);
        res.status(200).send("Successfully created");
    } catch (error) {
        res.status(500).send("Error");
    }
})

router.put('/:categoryId', async (req,res) => {    //update category
    let result = [];
    try {
        const queryUpdate = {
            text: 'UPDATE categories SET name = $1, type_id = $2 WHERE id = $3', 
            values: [req.body.name,
                    req.body.type_id,
                    req.params.categoryId]
        };
        result = await pool.query(queryUpdate);
        res.status(200).send("Successfully updated");
    } catch (error) {
        res.status(500).send("Error");
    }
})

router.delete('/:categoryId', async (req, res) => {         //delete category
    let result = [];
    try {
        const queryDelete = {
            text: 'DELETE FROM categories WHERE id = $1',
            values: [req.params.categoryId]
        };
        result = await pool.query(queryDelete);
        res.status(200).send("Successfully deleted");
    } catch (error) {
        res.status(500).send("Error");
    }
})

module.exports = router;