import React from 'react';
import clsx from 'clsx';
import { Link } from '@/components/ui/link';
import { Divider } from '@/components/ui/divider';
import { Avatar } from '@/components/ui/avatar';
import { Text, Strong } from '@/components/ui/text'

export function VideoCard({
  thumbnailUrl = "https://via.placeholder.com/320x180",
  title = "Video Title",
  channelName = "Channel Name",
  views = "1.2M views",
  uploadTime = "2 days ago",
  channelAvatarUrl = "https://via.placeholder.com/40",
  className = "",
  ...props
}: {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  views: string;
  uploadTime: string;
  className?: string;
  channelAvatarUrl?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={clsx(className, 'w-full max-w-sm overflow-hidden rounded-lg dark:bg-zinc-950/50 bg-zinc-100 shadow-sm')}>
      <Link href="#" className="block">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <Divider />

      <div className="p-2">
        <Link href="#" className="block">
          <Strong>
            {title}
          </Strong>
        </Link>

        <div className="mt-2 flex items-center gap-3">
          <Avatar className="size-8" src={channelAvatarUrl} /> {/* Channel Avatar */}
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">
              {channelName}
            </Link>
          </div>
        </div>

        <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {views} views • {uploadTime}
        </Text>
      </div>
    </div>
  );
}