import { GoogleGenAI, Type } from "@google/genai";

// 封裝一個獲取 AI 實例的方法，避免在模組頂層直接執行可能失敗的邏輯
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing in environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

export async function generateGratitudeEcho(taskDescription: string): Promise<{ text: string; persona: string }> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `身為 ECHO 互助社群的語音回聲系統，請根據使用者的這項付出：「${taskDescription}」，生成一段溫暖、真誠且具有台灣在地語感的感謝詞。
      
      語境設定：
      1. 跨世代（長輩對年輕人）：語氣慈祥、帶點台灣人特有的熱情。
      2. 育兒支援（鄰居或家長互助）：語氣充滿感激、帶點如釋重負的感覺。
      3. 職場同儕：口吻自然、像好夥伴之間的肯定。
      
      請根據任務描述選擇最合適的人格。回應需像是一個真實的人（如：林太太、隔壁的小明、王奶奶）。
      限制：50 字以內，使用繁體中文。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "感謝詞內容，需口語化且溫馨。" },
            persona: { type: Type.STRING, description: "角色稱呼（如：三樓的王奶奶、研發部小傑）。" }
          },
          required: ["text", "persona"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No output from Gemini");
    }

    // 確保處理 JSON 字串時的安全
    const cleanedText = textOutput.trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("Gemini Error:", e);
    return {
      text: "真的非常感謝你的幫忙！這對我來說意義重大，有你這個鄰居/夥伴真好。",
      persona: "暖心的社群成員"
    };
  }
}