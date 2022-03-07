import db from '../db.js';

export async function postRentals(req, res) {
    const {
        customerId,
        gameId,
        daysRented
    } = req.body;

    try {
        
        const resultCustomer = await db.query(
            `SELECT * FROM customers WHERE id=$1`
        , [customerId]);

        if(resultCustomer.rowCount === 0) return res.sendStatus(400);

        const resultGame = await db.query (
            `SELECT * FROM games WHERE id=$1`
        , [gameId]);

        if (resultGame.rowCount === 0) return res.sendStatus(400);

        const resultRentals = await db.query(
            `SELECT * FROM rentals 
             WHERE "gameId"=$1
             AND "returnDate" IS NULL`
        ,[gameId]);

        if(resultRentals.rowCount >= resultGame.rows[0].stockTotal) {
            return res.status(400);
        }

        const originalPrice = resultGame.rows[0].pricePerDay * daysRented;

        await db.query(
            `INSERT INTO rentals
             ("customerId", "gameId", "rentDate", 
             "daysRented", "returnDate", 
             "originalPrice", "delayFee")
             VALUES 
             ($1, $2, NOW(), $3, NULL, $4, NULL )`
        ,[customerId, gameId, daysRented, originalPrice]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}