const express = require("express");
const router = express();
const { sequelize } = require("../modernDBConnection");

const checkAuth = require("../middleware/check-auth");
const EntriesController = require("../controllers/entries");

//... /api/entries
router.post("",  EntriesController.createEntry);

router.get("", EntriesController.getEntries);

router.get(
  "/:userId/:selectedYear/:selectedMonth",
  checkAuth,
  EntriesController.getEntriesOfSelectedMonth
);

router.get(
  "/:userId/:selectedYear",
  checkAuth,
  EntriesController.getEntriesOfSelectedYear
);


router.get(
  "/contract/:userId/:contractId/:selectedYear",
  EntriesController.getEntriesOfContractOfYear
);

router.get("/month", EntriesController.getEntriesOfThisMonth);

//router.get("/year", EntriesController.getEntriesOfThisYear);

router.delete("/:id", checkAuth, EntriesController.deleteEntry);

router.get("/all", EntriesController.getAll);

//Category.findAll().then((category) => console.log(JSON.stringify(category)));

module.exports = router;
