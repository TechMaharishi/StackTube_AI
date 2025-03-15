import { useFetchYoutubeData } from "@/hooks/useFetchYoutubeData";
import { ThumbnailCard } from "@/components/ui/thumbnail-card";
import { SearchResultItem } from "@/type";
import { Loading } from "@/components/ui/loading";
import { Strong, Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { SearchBar } from "@/components/ui/searchbar";
import { useState } from "react";

export default function SoftwareEngineer() {

  const [query, setQuery] = useState("" as string);


  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const { data, isLoading } = useFetchYoutubeData(query);

  return (
    <div className="container mx-auto p-6">

      <div className="mb-3">
        <Strong>Software Engineer</Strong>
        <Divider className="my-2" />
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} placeholder="Search for software engineering videos..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <Loading />
          </div>
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

      {!isLoading && data?.pages?.flatMap(page => page.items).length === 0 && (
        <div className="mt-8 text-center">
          <Text>No results found. Try a different search.</Text>
        </div>
      )}
    </div>
  );
}