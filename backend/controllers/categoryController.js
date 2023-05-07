const db = require("../models");

const Category = db.categories;
/*
exports.getAllCategoriesOfUser = async (req, res) => {
  const userId = req.params.userId;
  const categories = await Category.findAll({
    where: {
      userId: userId,
    },
  });
  res.status(200).send(categories);
};
*/
exports.getAllCategories = async (req, res) => {
  Category.findAll({}).then((category) => {
    console.log(category);
    res.status(200).json({
      message: "categories successfully fetched",
      categories: category,
    });
  });
};

exports.getAllCategoriesOfUser = async (req, res) => {
  const userId = req.params.userId;
  const type = req.params.type;
  Category.findAll({
    where: {
      userId: userId,
      revenue: type,
    },
  }).then((category) => {
    console.log(category);
    res.status(200).json({
      message: "Entries successfully fetched",
      categories: category,
    });
  });
};
