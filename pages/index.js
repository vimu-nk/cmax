import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const [sections, setSections] = useState([]);

	// Fetch section data from the JSON file
	useEffect(() => {
		fetch("/data/sections.json")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch sections");
				}
				return res.json();
			})
			.then((data) => setSections(data))
			.catch((error) => {
				console.error("Error fetching sections:", error);
			});
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
			<h1 style={{ marginBottom: "20px" }}>Video Sections</h1>

			{/* Dynamically generate buttons for each section */}
			<div>
				{sections.map((section) => (
					<Link
						key={section.id}
						href={`/sections/${section.id}`}
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
							{section.name}
						</button>
					</Link>
				))}
			</div>
		</div>
	);
}
