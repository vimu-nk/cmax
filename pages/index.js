import { useEffect, useState } from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";

export default function Home() {
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
		<div
			style={{
				textAlign: "center",
				padding: "20px",
				color: "white",
				background: "black",
			}}
		>
			<h1 style={{ marginBottom: "10px" }}>W05_P13b_TX_2_3_&_4</h1>

			{/* Video Player */}
			<video id="video-player" className="video-js vjs-default-skin" />

			{/* Video Title */}
			<h2 style={{ marginBottom: "10px", color: "#ffcc00" }}>
				{videos[currentIndex]?.title || "Loading..."}
			</h2>

			{/* Navigation Buttons */}
			<div>
				<button
					onClick={() =>
						setCurrentIndex((prev) => Math.max(0, prev - 1))
					}
					disabled={currentIndex === 0}
					style={{
						background: currentIndex === 0 ? "#555" : "#ffcc00",
						color: "black",
						padding: "10px 20px",
						margin: "5px",
						border: "none",
						borderRadius: "5px",
						cursor: currentIndex === 0 ? "not-allowed" : "pointer",
						fontWeight: "bold",
					}}
				>
					⬅ Previous
				</button>

				<button
					onClick={() =>
						setCurrentIndex((prev) =>
							Math.min(videos.length - 1, prev + 1)
						)
					}
					disabled={currentIndex === videos.length - 1}
					style={{
						background:
							currentIndex === videos.length - 1
								? "#555"
								: "#ffcc00",
						color: "black",
						padding: "10px 20px",
						margin: "5px",
						border: "none",
						borderRadius: "5px",
						cursor:
							currentIndex === videos.length - 1
								? "not-allowed"
								: "pointer",
						fontWeight: "bold",
					}}
				>
					Next ➡
				</button>
			</div>
		</div>
	);
}
