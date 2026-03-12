import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

export async function response() {
    model.invoke("What is capital of India?").then((res) => {
        console.log(res.text);
    })
}


