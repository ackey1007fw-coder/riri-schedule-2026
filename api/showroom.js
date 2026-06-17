// api/showroom.js - SHOWROOM stats proxy
const ROOM_ID = '550336';
const JSON_API = 'https://www.showroom-live.com/api/room/profile?room_id=' + ROOM_ID;
const ROOM_HTML = 'https://www.showroom-live.com/room/profile?room_id=' + ROOM_ID;
const NEXT_LIVE_API = 'https://www.showroom-live.com/api/room/next_live?room_id=' + ROOM_ID;

function leagueToRank(id) {
  const m={50:'S',40:'A',39:'A-1',38:'A-2',37:'A-3',36:'A-4',35:'A-5',
    30:'B',29:'B-1',28:'B-2',27:'B-3',26:'B-4',25:'B-5',
    20:'C',19:'C-1',18:'C-2',17:'C-3',16:'C-4',15:'C-5',10:'D',0:'F'};
  return m[id]!==undefined?m[id]:String(id);
}

async function fromJson() {
  const r=await fetch(JSON_API,{headers:{'User-Agent':'Mozilla/5.0','Accept':'application/json','Referer':'https://www.showroom-live.com/'}});
  if(!r.ok) throw new Error('JSON API HTTP '+r.status);
  const d=await r.json();
  return {followerCount:d.follower_num!=null?String(d.follower_num):null,roomLevel:d.room_level!=null?String(d.room_level):null,showRank:d.league_id!=null?leagueToRank(d.league_id):null,streakDays:d.live_continuous_days!=null?String(d.live_continuous_days):null,coverImage:d.image_l||d.image||d.main_image||null,isLive:(d.is_live===1||d.is_live===true||d.is_onlive===true),source:'json'};
}

async function fromHtml() {
  const r=await fetch(ROOM_HTML,{headers:{'User-Agent':'Mozilla/5.0 (compatible; Googlebot/2.1)','Accept-Language':'ja,en'}});
  if(!r.ok) throw new Error('HTML HTTP '+r.status);
  const html=await r.text();
  const g=(re)=>{const x=html.match(re);return x?x[1]:null;};
  const cover=g(/"image_l":"([^"]+)"/);
  return {followerCount:g(/follower_num["\s:>]+(\d+)/i),roomLevel:g(/room_level["\s:>]+(\d+)/i),showRank:g(/league_name["\s:>"']+([ A-Z][-\d]*)/i),streakDays:g(/live_continuous_days["\s:]+(\d+)/i),coverImage:cover?cover.replace(/\\\//g,'/'):null,source:'html'};
}

// 次回の配信予定（SHOWROOMの next_live エポックを JST 表記に整形）
async function fetchNextLive() {
  try {
    const r=await fetch(NEXT_LIVE_API,{headers:{'User-Agent':'Mozilla/5.0','Accept':'application/json','Referer':'https://www.showroom-live.com/'}});
    if(!r.ok) return null;
    const d=await r.json();
    const epoch=d&&(d.epoch||d.next_live_start_at||d.started_at);
    if(!epoch) return null;
    const dt=new Date(epoch*1000);
    const p=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',month:'numeric',day:'numeric',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(dt).reduce((o,x)=>{o[x.type]=x.value;return o;},{});
    return `${p.month}/${p.day}(${p.weekday}) ${p.hour}:${p.minute}〜`;
  } catch(_) { return null; }
}

export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Cache-Control','s-maxage=300,stale-while-revalidate=600');
  if(req.method==='OPTIONS') return res.status(200).end();
  try {
    let s;
    try{s=await fromJson();}catch(e){console.warn('JSON fail:',e.message);s=await fromHtml();}
    if(!s.followerCount||!s.roomLevel||!s.showRank){
      try{const h2=await fromHtml();s.followerCount=s.followerCount||h2.followerCount;s.roomLevel=s.roomLevel||h2.roomLevel;s.showRank=s.showRank||h2.showRank;s.streakDays=s.streakDays||h2.streakDays;s.coverImage=s.coverImage||h2.coverImage;}catch(_){}
    }
    let nextShow=null;
    try{nextShow=await fetchNextLive();}catch(_){}
    res.status(200).json({ok:true,followerCount:s.followerCount||'—',roomLevel:s.roomLevel||'—',showRank:s.showRank||'—',streakDays:s.streakDays||null,coverImage:s.coverImage||null,isLive:!!s.isLive,nextShow:nextShow||null,source:s.source,updatedAt:new Date().toISOString()});
  } catch(err){
    res.status(500).json({ok:false,error:err.message});
  }
};
