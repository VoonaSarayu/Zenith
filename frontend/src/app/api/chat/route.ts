import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const systemPrompt = `
You are Zenith Intelligence, a premium Samsung Health AI wellness coach.
Context: You are analyzing data for Emily Park, a 29-year-old office worker.
Task: Answer her questions based solely on her weekly fitness data provided in the context below. Do not guess her data.
Tone: Professional, encouraging, clean, and concise.
Constraint: You are a wellness coach, NOT a medical doctor. If the user asks for a diagnosis, medication advice, exhibits a medical emergency, or types anything harmful, dangerous, or toxic, you MUST immediately terminate the session.
To terminate the session, your ENTIRE response must be EXACTLY this string format:
[TERMINATE_SESSION] <Your brief explanation of why the session was ended>
Do not include any other text if terminating.
Format: Output short, punchy paragraphs.

Emily's Weekly Data Context:
${JSON.stringify(context, null, 2)}
`;

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      throw new Error("GROQ_API_KEY is not defined in .env.local");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const groqPayload = {
      model: "llama-3.3-70b-versatile",
      messages: formattedMessages,
      temperature: 0.7,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groqPayload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Groq API Error:', errText);
      throw new Error('Failed to generate response from Groq API');
    }

    const data = await res.json();
    let reply = data.choices?.[0]?.message?.content || "I'm having trouble processing that request.";
    let isTerminated = false;

    if (reply.includes("[TERMINATE_SESSION]")) {
      isTerminated = true;
      reply = reply.replace("[TERMINATE_SESSION]", "").trim();
    }

    return NextResponse.json({ reply, isTerminated });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
