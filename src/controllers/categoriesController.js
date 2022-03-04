import db from "../db.js";

export async function getCaterogies(req, res) {

  try {
    const result = await db.query(`SELECT * FROM categories`);

    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}
