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

const readValueAfterLabel = (textItems, label) => {
  const index = textItems.findIndex((item) => item === label);
  if (index === -1) {
    return undefined;
  }

  return textItems.slice(index + 1).find((item) => item && item !== "-");
};

const parseShowroomProfile = (html) => {
  const textItems = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((item) => decodeHtml(item).replace(/\s+/g, " "))
    .filter(Boolean);

  return {
    roomName: readValueAfterLabel(textItems, "Room") || "夏凪里季",
    followers: readValueAfterLabel(textItems, "Follower"),
    roomLevel: readValueAfterLabel(textItems, "Room Level"),
    showRank: readValueAfterLabel(textItems, "SHOW rank"),
    category: readValueAfterLabel(textItems, "Category"),
    nextShow: readValueAfterLabel(textItems, "Show"),
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
