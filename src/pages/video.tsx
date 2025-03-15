import clsx from 'clsx';
import { Link } from '@/components/ui/link';
import { Avatar } from '@/components/ui/avatar';
import { Text, Strong } from '@/components/ui/text';
import { RecommendedCard } from '@/components/ui/recommended-card';

export default function Video() {
  const recommendedVideos = [
    {
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Recommended Video 1',
      channelName: 'Channel 1',
      views: '1M',
      uploadTime: '1 week ago',
      channelAvatarUrl: 'https://via.placeholder.com/40',
    },
    {
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Recommended Video 2',
      channelName: 'Channel 2',
      views: '500K',
      uploadTime: '2 weeks ago',
      channelAvatarUrl: 'https://via.placeholder.com/40',
    },
    {
      thumbnailUrl: 'https://via.placeholder.com/150',
      title: 'Recommended Video 3',
      channelName: 'Channel 3',
      views: '250K',
      uploadTime: '3 weeks ago',
      channelAvatarUrl: 'https://via.placeholder.com/40',
    },
  ];

  return (
    <div className={clsx('flex flex-col md:flex-row gap-6 p-4')}>
      <div className={clsx('flex-grow')}>
        <div className={clsx('w-full h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden')}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className={clsx('mt-4')}>
          <Strong className={clsx('text-xl')}>Main Video Title</Strong>
          <div className={clsx('flex items-center gap-3 mt-2')}>
            <Avatar className={clsx('size-10')} src="https://via.placeholder.com/40" />
            <Text>
              <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Channel Name
              </Link>
            </Text>
          </div>
          <Text className={clsx('text-sm text-zinc-600 dark:text-zinc-400 mt-2')}>
            1M views • 1 week ago
          </Text>
        </div>
      </div>

      {/* Recommended Videos Section */}
      <div className={clsx('w-full md:w-80')}>
        <h2 className={clsx('text-lg font-semibold mb-4')}>Recommended</h2>
        <div className={clsx('space-y-4')}>
          {recommendedVideos.map((video, index) => (
            <RecommendedCard
              key={index}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
              channelName={video.channelName}
              views={video.views}
              uploadTime={video.uploadTime}
              channelAvatarUrl={video.channelAvatarUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}