// api/showroom.js - SHOWROOM Stats Proxy (JSON API + HTML scraping fallback)
// Deployed as Vercel Serverless Function

const ROOM_ID = '550336';
const ROOM_URL = `https://www.showroom-live.com/room/profile?room_id=${ROOM_ID}`;
const JSON_API_URL = `https://www.showroom-live.com/api/room/profile?room_id=${ROOM_ID}`;

// Map league_id to rank string (SHOWROOM ranking system)
function leagueIdToRank(leagueId) {
  const map = {
    50: 'S',
    40: 'A',
    39: 'A-1', 38: 'A-2', 37: 'A-3', 36: 'A-4', 35: 'A-5',
    30: 'B',
    29: 'B-1', 28: 'B-2', 27: 'B-3', 26: 'B-4', 25: 'B-5',
    20: 'C',
    19: 'C-1', 18: 'C-2', 17: 'C-3', 16: 'C-4', 15: 'C-5',
    10: 'D',
    0: 'F',
  };
  return map[leagueId] || `L${leagueId}`;
}

async function fetchFromJsonApi() {
  const res = await fetch(JSON_API_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Referer': 'https://www.showroom-live.com/',
    }
  });
  if (!res.ok) throw new Error(`JSON API HTTP ${res.status}`);
  const data = await res.json();
  return {
    roomName: data.room_name || '夏凪里季🌻🌴',
    followerCount: data.follower_num != null ? String(data.follower_num) : null,
    roomLevel: data.room_level != null ? String(data.room_level) : null,
    showRank: data.league_id != null ? leagueIdToRank(data.league_id) : null,
    streakDays: data.live_continuous_days != null ? String(data.live_continuous_days) : null,
    source: 'json_api',
  };
}

async function fetchFromHtml() {
  const res = await fetch(ROOM_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
      'Accept-Language': 'ja,en',
    }
  });
  if (!res.ok) throw new Error(`HTML HTTP ${res.status}`);
  const html = await res.text();

  const followerMatch = html.match(/follower_num["s:]+(d+)/i)
    || html.match(/フォロワー.*?(d+)/);
  const levelMatch = html.match(/room_level["s:]+(d+)/i)
    || html.match(/ルームレベル.*?(d+)/);
  const rankMatch = html.match(/league_name["s:>"]+([A-Z][-d]*)/i)
    || html.match(/SHOWランク.*?([A-Z][-d]+)/);
  const streakMatch = html.match(/live_continuous_days["s:]+(d+)/i)
    || html.match(/(d+)日目.*連続配信/);

  return {
    roomName: '夏凪里季🌻🌴',
    followerCount: followerMatch ? followerMatch[1] : null,
    roomLevel: levelMatch ? levelMatch[1] : null,
    showRank: rankMatch ? rankMatch[1] : null,
    streakDays: streakMatch ? streakMatch[1] : null,
    source: 'html',
  };
}

async function fetchDailyDays() {
  try {
    const res = await fetch(JSON_API_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.live_continuous_days != null ? String(data.live_continuous_days) : null;
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Try JSON API first, fall back to HTML scraping
    let stats;
    try {
      stats = await fetchFromJsonApi();
    } catch (jsonErr) {
      console.warn('JSON API failed, falling back to HTML:', jsonErr.message);
      stats = await fetchFromHtml();
    }

    // Merge: for any null from JSON API, try HTML as supplement
    if (!stats.followerCount || !stats.roomLevel || !stats.showRank) {
      try {
        const htmlStats = await fetchFromHtml();
        stats.followerCount = stats.followerCount || htmlStats.followerCount;
        stats.roomLevel = stats.roomLevel || htmlStats.roomLevel;
        stats.showRank = stats.showRank || htmlStats.showRank;
        stats.streakDays = stats.streakDays || htmlStats.streakDays;
      } catch {
        // HTML scrape failed too, use what we have
      }
    }

    res.status(200).json({
      ok: true,
      roomName: stats.roomName,
      followerCount: stats.followerCount || '—',
      roomLevel: stats.roomLevel || '—',
      showRank: stats.showRank || '—',
      streakDays: stats.streakDays || null,
      source: stats.source,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('showroom.js error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
