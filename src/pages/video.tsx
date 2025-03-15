import clsx from 'clsx';
import { Avatar } from '@/components/ui/avatar';
import { Text, Strong } from '@/components/ui/text';
import { useFetchVideoData } from '@/hooks/useFetchVideoData';
import ReactPlayer from 'react-player';
import { Loading } from '@/components/ui/loading';
import { useGenerateSummary } from '@/hooks/useGenerateSummery';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Video() {
  const { data: video, videoId } = useFetchVideoData();
  const { summary, loading: isSummaryLoading, } = useGenerateSummary(video? video.items[0].snippet.description: null);

  console.log(summary)

  const [displayedSummary, setDisplayedSummary] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    if (summary) {
      setDisplayedSummary('');
      controls.start({ opacity: 1 });
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < summary.length) {
          setDisplayedSummary((prev) => prev + summary[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [summary, controls]);

  if (!video || !videoId) {
    return (
      <div className="col-span-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  const videoDetails = video.items[0].snippet;

  return (
    <div className={clsx('flex flex-col md:flex-row gap-6 p-4')}>
      <div className={clsx('flex-grow')}>
        <div className={clsx('w-full h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden')}>
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>

        <div className={clsx('mt-4')}>
          <Strong className={clsx('text-xl')}>{videoDetails.title}</Strong>
          <div className={clsx('flex items-center gap-3 mt-2')}>
            <Avatar className={clsx('size-10')} src={videoDetails.thumbnails.default.url} />
            <Text>
              {videoDetails.channelTitle}
            </Text>
          </div>
          <Text className={clsx('text-sm text-zinc-600 dark:text-zinc-400 mt-2')}>
            Published on: {new Date(videoDetails.publishedAt).toLocaleDateString()}
          </Text>
        </div>

        <motion.div
          className={clsx('mt-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg')}
          initial={{ opacity: 0 }}
          animate={controls}
        >
          <Text className={clsx('text-zinc-800 dark:text-zinc-200')}>
            {displayedSummary}
            {isSummaryLoading && (
              <span className="ml-1 animate-pulse">|</span>
            )}
          </Text>
        </motion.div>
      </div>
    </div>
  );
}