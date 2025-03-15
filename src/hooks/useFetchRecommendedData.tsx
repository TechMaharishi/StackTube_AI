import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNextYoutubeApiKey } from '@/utils/utils';

const fetchVideo = async (videoId: string) => {
  const url = 'https://youtube-v31.p.rapidapi.com/search';
  const options = {
    method: 'GET',
    params: {
      type: 'video',
      part: 'id,snippet',
      relatedToVideoId: videoId,
      maxResults: '50'
    },
    headers: {
      'x-rapidapi-key': getNextYoutubeApiKey(),
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
  };
  const response = await axios.get(url, options);
  return response.data;
};

export const useFetchRecommendedData = () => {
  const { videoId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => fetchVideo(videoId!),
    enabled: !!videoId,
  });

  return {
    data,
    isLoading,
  };
};