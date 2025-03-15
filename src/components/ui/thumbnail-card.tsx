import React from 'react';
import clsx from 'clsx';
import { Link } from '@/components/ui/link';
import { Divider } from '@/components/ui/divider';
import { Avatar } from '@/components/ui/avatar';
import { Text, Strong } from '@/components/ui/text'

export function ThumbnailCard({
  thumbnailUrl,
  title,
  channelName,
  videoId,
  channelAvatarUrl,
  ...props
}: {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  uploadTime: string;
  className?: string;
  channelAvatarUrl?: string;
  videoId: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={clsx('w-full max-w-80 overflow-hidden rounded-lg dark:bg-zinc-950/50 bg-zinc-100 shadow-sm')}>
      <Link href={`/watch/${videoId}`} className="block">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Divider />
        <div className="p-2">
          <Strong>
            {title}
          </Strong>

          <div className="mt-2 flex items-center gap-3">
            <Avatar className="size-8" src={channelAvatarUrl} />
            <Text>
              {channelName}
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
}