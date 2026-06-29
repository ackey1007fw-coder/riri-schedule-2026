const ALLOWED_HOSTS = new Set([
  "image.showroom-cdn.com",
  "static.showroom-live.com"
]);

export default async function handler(request, response) {
  try {
    const rawUrl = request.query?.url;
    const imageUrl = Array.isArray(rawUrl) ? rawUrl[0] : rawUrl;

    if (!imageUrl) {
      response.status(400).send("Missing image URL");
      return;
    }

    const parsedUrl = new URL(imageUrl);

    if (!ALLOWED_HOSTS.has(parsedUrl.hostname)) {
      response.status(400).send("Unsupported image URL");
      return;
    }

    const isOldShowroomCdn =
      parsedUrl.hostname === "image.showroom-cdn.com" &&
      parsedUrl.pathname.startsWith("/showroom-prod/");
    const isStaticShowroomAsset =
      parsedUrl.hostname === "static.showroom-live.com" &&
      parsedUrl.pathname.startsWith("/image/");

    if (!isOldShowroomCdn && !isStaticShowroomAsset) {
      response.status(400).send("Unsupported image URL");
      return;
    }

    const imageResponse = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RiriSchedule/1.0; +https://riri-schedule-2026.vercel.app)",
        Referer: "https://www.showroom-live.com/"
      }
    });

    if (!imageResponse.ok) {
      throw new Error(`Image responded ${imageResponse.status}`);
    }

    const contentType = imageResponse.headers.get("content-type") || "image/png";
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    response.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    response.setHeader("Content-Type", contentType);
    response.status(200).send(imageBuffer);
  } catch (error) {
    response.status(502).send("Image could not be loaded");
  }
}
