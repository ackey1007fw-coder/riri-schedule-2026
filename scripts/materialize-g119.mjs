import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "scripts", "assets");
const outputPath = path.join(root, "public", "images", "gallery", "g119.jpg");
const expectedSha256 = "75b0708f94d907e936fd4896ad9db5077c07ef2e9acf5633c898b8d24be30959";
const expectedBytes = 22182;

const parts = await Promise.all(
  Array.from({ length: 15 }, (_, index) =>
    readFile(path.join(assetsDir, `g119-20260823.part${String(index + 1).padStart(2, "0")}.b64`), "utf8")
  )
);
const base64 = parts.join("").replace(/\s+/g, "");
const image = Buffer.from(base64, "base64");
const sha256 = createHash("sha256").update(image).digest("hex");

if (image.length !== expectedBytes || sha256 !== expectedSha256) {
  throw new Error(`g119 source verification failed: bytes=${image.length}, sha256=${sha256}`);
}

const metadata = await sharp(image).metadata();
if (metadata.width !== 480 || metadata.height !== 640 || metadata.format !== "jpeg") {
  throw new Error(`g119 metadata verification failed: ${metadata.format} ${metadata.width}x${metadata.height}`);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, image);
console.log(`Materialized g119.jpg (${image.length} bytes, ${metadata.width}x${metadata.height}).`);
