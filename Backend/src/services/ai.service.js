import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI, MistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MMISTRAL_API_KEY
});

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Use this tool to get the latest and relevant information from the internet",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet")
        })
    }
);

const agent = createAgent({
    model: mistralModel,
    tools: [searchInternetTool]
});



export async function generateResponse(messages) {

    const formattedMessages = [
        new SystemMessage(`
You are a helpful and precise assistant.
Use the "searchInternet" tool when needed.
If you don't know something, say you don't know.
        `),

        ...messages.map((msg) => {
            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            } else if (msg.role === "ai") {
                return new AIMessage(msg.content);
            }
        }).filter(Boolean) // ✅ removes undefined
    ];

    const response = await agent.invoke({
        messages: formattedMessages   // ✅ CORRECT FORMAT
    });

    return response.messages[response.messages.length - 1].content;
}

export async function generateChatTitle(message) {
    // Implementation for generating chat title

    const response = await mistralModel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise chat titles based on the conversation.
            
        user will provide a message, and you will generate a short title that captures the essence of the conversation. The title should be no more than 4 words and should be relevant to the content of the message.
            `),

        new HumanMessage(`Generate a chat title for the following message: "${message}"`)
    ]);

    return response.text;
}


