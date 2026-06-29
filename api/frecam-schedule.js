// api/frecam-schedule.js
// フレキャン掲載ページが参照している予定JSONから、SHOWROOM配信予定を取得する。
// 取れなければ空配列を返すだけ（フロント側は手入力リストにフォールバック）。
const ROOM_ID = '550336';
const SCHEDULE_URL = 'https://marquez.age.co.jp/schedule/' + ROOM_ID + '.json';

function normalizeSlot(item) {
  const date = item && typeof item.start_date === 'string' ? item.start_date : null;
  const hour = Number(item?.start_hour);
  const minute = Number(item?.start_minute);
  if (!date || !Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return {
    date,
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    modifiedAt: item.modified || null
  };
}

function normalizeSchedule(data) {
  if (!Array.isArray(data)) return [];
  const seen = new Set();
  return data
    .map(normalizeSlot)
    .filter(Boolean)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .filter((slot) => {
      const key = `${slot.date}T${slot.time}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=180,stale-while-revalidate=600');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const r = await fetch(SCHEDULE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RiriSchedule/1.0; +https://riri-schedule-2026.vercel.app)',
        'Accept': 'application/json',
        'Referer': 'https://2025.frecam.jp/entry/306'
      }
    });
    if (!r.ok) {
      return res.status(200).json({ ok: false, slots: [], reason: 'HTTP ' + r.status });
    }
    const slots = normalizeSchedule(await r.json());
    return res.status(200).json({ ok: true, slots, source: 'frecam-schedule-json' });
  } catch (err) {
    return res.status(200).json({ ok: false, slots: [], reason: err.message });
  }
}
