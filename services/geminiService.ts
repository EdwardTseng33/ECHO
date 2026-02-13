
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
      contents: `你現在是 ECHO 互助社群的「回聲系統」。你的任務是根據使用者輸入的「付出行為」，生成一段簡短、溫暖且極具「台灣人情味」的感謝語音腳本。
      
      使用者剛完成了這件事：「${taskDescription}」

      請從以下三種情境中選擇最適合的一個來回應：
      
      1. 【熱情長輩】(Persona: 巷口林阿姨、賣菜的王伯伯)
         - 語氣：親切、有點囉嗦但很溫暖、可能會用「阿姨跟你說」、「乖孫」、「真敖(台語語感)」。
         - 關鍵字：感恩、這好吃的給你、多謝啦。
      
      2. 【崩潰家長/鄰居】(Persona: 隔壁新手媽、三樓陳先生)
         - 語氣：如釋重負、感激涕零、像看到救星。
         - 關鍵字：神隊友、救了一命、下次請你喝飲料。
      
      3. 【職場/同儕】(Persona: 研發部小傑、坐隔壁的 Amy)
         - 語氣：簡潔有力、義氣、夥伴感。
         - 關鍵字：謝啦兄弟、Carry、超罩的。

      回應限制：
      - **繁體中文 (台灣用語)**。
      - 字數限制：**40 字以內** (越像語音訊息越好)。
      - 必須包含具體的情緒回饋，而不只是禮貌的道謝。

      請以 JSON 格式回傳：
      {
        "text": "感謝詞內容...",
        "persona": "角色名稱"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "口語化的感謝內容" },
            persona: { type: Type.STRING, description: "角色設定" }
          },
          required: ["text", "persona"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No output from Gemini");
    }

    const cleanedText = textOutput.trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("Gemini Error:", e);
    // Fallback if API fails
    return {
      text: "真的太感謝你了！這個幫忙對我來說很重要，有你當鄰居真好。",
      persona: "ECHO 社群夥伴"
    };
  }
}
