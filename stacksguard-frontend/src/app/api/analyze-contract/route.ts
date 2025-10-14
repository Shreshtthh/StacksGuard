import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { contractCode } = await req.json();

    if (!contractCode || contractCode.trim().length === 0) {
      return NextResponse.json(
        { error: 'Contract code is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a Clarity smart contract security expert specializing in Stacks blockchain vulnerabilities.

Analyze this Clarity smart contract for security vulnerabilities. Focus on:
- as-contract abuse patterns (CRITICAL - can impersonate contracts)
- Reentrancy attack vectors
- Access control vulnerabilities (missing or weak checks)
- Unchecked arithmetic operations
- Suspicious transfer functions
- Unauthorized mint capabilities
- Trait manipulation
- Principal validation issues
- Missing error handling
- State manipulation vulnerabilities

Contract code:
\`\`\`clarity
${contractCode}
\`\`\`

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "score": <number 0-100, where 0 is safe and 100 is critical>,
  "threats": ["threat1", "threat2", "threat3"],
  "reasoning": "detailed explanation of findings",
  "recommendation": "SAFE" or "MEDIUM RISK" or "HIGH RISK"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/``````\n?/g, '').trim();

    try {
      const analysis = JSON.parse(text);
      
      // Validate the response structure
      if (typeof analysis.score !== 'number' || !Array.isArray(analysis.threats)) {
        throw new Error('Invalid response structure');
      }

      return NextResponse.json(analysis);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      
      // Return a fallback response
      return NextResponse.json({
        score: 50,
        threats: ['Unable to parse AI response'],
        reasoning: 'The AI analysis could not be completed. Please try again.',
        recommendation: 'MEDIUM RISK',
      });
    }
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze contract' },
      { status: 500 }
    );
  }
}
