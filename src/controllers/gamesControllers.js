import db from '../db.js';

export async function getGames(req, res) {

    try {
  
      const result = await db.query(`SELECT * FROM games`);
      
      res.send(result.rows);
    } catch (error) {
      res.status(500).send(error);
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

        await db.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
                VALUES ($1, $2, $3, $4, $5);`
        , [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error);
    }
}