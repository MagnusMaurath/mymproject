const express = require("express");
const router = express();
const checkAuth = require("../middleware/check-auth");
const CategoryController = require("../controllers/categoryController");

//router.get("/test", CategoryController.getAllCategoriesOfUser);
router.get("", CategoryController.getAllCategories);
router.get(
  "/user/:userId/type/:type",
  checkAuth,
  CategoryController.getAllCategoriesOfUser
);
//Category.findAll().then((category) => console.log(JSON.stringify(category)));

module.exports = router;
