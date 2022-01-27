const express = require('express'), router = express.Router();
const pool = require('../pool.js');

router.get('/', async (req,res) => {            //view all menu items
    let result = [];
    try {
        result = await pool.query('SELECT * FROM menu_items ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch(err) {
        res.status(500).send("Error");
    }
    
})

router.get('/:menuItemId', async (req,res) => {     //get menu item by ID
    let result = [];
    try {
        const queryGetMenuItemById = {
            text: 'SELECT * FROM menu_items WHERE id = $1 ORDER BY id ASC',
            values: [req.params.menuItemId]
        };
        result = await pool.query(queryGetMenuItemById);
        console.log(result.rowCount);

        if(result.rowCount < 1) {
            res.status(404).send("Menu Item with ID = " + req.params.menuItemId + " does not exist");
            return;
        }
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Error")
    }
})

router.post('/create', async (req,res) => {         //create menu item
    let result = [];

    if(req.body === null) {
        res.status(400).send("Request body is empty");
        return;
    }
    try {
        let newMenuItem = req.body;
        /*result = await pool.query('SELECT * FROM menu_items');
        let newMenuItemId = 0;
        for (let i = 0; i < result.rowCount; i++) {
            if(newMenuItemId < result.rows[i].id) {
                newMenuItemId = ++result.rows[i].id;
            }
            
        }*/

        if(newMenuItem.id) {
            let checkMenuItemId = await pool.query({
                text: 'SELECT * FROM menu_items where id = $1',
                values: [newMenuItem.id]
            });

            if(checkMenuItemId.rows.length > 0) {
                re.status(400).send("Menu Item with ID = " + newMenuItem.id + " already exists");
                return;
            }
        }
        const queryCreateMenuItem = {
            text:'INSERT INTO menu_items(title, description, price, category_ids, allergens) VALUES ($1, $2, $3, $4, $5)',
            values: [req.body.title, req.body.desc, req.body.price, req.body.categoryId, req.body.allergens]
        };
        result = await pool.query(queryCreateMenuItem);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
    }
})

router.put('/:menuItemId', async (req,res) => {     //update menu item
    let result = [];
    try {
      const queryGetMenuItemById = {
          text: 'SELECT * FROM menu_items WHERE id = $1',
          values: [req.params.menuItemId]
      };

      result = await pool.query(queryGetMenuItemById);
      
      if(result.rows.length < 1) {
        res.status(404).send("Menu Item with ID = " + req.params.menuItemId + " not found");
        return;
    }

      let currentMenuItem = result.rows;
      console.log(currentMenuItem);
      let newId = req.body.id != null ? req.body.id : currentMenuItem[0].id;
      let title = req.body.title != null ? req.body.title : currentMenuItem[0].title;
      let desc = req.body.desc != null ? req.body.desc : currentMenuItem[0].description;
      let price = req.body.price != null ? req.body.price: currentMenuItem[0].price;
      let categoryId = req.body.categoryId != null ? req.body.categoryId : currentMenuItem[0].category_ids;
      let allergens = req.body.allergens != null ? req.body.allergens : currentMenuItem[0].allergens;

      const queryUpdateMenuItem = {
          text:'UPDATE menu_items SET id = $1, title = $2, description = $3, price = $4, category_ids = $5, allergens = $6 WHERE id = $7',
          values: [newId, title, desc, price, categoryId, allergens, req.params.menuItemId]
      };
      result = await pool.query(queryUpdateMenuItem);
      
      if(result.rowCount < 1) {
          res.status(400).send("No changes applied, make sure your request is different from the current item");
      } else {
          res.status(200).send("Changes applied");
      }

    } catch (error) {
        res.status(500).send("Error");
        console.log(error);
    }
})

router.delete('/:menuItemId', async (req,res) => {  //delete menu item
    let result = [];
    try {
        const queryDeleteMenuItem = {
            text: 'DELETE FROM menu_items WHERE id = $1',
            values: [req.params.menuItemId]
        };
        result = await pool.query(queryDeleteMenuItem);
        
        if(result.rowCount < 1) {
            res.status(500).send("No entry deleted");
            console.log(result);
        } else {
            res.status(200).send("Successfully deleted entry");
        }
    } catch (error) {
        res.status(500).send("Error");
    }
})

module.exports = router;