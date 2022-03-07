import db from '../db.js';

export async function getRentals(req, res) {
    try {

        const result = await db.query(`SELECT * FROM rentals`)
        res.send(result.rows)
    } catch (error) {
        res.status(500).send(error)
    }
}

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

export async function returnRental(req, res) {
    const { id } = req.params;

    const returnDate = new Date().toISOString().split("T")[0];
    let delay = 0;

    try {

        const resultRental = await db.query(
            `SELECT * FROM rentals 
            WHERE id = $1`
        , [id]);

        if (resultRental.rowCount === 0) return res.sendStatus(404);

        if (resultRental.rows[0].returnDate !== null) return res.sendStatus(400);

        const resultGame = await db.query(
            `SELECT * FROM games 
            WHERE id = $1;`
        , [resultRental.rows[0].gameId]);

        if(new Date(returnDate).getTime < new Date()) {

            delay = (new Date(returnDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24) * resultGame.rows[0].pricePerDay;
        }

        await db.query(
            `UPDATE rentals
             SET
             "returnDate" = $1,
             "delay" = $2
             WHERE id = $3;`
        , [returnDate, delay, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteRental(req, res) {
    const { id } = req. params;

    try {

        const resultRental = await db.query(
            `SELECT * FROM rentals 
             WHERE id = $1`
        , [id]);

        if (resultRental.rowCount === 0) return res.sendStatus(404);

        if (resultRental.rows[0].returnDate !== null) return res.sendStatus(400);

        await db.query(
            `DELETE FROM rentals 
             WHERE id = $1`
        , [id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}