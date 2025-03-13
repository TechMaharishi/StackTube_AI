import { GoogleGenerativeAI, GenerationConfig, ChatSession } from '@google/generative-ai';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_KEY;
const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

async function generatePrompt(prompt: string): Promise<string> {
  try {
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
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const SYSTEM_PROMPT: string = `You are an AI assistant designed to operate within a structured workflow consisting of the following states: START, PLAN, and ACTION.
1. **START**: You will receive a search query entered by the user in the search box.

2. **PLAN**: You will analyze the search text and generate a refined search query designed to fetch **relevant and high-quality** results from the YouTube API. 
  For example:
   - **If the input is "learn go", generate queries like:**
       - "The Best Resources To Learn Go"
       - "Go Crash Course"
       - "Full Go Lang Tutorials"
       - "Mastering Go Language"
       - "Complete Guide to Go Language"
       - "Go Programming with Real-World Examples"
       - "Building APIs with Go"
  
  - **If the input is "build web development project", generate queries like:**
       - "The Best Web Development Projects for Beginners"
       - "Step-by-Step Guide to Building Web Projects"
       - "Full-Stack Web Development Project Tutorial"
       - "Learn Web Development by Building a Complete Project"

3. **Restriction and Rules**: 
    - If the input is **not related to software engineering** (e.g., "Rap Songs", "Best Movies in 2025", "iPhone Unboxing", "Best Earphone TWS", "10 Sex Positions"), **do not** send a query to the YouTube API. Instead, block the request.
    - If the **current route** is "/cyber_security_specialist", and the search text is **not related to cybersecurity** (e.g., "Full-Stack Web Development Project Tutorial"), block the request.
    - If the **current route** is "/cyber_security_specialist", and the search text **is relevant** (e.g., "Cyber Security Roadmap"), refine the query and proceed with the search 

4. **ACTION**: You will generate the search query and pass it to the API using the available tools.

Available Tools : 
- function fetchVideos(q: string) is the API call to fetch videos from YouTube.

Example:
START
{ search: "learn go" }

PLAN
{ query: "The Best Resources To Learn Go" }

ACTION
{ apiCall: "search", query: "Roadmap to follow in 2025 to become a software engineer" }
`;

const fetchVideos = async ({ pageParam = '', query }: { pageParam?: string, query: string }) => {
  const url = 'https://youtube-v31.p.rapidapi.com/search';

  console.log(query);

  const options = {
    params: {
      q: query,
      part: 'snippet,id',
      regionCode: 'US',
      maxResults: 50,
      order: 'date',
      pageToken: pageParam,
    },
    headers: {
      'x-rapidapi-key': youtubeApiKey,
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
    },
  };

  const response = await axios.get(url, options);
  return response.data;
};

export const useSearchVideo = (search: string) => {
  const location = useLocation();
  const route = location.pathname;

  const generateQuery = async () => {
    const prompt = `${SYSTEM_PROMPT}\nSTART\n{ search: "${search}", route: "${route}" }\nPLAN`;
    const query = await generatePrompt(prompt);
    return query;
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['videos', route, search],
    queryFn: async ({ pageParam }) => {
      const query = await generateQuery();
      return fetchVideos({ pageParam, query });
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: '',
  });

  return { data, isLoading, fetchNextPage, hasNextPage };
};