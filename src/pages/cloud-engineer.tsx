import { useFetchYoutubeData } from "@/hooks/useFetchYoutubeData";
import { ThumbnailCard } from "@/components/ui/thumbnail-card";
import { SearchResultItem } from "@/type";
import { Loading } from "@/components/ui/loading";

export default function CloudEngineer() {
  const { data, isLoading } = useFetchYoutubeData("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        <Loading />
      ) : (
        data?.pages?.flatMap(page => page.items).map((item: SearchResultItem) => (
          <ThumbnailCard
            key={item.id.videoId}
            thumbnailUrl={item.snippet.thumbnails.high.url}
            title={item.snippet.title}
            channelName={item.snippet.channelTitle}
            uploadTime={item.snippet.publishedAt}
            channelAvatarUrl={item.snippet.thumbnails.default.url}
          />
        ))
      )}
    </div>
  );
}