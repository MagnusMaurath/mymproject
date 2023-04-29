const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { sequelize } = require("../modernDBConnection");
//const { Entry } = require("../models/Entry");
//const { User } = require("../models/User");
const db = require("../models");
const { Op } = require("sequelize");
//const { Category } = require("../models/Category");

const Contract = db.contracts;






exports.getContracts = (req, res, next) => {
  const userId = req.params.userId;
  //const entry = await Entry.create({ name: "test", preis: 3, datum: "2023-03-03"});
  Contract.findAll({
    where: {
    userId: userId},
  }).then((contract) => {
    res.status(200).json({
      message: "CONTRACTS successfully fetched",

     contracts:contract,
    });
  });
};





/*
exports.getContracts = async (req, res) => {
  Contract.findAll({}).then((contracty) => {

    res.status(200).json({
      message: "categories successfully fetched",
      contracts: contract,
    });
  });
};
*/
