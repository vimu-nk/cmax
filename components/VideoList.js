import { useEffect, useState, useRef } from "react";
import "plyr/dist/plyr.css"; // Import Plyr styles

export default function VideoList() {
	const [videos, setVideos] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const videoRef = useRef(null);
	const playerRef = useRef(null);

	// Fetch video list
	useEffect(() => {
		fetch(`/api/videos`)
			.then((res) => res.json())
			.then((data) => setVideos(data));
	}, []);

	// Load Plyr only on the client-side
	useEffect(() => {
		if (typeof window !== "undefined") {
			import("plyr").then((module) => {
				const Plyr = module.default;
				if (videos.length > 0 && videoRef.current) {
					if (!playerRef.current) {
						playerRef.current = new Plyr(videoRef.current, {
							controls: [
								"play",
								"rewind",
								"fast-forward",
								"progress",
								"current-time",
								"mute",
								"volume",
								"settings",
								"fullscreen",
							],
							settings: ["quality", "speed", "loop"],
						});
					}
					// Update video source
					videoRef.current.src =
						videos[currentIndex]?.securedUrl || "";
				}
			});
		}

		// Cleanup function
		return () => {
			if (playerRef.current) {
				playerRef.current.destroy();
				playerRef.current = null;
			}
		};
	}, [videos, currentIndex]);

	return (
		<div>
			<h1 className="text-xl font-bold">W05_P13b_TX_2_3_&_4</h1>

			{/* Video Player */}
			<div style={{ maxWidth: "800px", margin: "auto" }}>
				<video ref={videoRef} className="plyr" controls />
			</div>

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
