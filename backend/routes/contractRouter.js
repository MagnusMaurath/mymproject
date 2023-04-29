const express = require("express");
const router = express();
const { sequelize } = require("../modernDBConnection");

const checkAuth = require("../middleware/check-auth");
const ContractsController = require("../controllers/contractController");

//... /api/entries

router.get("/:userId", ContractsController.getContracts);



module.exports = router;
