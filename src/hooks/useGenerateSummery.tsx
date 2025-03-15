import { useQuery } from '@tanstack/react-query';
import { GoogleGenerativeAI, GenerationConfig, ChatSession } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_KEY;

async function generatePrompt(prompt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
    });

    const generationConfig: GenerationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const chatSession: ChatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();
    return responseText;
}

const SYSTEM_PROMPT: string = `  
You are an AI assistant. Your task is to rewrite YouTube video descriptions in a clear and simple manner, using 200 to 300 words to explain the content effectively.  
`;

export const useGenerateSummary = (description: string) => {
    const fetchSummary = async () => {
        if (!description) throw new Error("description is required.");
        const prompt = `${SYSTEM_PROMPT}\n\nSTART\n- YouTube URL: ${description}\n\nPLAN\n- Analyze the video content.\n\nACTION\n- Generate a summary.`;

        const generatedSummary = await generatePrompt(prompt);
        return generatedSummary;
    };

    const { data: summary, isLoading: loading, error } = useQuery({
        queryKey: ['summary', description],
        queryFn: fetchSummary,
        enabled: !!description,
    });

    return { summary, loading, error: error as Error | null };
};