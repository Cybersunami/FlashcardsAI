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


export async function POST(req) {
<<<<<<< Updated upstream
    const geminiAI = new GoogleGenerativeAI(process.env.API_KEY)
    //const model = await req.text()

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
            model: "text-davinci-003",
        })

        //parse the JSON centent from the api response (response will be a 'flashcards' array with objects 'front' and 'back')
        const flashcards = JSON.parse(response.generations[0].text)
=======
    try {
        const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = geminiAI.getGenerativeModel({model:'gemini-1.5-pro'})
        const data = await req.json()

        const userInput = data.text
        const prompt = `${systemPrompt}\n\nUser Input:\n${userInput}`


        const result = await model.generateContent(prompt)
        const response = result.response;

        const flashcards = response.candidates[0].content.parts[0].text

        return NextResponse.json({flashcards:flashcards})
>>>>>>> Stashed changes

    } catch (error) {
        console.log(error);
    }
}
