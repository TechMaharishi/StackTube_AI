import { GoogleGenerativeAI, GenerationConfig, ChatSession } from '@google/generative-ai';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_KEY;
const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

const fallbacks = {
  software_engineer: "Learn DSA (Data Structure and Algorithm)",
  web_developer: "Learn Full Stack Web Development",
  mobile_developer: "Learn Mobile App Development",
  cyber_security_specialist: "Learn Cybersecurity Fundamentals",
  ai_engineer: "Learn Artificial Intelligence and Machine Learning",
  data_scientist: "Learn Data Science and Analytics",
  cloud_engineer: "Learn Cloud Computing and AWS/Azure",
  devops_engineer: "Learn DevOps and CI/CD Pipelines",
  game_developer: "Learn Game Development with Unity or Unreal Engine",
  network_engineer: "Learn Computer Networking and CCNA",
};

async function generatePrompt(prompt: string, route: string): Promise<string> {
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
    const routeKey = route.replace('/', '').replace(/-/g, '_');
    return (fallbacks as { [key: string]: string })[routeKey] || "No fallback available for this route.";
  }
}

const SYSTEM_PROMPT: string = `You are an AI assistant designed to operate within a structured workflow consisting of three states: START, PLAN, and ACTION.

1. **START**: 
   - You will receive either the current route details from React Router DOM or a search query entered by the user in the search box.

2. **PLAN**: 
   - Analyze the received route or search text and generate a refined search query aimed at fetching **relevant and high-quality** results from the YouTube API. 
   - Examples:
     - If the route is "/software-engineer", possible queries could be:
       - "Learn Networking"
       - "C++ Tutorial"
       - "Stack an Queue in C++"
       - "Java Tutorial"

     - If the route is "/web-development", possible queries could be:
       - "Top 10 web development frameworks in 2025"
       - "Best web development courses in 2025"
       - "Web development interview questions"
       - "React crash course"
       - "MERN course"

     - If the input is "learn go", generate queries like:
       - "The Best Resources To Learn Go"
       - "Go Crash Course"
       - "Full Go Lang Tutorials"
       - "Mastering Go Language"
       - "Complete Guide to Go Language"
       - "Go Programming with Real-World Examples"
       - "Building APIs with Go"

     - If the input is "build web development project", generate queries like:
       - "The Best Web Development Projects for Beginners"
       - "Step-by-Step Guide to Building Web Projects"
       - "Full-Stack Web Development Project Tutorial"
       - "Learn Web Development by Building a Complete Project"

3. **Restrictions and Rules**: 
   - If the input is **not related to software engineering** (e.g., "Rap Songs", "Best Movies in 2025", "iPhone Unboxing", "Best Earphone TWS", "10 Sex Positions"), **do not** send a query to the YouTube API. Instead, block the request.
   - If the **current route** is "/cyber-security-specialist", and the search text is **not related to cybersecurity** (e.g., "Full-Stack Web Development Project Tutorial"), block the request.
   - If the **current route** is "/cyber-security-specialist", and the search text **is relevant** (e.g., "Cyber Security Roadmap"), refine the query and proceed with the search.

4. **ACTION**: 
   - Generate the search query and pass it to the YouTube API using the available tools.

Available Tools: 
- function fetchVideos(q: string) is the API call to fetch videos from YouTube.

Example 1:
START
{ route: "/software-engineer" }

PLAN
{ query: "DSA Full Course" }

ACTION
{ apiCall: "search", query: "DSA Full Course" }

Example 2:
START
{ search: "learn go" }

PLAN
{ query: "The Best Resources To Learn Go" }

ACTION
{ apiCall: "search", query: "The Best Resources To Learn Go" }
`;

const fetchVideos = async ({ pageParam = '', query }: { pageParam?: string, query: string }) => {
  const url = 'https://youtube-v31.p.rapidapi.com/search';

  console.log(query);

  const options = {
    params: {
      q: query,
      part: 'snippet,id',
      regionCode: 'IN',
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

export const useFetchYoutubeData = (search: string) => {
  const location = useLocation();
  const route = location.pathname;

  const generateQuery = async () => {
    const prompt = `${SYSTEM_PROMPT}\nSTART\n{ search: "${search}", route: "${route}" }\nPLAN`;
    const query = await generatePrompt(prompt, route);
    return query;
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: async ({ pageParam }) => {
      const query = await generateQuery();
      return fetchVideos({ pageParam, query });
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: '',
  });

  return { data, isLoading, fetchNextPage, hasNextPage };
};