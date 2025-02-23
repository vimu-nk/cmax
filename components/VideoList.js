import { useEffect, useState } from "react";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`/api/videos`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.slice(page * 3, page * 3 + 3)); // Show 3 videos at a time
      });
  }, [page]);

  return (
    <div>
      <h1 className="text-xl font-bold">Bunny.net Video Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <iframe
            key={video.guid}
            src={`${process.env.NEXT_PUBLIC_BUNNY_STREAM_DOMAIN}/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${video.guid}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-64"
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
