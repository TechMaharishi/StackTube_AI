# StackTube AI

StackTube AI is an intelligent learning platform that leverages AI to provide high-quality computer engineering educational content. The platform curates and categorizes educational videos while offering AI-powered search refinement and real-time video description customization.

## Features

### 🎥 High-Quality Content Curation
- Sources educational videos from free platforms like YouTube
- Focuses on computer engineering and technology topics
- Ensures content quality through AI-powered filtering

### 🔍 AI-Powered Search
- Intelligent search result refinement
- Content relevancy optimization
- Distraction-free learning experience

### 📂 Specialized Learning Paths
- Software Engineering
- Web Development
- Mobile Development
- AI Engineering
- Data Science
- Cloud Engineering
- DevOps
- Cyber Security
- Game Development
- Network Engineering

### 🤖 Smart Features
- Real-time video description customization
- AI-powered content categorization
- Personalized learning recommendations
- Modern, intuitive user interface

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Framer Motion for animations
- TailwindCSS for styling
- React Router for navigation
- React Query for data fetching

### AI Integration
- Google Generative AI for content processing
- YouTube Data API for video fetching

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- pnpm (Recommended) or npm/yarn
- API keys for YouTube Data API and Google Generative AI

### Installation

1. Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

2. Clone the repository
```bash
git clone [repository-url]
cd StackTube_AI
```

3. Install dependencies
```bash
pnpm install
```

4. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```env
# YouTube Data API Configuration
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here

# Google Gemini AI Configuration
VITE_GOOGLE_GEMINI_KEY=your_gemini_api_key_here

# Optional: Multiple YouTube API Keys for Load Balancing
VITE_YOUTUBE_API_KEY_1=your_first_youtube_api_key
VITE_YOUTUBE_API_KEY_2=your_second_youtube_api_key
VITE_YOUTUBE_API_KEY_3=your_third_youtube_api_key

# Optional: Development Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_DEV_MODE=true
```

5. Start the development server
```bash
pnpm dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
