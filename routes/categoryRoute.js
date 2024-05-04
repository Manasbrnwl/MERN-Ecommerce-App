const express = require("express");
const middlewares = require("./../middlewares/authMiddlewares");
const requireSignIn = middlewares.requireSignIn;
const isAdmin = middlewares.isAdmin;
const isUser = middlewares.isUser;
const controller = require("./../controllers/categoryController");
const createCategoryController = controller.createCategoryController;
const updateCategoryController = controller.updateCategoryController;
const getCategoryController = controller.getCategoryController;
const getSingleCategoryController = controller.getSingleCategoryController;
const deleteCategoryController = controller.deleteCategoryController;

const router = express.Router();

//routes
//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category
router.get("/get-category", getCategoryController);

//get single category
router.get("/get-category/:slug", getSingleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
