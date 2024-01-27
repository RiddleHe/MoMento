import {NextResponse} from "next/server";

import {OpenAI} from "openai";
import {StreamingTextResponse} from "ai";

export async function POST(
    request: Request,
) {
    try {
        const {prompt} = await request.json();
        const openai = new OpenAI();
        const userPrompt = `
        
        User: "${prompt}"
        
        
        `
        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a diligent study buddy. You are helping your friend revise their notes or codes."},
                {"role": "user", "content": prompt}],
            model: "gpt-3.5-turbo",
        });

        const response = completion.choices[0].message.content;

        var Readable = require("stream").Readable;
        let s = new Readable();
        s.push(response);
        s.push(null);

        return new StreamingTextResponse(s);

    } catch (error) {
        console.log("[Chat Post]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}