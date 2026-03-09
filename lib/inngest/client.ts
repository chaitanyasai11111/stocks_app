import {Inngest} from "inngest";

export const inngest = new Inngest({
    id: 'stocksapp',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } },
})