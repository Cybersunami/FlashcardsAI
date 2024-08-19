// route for the google gemini api

import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai';
 
// defining the system prompt that will instruct AI on how to create the flashcards
const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both the front and abck of the card should be one sentence long.
You should return in the following JSON format:
{
    "flashcards":[
        {
            "front": "Front of the card",
            "back": "Back of the card"
        }
    ]
}
`

// processes the API response and returns the flashcards
export async function POST(req) {
    try {
        const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = geminiAI.getGenerativeModel({model:'gemini-pro'})
        const data = await req.json()

        const userText = data.text
        const prompt = `${systemPrompt}\n\nUser Input:\n${userText}`


        const result = await model.generateContent(prompt)
        const response = result.response;

        const output = response.candidates[0].content.parts[0].text

        return NextResponse.json({output:output})
    } catch (error) {
        console.log(error);
    }
}