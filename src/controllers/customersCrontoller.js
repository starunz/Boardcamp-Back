import db from '../db.js';

export async function getCustomers(req, res) {
    const { cpf } = req.query;
    
    let query = `SELECT * FROM customers`
    let params = [];

    try {
        
        if(cpf) {
            params.push(`${cpf}%`);

            query  += `WHERE cpf ILIKE $1`
        }

        const result = await db.query(`${query}`, params);
            
        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postCustomers(req, res) {
    const {
        name,
        phone,
        cpf,
        birthday
    } = req.body;

    try {

        const resultCpf = await db.query(
            `SELECT * FROM customers WHERE cpf=$1`
        , [cpf]);

        if(resultCpf.rowCount > 0) return res.sendStatus(409);

        await db.query(
            `INSERT INTO customers 
            (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)`
        , [name, phone, cpf, birthday]);
        
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error)
    }
}