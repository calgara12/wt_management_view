const express = require('express'), router = express.Router()
const { async } = require('rxjs');
const pool = require('../pool.js');

router.get('/', async (req,res) => {                //view all categories
    let result = [];
    try {
        result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch(err) {
        res.status(500).send("Error");
    }
})

router.get('/type', async (req,res) => {    //get type
    let result = [];
    try {
        result = await pool.query('SELECT * FROM type');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Error");
    }
    
})

router.get('/:categoryId', async (req,res) => {     //get category by ID
    let result = [];
    try {
        const queryGetCategoryById = {
            text: 'SELECT * FROM categories WHERE id = $1',
            values: [req.params.categoryId]
        };
        result = await pool.query(queryGetCategoryById);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Error");
    }
})

router.post('/create', async (req,res) => {         //create category
    let result = [];
    if(req.body === null) {
        res.status(400).send("Request Body is empty");
        return;
    }

    try {
        let newCategory = req.body;
        /*result = await pool.query('SELECT * FROM categories');
        let newCategoryId = 0;

        for (let i = 0; i < result.rowCount; i++) {
            console.log(result.rows[i].id)
            if(newCategoryId < result.rows[i].id) {
                newCategoryId = ++result.rows[i].id;
            }  
        }*/
        if(newCategory.id) {
            let checkCategoryId = await pool.query({
                text: 'SELECT * FROM categories WHERE id = $1',
                values: [newCategory.id]
            });
            if(checkCategoryId.rows.length > 0) {
                res.status(400).send("Category with ID =" + newCategory.id + " already exists");
                return;
            }
        }
        const queryCreateCategory = {
            text: 'INSERT INTO categories(name, type_id) VALUES($1, $2)',
            values: [req.body.name, req.body.type_id]
        };
        result = await pool.query(queryCreateCategory);
        res.status(200).send("Successfully created");
    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
    }
})

router.put('/:categoryId', async (req,res) => {    //update category
    let result = [];
    try {
        const queryGetCategoryById = {
            text: 'SELECT * FROM categories WHERE id = $1',
            values: [req.params.categoryId]
        };
        result = pool.query(queryGetCategoryById);
        if(result.rows < 1) {
            res.status(404).send("Category with ID = " + req.params.categoryId + " not found");
            return;
        }
        console.log(result.rows);
        console.log(result)
        let currentCategory = result.rows;
        let type_id = req.body.type_id != null ? req.body.type_id : currentCategory[0].type_id;
        let name = req.body.name != null ? req.body.name : currentCategory[0].name;

        const queryUpdate = {
            text: 'UPDATE categories SET name = $1, type_id = $2 WHERE id = $3', 
            values: [name, type_id, req.params.categoryId]
        };
        result = await pool.query(queryUpdate);
        if(result.rowCount < 1) {
            res.status(400).send("No changes applied")
        } else {
            res.status(200).send("Successfully updated");
        }
    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
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

        if(result.rowCount < 1) {
            res.status(400).send("No entry deleted");
        } else {
            res.status(200).send("Successfully deleted entry");
        }
    } catch (error) {
        res.status(500).send("Error");
    }
})



module.exports = router;