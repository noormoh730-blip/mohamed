
import { GoogleGenAI, Type } from "@google/genai";
import type { ClassificationResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "التصنيف يجب أن يكون واحدًا من: 'مرتفع'، 'منخفض'، أو 'طبيعي'",
    },
    advice: {
      type: Type.STRING,
      description: "نصيحة موجزة ومفيدة بناءً على التصنيف باللغة العربية",
    },
  },
  required: ['classification', 'advice'],
};

export async function classifyBloodSugar(reading: number): Promise<ClassificationResult> {
  try {
    const prompt = `أنت مساعد طبي متخصص في مرض السكري. استلم قراءة سكر الدم التالية بالملليغرام/ديسيلتر لشخص بالغ. قم بتصنيفها إلى 'مرتفع' أو 'منخفض' أو 'طبيعي'. قدم نصيحة طبية عامة وموجزة ومفيدة بناءً على هذا التصنيف. يجب أن تكون الإجابة بتنسيق JSON فقط. القراءة هي: ${reading} mg/dL`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation to ensure the result matches the expected structure
    if (result.classification && result.advice) {
        return result as ClassificationResult;
    } else {
        throw new Error("Invalid response structure from API");
    }

  } catch (error) {
    console.error("Error classifying blood sugar:", error);
    throw new Error("فشل في تحليل قراءة السكر. يرجى المحاولة مرة أخرى.");
  }
}
