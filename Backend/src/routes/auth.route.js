import { Router } from "express";
import { registerController, verifyEmailController, loginController, getMeController } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username: String, email: String, password: String }
 */
authRouter.post("/register", registerValidator, registerController);

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email: String, password: String }
 */
authRouter.post("/login", loginValidator, loginController);

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's details
 * @access Private
 */
authRouter.get("/get-me", verifyUser, getMeController);

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token: String }
 */
authRouter.get("/verify-email", verifyEmailController)

export default authRouter;