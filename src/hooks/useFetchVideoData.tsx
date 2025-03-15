import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNextYoutubeApiKey } from '@/utils/utils';

const fetchVideo = async (videoId: string) => {
  const url = 'https://youtube-v31.p.rapidapi.com/videos';
  const options = {
    method: 'GET',
    params: {
      part: 'contentDetails,snippet,statistics',
      id: videoId,
    },
    headers: {
      'x-rapidapi-key': getNextYoutubeApiKey(),
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
  };
  const response = await axios.get(url, options);
  return response.data;
};

export const useFetchVideoData = () => {
  const { videoId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => fetchVideo(videoId!),
    enabled: !!videoId,
  });

  return {
    data,
    isLoading,
    videoId,
  };
};