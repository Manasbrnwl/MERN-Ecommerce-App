const express = require("express");
const formidable = require("express-formidable");
const middlewares = require("./../middlewares/authMiddlewares");
const requireSignIn = middlewares.requireSignIn;
const isAdmin = middlewares.isAdmin;
const controller = require("./../controllers/productController");
const createProductController = controller.createProductController;
const updateProductController = controller.updateProductController;
const getProductController = controller.getProductController;
const getSingleProductController = controller.getSingleProductController;
const deleteProductController = controller.deleteProductController;
const productPhotoController = controller.productPhotoController;
const productFilterController = controller.productFilterController;
const productCountController = controller.productCountController;
const productListController = controller.productListController;
const searchProductController = controller.searchProductController;
const relatedProductController = controller.relatedProductController;
const productCategoryController = controller.productCategoryController;
const braintreeTokenController = controller.braintreeTokenController;
const braintreePaymentController = controller.braintreePaymentController;

const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all product
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pId", productPhotoController);

//delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product
router.post("/filter-product", productFilterController);

//product count
router.get("/product-count", productCountController);

//produc per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pId/:cId", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

module.exports = router;
