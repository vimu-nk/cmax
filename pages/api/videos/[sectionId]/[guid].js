import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
	const { BUNNY_CDN_URL, BUNNY_AUTH_KEY } = process.env;
	const { sectionId, guid } = req.query;

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

	// Find the specific video by GUID
	const video = videos.find((v) => v.guid === guid);

	if (!video) {
		return res.status(404).json({ error: "Video not found" });
	}

	// Generate secured URL
	const token = jwt.sign(
		{ exp: Math.floor(Date.now() / 1000) + 3600, v: video.guid },
		BUNNY_AUTH_KEY
	);

	const securedUrl = `https://${BUNNY_CDN_URL}/${video.guid}/playlist.m3u8?token=${token}`;

	res.status(200).json({
		title: video.title,
		guid: video.guid,
		securedUrl,
	});
}
