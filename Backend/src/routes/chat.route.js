import { Router } from "express";
import { sendMessage, getChats, getMessages, deleteChat } from "../controllers/chat.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const chatRouter = Router();


/**
 * @route POST /api/chat/message
 * @desc Handle incoming chat messages
 * @access Private
 */
chatRouter.post("/message", verifyUser, sendMessage);

/**
 * @route GET /api/chats
 * @desc Get all chats for the authenticated user
 * @access Private
 */
chatRouter.get("/", verifyUser, getChats);

/**
 * @route GET /api/chats/:chatID/messages
 * @desc Get all messages for a specific chat
 * @access Private
 */
chatRouter.get("/:chatID/messages", verifyUser, getMessages);

/**
 * @route DELETE /api/chats/delete/:chatId
 * @desc Delete a specific chat and its messages
 * @access Private
 */
chatRouter.delete("/delete/:chatId", verifyUser, deleteChat);

export default chatRouter;