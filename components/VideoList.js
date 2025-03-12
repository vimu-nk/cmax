import { useEffect, useState } from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";

export default function VideoList() {
	const [videos, setVideos] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		fetch(`/api/videos`)
			.then((res) => res.json())
			.then((data) => setVideos(data));
	}, []);

	useEffect(() => {
		if (videos.length > 0) {
			const player = videojs("video-player", {
				controls: true,
				autoplay: false,
				fluid: true,
				sources: [
					{
						src: videos[currentIndex].securedUrl,
						type: "application/x-mpegURL",
					},
				],
			});

			return () => {
				player.dispose();
			};
		}
	}, [videos, currentIndex]);

	return (
		<div>
			<h1 className="text-xl font-bold">W05_P13b_TX_2_3_&_4</h1>

			{/* Video Player */}
			<video id="video-player" className="video-js vjs-default-skin" />

			{/* Video Title */}
			<h2 className="mt-2">
				{videos[currentIndex]?.title || "Loading..."}
			</h2>

			{/* Navigation Buttons */}
			<div className="flex justify-between mt-4">
				<button
					onClick={() =>
						setCurrentIndex((prev) => Math.max(0, prev - 1))
					}
					disabled={currentIndex === 0}
				>
					Previous
				</button>
				<button
					onClick={() =>
						setCurrentIndex((prev) =>
							Math.min(videos.length - 1, prev + 1)
						)
					}
					disabled={currentIndex === videos.length - 1}
				>
					Next
				</button>
			</div>
		</div>
	);
}
