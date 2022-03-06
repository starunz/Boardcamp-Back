import db from '../db.js';

export async function getGames(req, res) {
    const { name } = req.query;

    let query = `
        SELECT games.*, 
        categories.name AS "categoryName" 
        FROM games 
        JOIN categories 
        ON games."categoryId" = categories.id
    `
    let params = [];
    
    try {
  
        if (name) {
            params.push(`${name}%`);

            const resultName = await db.query(
                query += `WHERE (games.name) ILIKE ($1)`
            , params);

            return res.send(resultName.rows);
        }

        const result = await db.query(`${query}`);
        
        res.send(result.rows);
    } catch (error) {
      res.status(500).send(error);
      console.log(error)
    }
}

export async function generateGames(req, res) {
    const { 
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay

    } = req.body;
  
    try {

        const resultCategoryId = await db.query(
            `SELECT * FROM categories WHERE id=$1`
        , [categoryId]);

        if(resultCategoryId.rowCount === 0) return res.sendStatus(400);
        
        const resultName = await db.query(
            `SELECT * FROM games WHERE name=$1`
        , [name]);

        if(resultName.rowCount > 0) return res.sendStatus(409);

        await db.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
                VALUES ($1, $2, $3, $4, $5);`
        , [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error);
    }
}