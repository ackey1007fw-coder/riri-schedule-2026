// api/frecam-schedule.js
// フレキャンのエントリーページから配信予定をベストエフォートで抽出する。
// 取れなければ空配列を返すだけ（フロント側は手入力リストにフォールバック）。
const FRECAM_URL = 'https://2025.frecam.jp/entry/306';

// JSTの「今日」を YYYY,MM,DD で取得
function jstToday() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date())
    .reduce((o, x) => { o[x.type] = x.value; return o; }, {});
  return { y: Number(p.year), m: Number(p.month), d: Number(p.day) };
}

// MM/DD（年なし）に、今日に最も近い妥当な年を当てる
function inferDate(month, day) {
  const today = jstToday();
  let year = today.y;
  // 今日より2ヶ月以上前なら翌年の予定とみなす
  const todayNum = today.m * 100 + today.d;
  if (month * 100 + day < todayNum - 200) year += 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseSchedule(html) {
  const slots = [];
  const seen = new Set();
  // 例: 06/17(水) 本日 21:30 開始 / 06/18（木）22:45開始
  const re = /(\d{1,2})\s*\/\s*(\d{1,2})\s*[（(][^）)]{1,4}[）)][^\d]{0,12}?(\d{1,2})\s*[:：]\s*(\d{2})/g;
  let mm;
  while ((mm = re.exec(html)) !== null && slots.length < 12) {
    const month = Number(mm[1]);
    const day = Number(mm[2]);
    const hour = Number(mm[3]);
    const minute = mm[4];
    if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23) continue;
    const date = inferDate(month, day);
    const time = `${String(hour).padStart(2, '0')}:${minute}`;
    const key = `${date}T${time}`;
    if (seen.has(key)) continue;
    seen.add(key);
    slots.push({ date, time });
  }
  return slots;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800,stale-while-revalidate=3600');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const r = await fetch(FRECAM_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RiriSchedule/1.0; +https://riri-schedule-2026.vercel.app)',
        'Accept-Language': 'ja,en'
      }
    });
    if (!r.ok) {
      return res.status(200).json({ ok: false, slots: [], reason: 'HTTP ' + r.status });
    }
    const html = await r.text();
    const slots = parseSchedule(html);
    return res.status(200).json({ ok: true, slots, source: 'frecam' });
  } catch (err) {
    return res.status(200).json({ ok: false, slots: [], reason: err.message });
  }
}
