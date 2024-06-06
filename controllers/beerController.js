const beerModel = require("../models/beerModel");

// Get all beers
exports.getAllBeers = (req, res) => {
  beerModel.getAllBeers((err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

// Get beer by ID
exports.getBeerById = (req, res) => {
  beerModel.getBeerById(req.params.id, (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(404).send("Beer not found");
    res.json(row);
  });
};

// Create a new beer
exports.createBeer = (req, res) => {
  beerModel.createBeer(req.body, (err, newBeer) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(newBeer);
  });
};

// Update a beer
exports.updateBeer = (req, res) => {
  beerModel.updateBeer(req.params.id, req.body, (err, updatedBeer) => {
    if (err) return res.status(500).send(err.message);
    res.json(updatedBeer);
  });
};

// Delete a beer
exports.deleteBeer = (req, res) => {
  beerModel.deleteBeer(req.params.id, (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(204).send();
  });
};
