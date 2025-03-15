const vidKeys = [
  // import.meta.env.VITE_YOUTUBE_API_KEY1,
  import.meta.env.VITE_YOUTUBE_API_KEY2,
  import.meta.env.VITE_YOUTUBE_API_KEY3,
  import.meta.env.VITE_YOUTUBE_API_KEY4,
  import.meta.env.VITE_YOUTUBE_API_KEY5,
];

let currentIndex = 0;

export const getNextYoutubeApiKey = () => {
  const key = vidKeys[currentIndex];
  currentIndex = (currentIndex + 1) % vidKeys.length;
  return key;
};

setInterval(() => {
  currentIndex = (currentIndex + 1) % vidKeys.length;
}, 10000);