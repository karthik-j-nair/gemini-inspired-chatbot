import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MMISTRAL_API_KEY
});

export async function generateResponse(messages) {

    const response = await geminiModel.invoke(messages.map((msg)=>{
        if(msg.role == "user") {
           return new HumanMessage(msg.content)
        }
        else if (msg.role == "ai"){
            return new AIMessage(msg.content)
        }

    }));

    return response.text;
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


