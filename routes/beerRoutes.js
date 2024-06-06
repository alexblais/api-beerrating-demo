const express = require("express");
const router = express.Router();
const beerController = require("../controllers/beerController");

router.get("/", beerController.getAllBeers);
router.get("/:id", beerController.getBeerById);
router.post("/", beerController.createBeer);
router.put("/:id", beerController.updateBeer);
router.delete("/:id", beerController.deleteBeer);

module.exports = router;
