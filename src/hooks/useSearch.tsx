import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchVideos = async ({ pageParam = '' }) => {
  const url = 'https://youtube-v31.p.rapidapi.com/search';

  const options = {
    params: {
      q: 'music',
      part: 'snippet,id',
      regionCode: 'US',
      maxResults: 50,
      order: 'date',
      pageToken: pageParam,
    },
    headers: {
      'x-rapidapi-key': '31f3011facmsh6c7f1080cfcc6b2p18bf9cjsn05ae3c6b04f0',
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
    },
  };

  const response = await axios.get(url, options);
  return response.data;
};

export const useSearch = () => {
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: '',
  });

  return { data, isLoading };
};