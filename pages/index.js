import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const [videos, setVideos] = useState([]);

	// Fetch video list
	useEffect(() => {
		fetch(`/api/videos`)
			.then((res) => res.json())
			.then((data) => setVideos(data));
	}, []);

	return (
		<div
			style={{
				textAlign: "center",
				padding: "20px",
				color: "white",
				background: "black",
			}}
		>
			<h1 style={{ marginBottom: "20px" }}>Video List</h1>

			{/* List of Videos as Buttons */}
			<div>
				{videos.map((video, index) => (
					<Link
						key={video.guid}
						href={`/videos/${video.guid}`}
						passHref
					>
						<button
							style={{
								background: "#ffcc00",
								color: "black",
								padding: "10px 20px",
								margin: "10px",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
								fontWeight: "bold",
							}}
						>
							{video.title}
						</button>
					</Link>
				))}
			</div>
		</div>
	);
}
