const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.sqlite");

module.exports = {
  init: () => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS beers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        rating INTEGER DEFAULT 0
      )`);
    });
  },

  getAllBeers: (callback) => {
    db.all(`SELECT * FROM beers`, callback);
  },

  getBeerById: (id, callback) => {
    db.get(`SELECT * FROM beers WHERE id = ?`, [id], callback);
  },

  createBeer: (beer, callback) => {
    const { name, brand } = beer;
    db.run(
      `INSERT INTO beers (name, brand, rating) VALUES (?, ?, ?)`,
      [name, brand],
      function (err) {
        callback(err, { id: this.lastID, ...beer });
      }
    );
  },

  updateBeer: (id, beer, callback) => {
    const { name, brand, rating } = beer;
    db.run(
      `UPDATE beers SET name = ?, brand = ?, rating = ? WHERE id = ?`,
      [name, brand, id],
      function (err) {
        callback(err, { id, ...beer });
      }
    );
  },

  deleteBeer: (id, callback) => {
    db.run(`DELETE FROM beers WHERE id = ?`, [id], callback);
  },
};
