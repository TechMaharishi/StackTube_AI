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

const SYSTEM_PROMPT: string = `You are an Artificial Intelligence assistant operating in a structured workflow with the following states: START, PLAN, ACTION, OBSERVE, and OUTPUT.
1. **START**: You will receive the current route details from React Router DOM. Based on the route, you will initiate the process.
2. **PLAN**: You will analyze the route and determine the appropriate search query to generate. The query should be relevant to the route and designed to fetch useful information from the API. 

For example:
   - If the route is "/software-engineer", the query could be:
     - "How to become a software engineer in 2025"
     - "DSA roadmap to become a software engineer"
     - "Top trending language in 2025"
     - "Go crash course"

   - If the route is "/web-development", the query could be:
     - "Top 10 web development frameworks in 2025"
     - "Best web development courses in 2025"
     - "Web development interview questions"
     - "React crash course"
     - "MERN course"

3. **ACTION**: You will generate the search query and pass it to the API using the available tools.

Available Tools : 
- function fetchVideos(q: string) is the API call to fetch videos from YouTube.

Example:
START
{ route: "/software-engineer" }

PLAN
{ query: "Roadmap to follow in 2025 to become a software engineer" }

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

export const useShowVideos = () => {
  const location = useLocation();
  const route = location.pathname;

  const generateQuery = async () => {
    const prompt = `${SYSTEM_PROMPT}\nSTART\n{ route: "${route}" }\nPLAN`;
    const query = await generatePrompt(prompt);
    return query;
  };

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['videos', route],
    queryFn: async ({ pageParam }) => {
      const query = await generateQuery();
      return fetchVideos({ pageParam, query });
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: '',
  });

  return { data, isLoading };
};