const express = require("express");
const controller = require("./../controllers/authController");
const registerController = controller.registerController;
const loginController = controller.loginController;
const testController = controller.testController;
const getOrdersController = controller.getOrdersController;
const getAllOrdersController = controller.getAllOrdersController;
const forgotPasswordController = controller.forgotPasswordController;
const updateProfileController = controller.updateProfileController;
const orderStatusController = controller.orderStatusController;
const middlewares = require("./../middlewares/authMiddlewares");
const requireSignIn = middlewares.requireSignIn;
const isAdmin = middlewares.isAdmin;

//router object
const router = express.Router();

//routing
//Register || Method Post
router.post("/register", registerController);

//LOGIN || Method Post
router.post("/login", loginController);

//Forget password || Method Post
router.post("/forgot-password", forgotPasswordController);

//test routes || Method Get
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth || Method Get
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth || Method Get
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
