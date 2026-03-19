import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
    const { message, chat: chatID } = req.body;

    let chat = null, chatTitle = null;
    if (!chatID) {
        chatTitle = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title: chatTitle,
        });
    }

    const userMessage = await messageModel.create({
        chat: chatID || chat._id,
        content: message,
        role: "user"
    });

    const messages = await messageModel.find({ chat: chatID });

    const aiResponse = await generateResponse(messages);



    const aiMessage = await messageModel.create({
        chat: chatID || chat._id,
        content: aiResponse,
        role: "ai",
    });


    res.status(201).json({
        chatTitle: chatTitle,
        chat,
        aiMessage
    });
}

export async function getChats(req, res) {
    const userID = req.user.id;

    const chats = await chatModel.find({user: userID});

    res.status(200).json({
        message: "Chat fetched successfully",
        chats
    });
}

export async function getMessages(req, res) {
    const {chatID} = req.params;

    const chat = await chatModel.findOne({
        _id: chatID,
        user: req.user.id
    });

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        });
    }

    const messages = await messageModel.find({
        chat: chatID
    });

    res.status(200).json({
        message: "Message fetched successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    });

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        });
    }

    await messageModel.deleteMany({ chat: chatId });

    res.status(200).json({
        message: "Chat deleted successfully"
    });
}