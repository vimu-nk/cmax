// videos.js - Secure Bunny.net HLS Streaming with Token Authentication
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	const { BUNNY_CDN_URL, BUNNY_AUTH_KEY } = process.env;

	// Manually defined video GUIDs & Titles
	const videos = [
		{
			title: "W05_P13b_TX_2_3",
			guid: "0ffb117f-1003-46a9-b621-ddca53e0de98",
		},
		{
			title: "W05_P13b_TX_2_4",
			guid: "4023bac5-e628-475f-93c4-3faaa03c19e8",
		},
	];

	// Generate secured URLs
	const secureVideos = videos.map((video) => {
		const token = jwt.sign(
			{ exp: Math.floor(Date.now() / 1000) + 3600, v: video.guid },
			BUNNY_AUTH_KEY
		);

		console.log(
			`Generated HLS URL: ${BUNNY_CDN_URL}/${video.guid}/playlist.m3u8?token=${token}`
		);
		return {
			title: video.title,
			guid: video.guid,
			securedUrl: `https://${BUNNY_CDN_URL}/${video.guid}/playlist.m3u8?token=${token}`,
		};
	});

	res.status(200).json(secureVideos);
}
