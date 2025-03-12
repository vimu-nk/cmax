// videos.js - Secure Bunny.net HLS Streaming with Token Authentication
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	const { BUNNY_CDN_URL, BUNNY_AUTH_KEY } = process.env;

	// Manually defined video GUIDs & Titles
	const videos = [
		{
			title: "W05_P13b_TX_2_3",
			guid: "02df3d62-c7c4-4bc9-bff8-5a5dbb4fe873",
		},
		{
			title: "W05_P13b_TX_2_4",
			guid: "104f8886-3e4d-46e1-a36b-7eaf3d58060a",
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
			securedUrl: `https://vz-afb45607-460.b-cdn.net/${video.guid}/playlist.m3u8?token=${token}`,
		};
	});

	res.status(200).json(secureVideos);
}
