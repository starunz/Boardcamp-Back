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

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}