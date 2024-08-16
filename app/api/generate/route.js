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
    const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const data = await req.text();

    const prompt = {
        message: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data },
        ],
    }

    try {
        const response = await geminiAI.predict({
            prompt: prompt,
            model: 'gemini-1.5-pro',
        })


        //parse the JSON centent from the api response (response will be a 'flashcards' array with objects 'front' and 'back')
        const flashcards = JSON.parse(response.generations[0].text)

        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error(error)
    }
}