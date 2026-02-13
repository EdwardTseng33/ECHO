
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateGratitudeEcho(taskDescription: string): Promise<{ text: string; persona: string }> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user just performed this act of kindness/support: "${taskDescription}". 
    Generate a warm, heartfelt, and culturally authentic Taiwanese gratitude message (Traditional Chinese).
    
    The scenario could be:
    1. Intergenerational (Elderly/Youth)
    2. Parenting (Neighbor helping with kids/parenting advice)
    3. Workplace (Colleagues supporting each other)
    
    Based on the task description, pick the most appropriate persona. 
    The response should sound like a real person (a busy mom, a thankful co-worker, a neighbor, etc.).
    Keep it under 60 words.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The gratitude message in Traditional Chinese." },
          persona: { type: Type.STRING, description: "A brief description of the role/persona (e.g., '雙寶媽林太太', '隔壁部門的小明', '王奶奶')." }
        },
        required: ["text", "persona"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result;
  } catch (e) {
    return {
      text: "真的非常感謝你的幫忙，這對我來說很有意義。有你真好！",
      persona: "暖心的夥伴"
    };
  }
}
