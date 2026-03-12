import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function verifyUser(req, res, next) {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Invalid token"
        });
    }

}