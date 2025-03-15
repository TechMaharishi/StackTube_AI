import React from 'react';
import clsx from 'clsx';
import { Link } from '@/components/ui/link';
import { Avatar } from '@/components/ui/avatar';
import { Text, Strong } from '@/components/ui/text';

export function RecommendedCard({
  thumbnailUrl,
  title,
  channelName,
  uploadTime,
  channelAvatarUrl,
  relatedToVideoId,
  ...props
}: {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  uploadTime: string;
  className?: string;
  channelAvatarUrl?: string;
  relatedToVideoId?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        'w-full max-w-80 flex gap-3 p-2 rounded-lg dark:bg-zinc-950/50 bg-zinc-100 shadow-sm',
        props.className
      )}
    >
      <Link href="#" className="flex-shrink-0">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-32 h-20 object-cover rounded-lg"
        />


        <div className="flex flex-col justify-between flex-grow">
          <Strong className="line-clamp-2 text-sm">{title}</Strong>

          <div className="mt-1 flex items-center gap-2">
            {channelAvatarUrl && (
              <Avatar className="size-5" src={channelAvatarUrl} />
            )}
            <Text>
              {channelName}
            </Text>
          </div>

          {/* <Text>
            {views} views • {uploadTime}
          </Text> */}
        </div>
      </Link>
    </div>
  );
}