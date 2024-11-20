import express from "express";
import { forgotPassword, getUser, getUserForPotrfolio, login, logout, register, resetPassword, updatePassword, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated,getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/pwd", isAuthenticated, updatePassword);
router.get("/me/portfoilo", getUserForPotrfolio);
router.post("/forgot/password", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;