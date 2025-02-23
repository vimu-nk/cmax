import jwt from "jsonwebtoken"; // Install with `npm install jsonwebtoken`

export default async function handler(req, res) {
  const { BUNNY_API_KEY, BUNNY_LIBRARY_ID } = process.env;

  const response = await fetch(
    `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos`,
    { headers: { AccessKey: BUNNY_API_KEY } }
  );

  if (!response.ok) {
    return res.status(500).json({ error: "Failed to fetch videos" });
  }

  const data = await response.json();
  const secureVideos = data.items.map((video) => {
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 3600 }, "your_secret_key");
    return { ...video, securedUrl: `${process.env.BUNNY_STREAM_DOMAIN}/${BUNNY_LIBRARY_ID}/${video.guid}?token=${token}` };
  });

  res.status(200).json(secureVideos);
};
