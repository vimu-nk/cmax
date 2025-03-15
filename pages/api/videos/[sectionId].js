import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
	const { BUNNY_CDN_URL, BUNNY_AUTH_KEY } = process.env;
	const { sectionId } = req.query;

	// Read video data from the JSON file
	const videosFilePath = path.join(
		process.cwd(),
		"public",
		"data",
		"videos.json"
	);
	const videosData = JSON.parse(fs.readFileSync(videosFilePath, "utf8"));

	// Get videos for the specific section
	const videos = videosData[sectionId] || [];

	// Generate secured URLs
	const secureVideos = videos.map((video) => {
		const token = jwt.sign(
			{ exp: Math.floor(Date.now() / 1000) + 3600, v: video.guid },
			BUNNY_AUTH_KEY
		);

		return {
			title: video.title,
			guid: video.guid,
			securedUrl: `https://${BUNNY_CDN_URL}/${video.guid}/playlist.m3u8?token=${token}`,
		};
	});

	res.status(200).json(secureVideos);
}
