import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

/** * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username: String, email: String, password: String }
 */
export async function registerController(req, res) {
    const { username, email, password } = req.body;

    const isEmailExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (isEmailExists) {
        return res.status(400).json({
            message: "Email or username already exists",
            success: false,
            err: "Email or username already exists"
        });
    }

    const user = await userModel.create({
        username, email, password
    });

    const emailVerficationToken = jwt.sign({
        email: user.email
    },
        process.env.JWT_SECRET, { expiresIn: "3h" }
    )

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `<h2>Welcome to <strong>Perplexity</strong>, ${username}!</h2>
                <p>Thank you for registering. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerficationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br/>The Perplexity Team</p>`,
    });

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email: String, password: String }
 */
export async function loginController(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    }).select("+password");

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "Invalid email or password"
        });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "Invalid email or password"
        });
    }
    if (!user.verified) {
        return res.status(400).json({
            message: "Please verify your email address before logging in",
            success: false,
            err: "Email not verified"
        });
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }

    });
}

export async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        });
    }

    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    });
}

/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token: String }
 */
export async function verifyEmailController(req, res) {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "Invalid token"
            });
        }

        user.verified = true;
        await user.save();

        const html = `<h2>Email Verified Successfully!</h2>
                    <p>Thank you for verifying your email address. Your account is now active.</p>
                    <p>You can now log in to your account and start using Perplexity.</p>
                    <a href="http://localhost:3000/api/auth/login">Go to Login</a>
                    <p>Best regards,<br/>The Perplexity Team</p>`;

        return res.send(html);

    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: "Invalid or expired token"
        });
    }
}
