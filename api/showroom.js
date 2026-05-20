const SHOWROOM_URL = "https://www.showroom-live.com/room/profile?room_id=550336";
const SHOWROOM_LIST_URLS = [
  "https://www.showroom-live.com/?code=140081",
  "https://www.showroom-live.com/?r=68273cabbijinmoeka1",
  "https://www.showroom-live.com/"
];

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

const normalizeSchedule = (value) => {
  if (!value || value.toUpperCase() === "TBD") {
    return "未定";
  }

  return value;
};

const readDailyDays = (text) => {
  const afterName = text.match(/夏凪里季[\s\S]{0,500}?Daily\s+(\d+)\s+days/i);
  if (afterName?.[1]) {
    return afterName[1];
  }

  const beforeName = text.match(/Daily\s+(\d+)\s+days[\s\S]{0,500}?夏凪里季/i);
  return beforeName?.[1];
};

const fetchDailyDays = async () => {
  for (const url of SHOWROOM_LIST_URLS) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; RiriSchedule/1.0; +https://riri-schedule-2026.vercel.app)"
        }
      });

      if (!response.ok) {
        continue;
      }

      const text = cleanText(await response.text());
      const dailyDays = readDailyDays(text);
      if (dailyDays) {
        return dailyDays;
      }
    } catch (error) {
      // Some SHOWROOM listing pages rotate by time; try the next known listing.
    }
  }

  return undefined;
};

const parseShowroomProfile = (html) => {
  const text = cleanText(html);

  return {
    roomName: matchText(text, /##\s*([^\n]+)/) || "夏凪里季 #フレキャン2025",
    followers: matchText(text, /([\d,]+)\s*Followers/i),
    roomLevel: matchText(text, /Room Level\s*\n\s*([\d,]+)/i),
    showRank: matchText(text, /SHOW rank\s*\n\s*([A-Z])/i),
    category: matchText(text, /Category\s*\n\s*([^\n]+)/i),
    nextShow: normalizeSchedule(matchText(text, /Show\s*:\s*([^\n]+)/i)),
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
    data.dailyDays = await fetchDailyDays();

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
