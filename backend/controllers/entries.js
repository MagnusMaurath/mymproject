const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

const Entry = db.entries;
const Category = db.categories;
const User = db.users;
const Contract = db.contracts;

exports.createEntry = (req, res, next) => {
  //const entry = Entry.create({ name: "test", preis: 3, datum: "2023-03-03"});

  const entry = req.body;

  console.log(entry);
  //const userId = req.params.userId;
  /*
  Entry.create(entry)
  .then(() => {
    res.status(201).json({
      message: "Entry added successfully"
    });
  })
  .catch(error => {
    console.error("Error creating entry", error);
    res.status(500).json({
      message: "Error creating entry"
    });
  });
*/


};












/*exports.getEntries = (req, res, next) => {
  //const entry = await Entry.create({ name: "test", preis: 3, datum: "2023-03-03"});
  Entry.findAll({
    // where: { user_id: 25 },
    where: { name: "DM" },
  }).then((entry) => {
    Category.findAll({}).then((category) => {
      res.status(200).json({
        message: "Entries successfully fetched",
        categories: category,
        entries: entry,
      });
    });
  });
};*/
exports.getEntries = (req, res, next) => {
  //const entry = await Entry.create({ name: "test", preis: 3, datum: "2023-03-03"});
  Entry.findAll({
    // where: { user_id: 25 },
    where: { name: "DM" },
  }).then((entry) => {
    res.status(200).json({
      message: "Entries successfully fetched",
      entries: entry,
    });
  });
};

const currentMonth = new Date().getMonth() + 1;


exports.getEntriesOfThisMonth = (req, res, next) => {
  //const entry = await Entry.create({ name: "test", preis: 3, datum: "2023-03-03"});
  Entry.findAll({
    // where: { user_id: 25 },
    where: {
      datum: {
        [Op.and]: [
          { [Op.gte]: `${new Date().getFullYear()}-${currentMonth}-01` },
          { [Op.lt]: `${new Date().getFullYear()}-${currentMonth + 1}-01` },
        ],
      },
    },
  }).then((entry) => {
    res.status(200).json({
      message: "Entries successfully fetched",

      entries: entry,
    });
  });
};

const currentYear = new Date().getFullYear();
exports.getEntriesOfSelectedYear = (req, res, next) => {
  const selectedYear = req.params.selectedYear;
  const userId = req.params.userId;
  const startDate = new Date(`${selectedYear}-01-01`);
  const endDate = new Date(`${selectedYear}-12-31`);
  Entry.findAll({
    where: {
      datum: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
      userId: userId,
    },
    include: [
      {
        model: Category,
        as: "category",
      },
      {
        model: Contract,
        as: "contract",
      },
    ],
  }).then((entries) => {
    res.status(200).json({
      message: "Entries successfully fetched",
      entries: entries,
    });
  });
};

//---------------------------------------------------------------------------------------------
exports.getEntriesOfSelectedMonth = (req, res, next) => {
  const selectedYear = req.params.selectedYear;
  const selectedMonth = req.params.selectedMonth;
  const userId = req.params.userId;
  const today = new Date();
  const timezoneOffsetInMs = today.getTimezoneOffset() * 60 * 1000;
  const startDate = new Date(
    Date.UTC(selectedYear, selectedMonth - 1, 1) - timezoneOffsetInMs
  ).toISOString();
  const endDate = new Date(
    Date.UTC(selectedYear, selectedMonth, 1) - timezoneOffsetInMs
  ).toISOString();
  req.query;
  Entry.findAll({
    where: {
      datum: {
        [Op.and]: [{ [Op.gte]: startDate }, { [Op.lt]: endDate }],
      },
      userId: userId,
    },
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
  }).then((entry) => {
    console.log(entry);
    res.status(200).json({
      message: "Entries successfully fetched",
      entries: entry,
    });
  });
};
//---------------------------------------------------------------------------------------------
exports.getEntriesOfContractOfYear= (req, res, next) => {
  const selectedYear = req.params.selectedYear;
  const userId = req.params.userId;
  const contractId = req.params.contractId;
  const startDate = new Date(selectedYear, 0, 1); // 1. Januar des Jahres
  const endDate = new Date(selectedYear, 11, 31); // 31. Dezember des Jahres

  Entry.findAll({
    where: {
      datum: {
        [Op.between]: [
          startDate,
          endDate
        ]
      },
      userId: userId,
      contractId: contractId,
    },
    include: [
      {
        model: Contract,
        as: "contract",
      },
    ],
  }).then((entry) => {
    console.log(entry);
    res.status(200).json({
      message: "Entries successfully fetched",
      entries: entry,
    });
  });
};

exports.deleteEntry = async (req, res, next) => {
  const idToDelete = req.params.id; // ersetzen Sie 1 durch die ID des Eintrags, den Sie löschen möchten
  const userId = req.userData.userId;
  try {
    const deletedEntry = await Entry.destroy({
      where: {
        id: idToDelete,
        user_id: userId,
      },
    });

    if (deletedEntry) {
      console.log(`Eintrag mit der ID ${idToDelete} wurde gelöscht`);
      res.status(200).send(`Eintrag mit der ID ${idToDelete} wurde gelöscht`);
    } else {
      console.log(
        `Eintrag mit der ID ${idToDelete} konnte nicht gefunden werden`
      );
      res
        .status(404)
        .send(`Eintrag mit der ID ${idToDelete} konnte nicht gefunden werden`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Fehler beim Löschen des Eintrags");
  }
};

exports.getAll = async (req, res) => {
  const entries = await Entry.findAll({
    where: {
      user_id: 25,
    },
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
  });
  res.status(200).send(entries);
};
