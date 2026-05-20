const SHOWROOM_URL = "https://www.showroom-live.com/room/profile?room_id=550336";

const decodeHtml = (value = "") =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();

const cleanText = (html) =>
  decodeHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, "\n")
  )
    .split("\n")
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");

const matchText = (text, pattern) => text.match(pattern)?.[1]?.trim();

const parseShowroomProfile = (html) => {
  const text = cleanText(html);

  return {
    roomName: matchText(text, /##\s*([^\n]+)/) || "夏凪里季 #フレキャン2025",
    followers: matchText(text, /([\d,]+)\s*Followers/i),
    roomLevel: matchText(text, /Room Level\s*\n\s*([\d,]+)/i),
    showRank: matchText(text, /SHOW rank\s*\n\s*([A-Z])/i),
    category: matchText(text, /Category\s*\n\s*([^\n]+)/i),
    nextShow: matchText(text, /Show\s*:\s*([^\n]+)/i),
    updatedAt: new Date().toISOString()
  };
};

export default async function handler(_request, response) {
  try {
    const showroomResponse = await fetch(SHOWROOM_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RiriSchedule/1.0; +https://riri-schedule-2026.vercel.app)"
      }
    });

    if (!showroomResponse.ok) {
      throw new Error(`SHOWROOM responded ${showroomResponse.status}`);
    }

    const html = await showroomResponse.text();
    const data = parseShowroomProfile(html);

    response.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    response.status(200).json(data);
  } catch (error) {
    response.setHeader("Cache-Control", "s-maxage=60");
    response.status(502).json({
      error: "SHOWROOM profile could not be refreshed",
      updatedAt: new Date().toISOString()
    });
  }
}
