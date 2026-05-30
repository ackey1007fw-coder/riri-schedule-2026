import type { ScheduleEvent } from "../types";

const driveImage = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const events: ScheduleEvent[] = [
  {
    id: "showroom-dreamisland-2026-06-04",
    title: "SHOWROOM「夢の国に遊びに行こう！テーマパークペアチケット＆駅中広告ポスター掲載権獲得イベント！」",
    shortTitle: "夢の国イベント",
    category: "event",
    startAt: "2026-06-04T18:00:00+09:00",
    endAt: "2026-06-10T21:59:00+09:00",
    displayDate: "2026年6月4日（木）18:00〜6月10日（水）21:59",
    image: driveImage("1hg7CCMX-vtLQo1CajCz0rc8_FZCddz-W"),
    summary: "SHOWROOMのイベントでランキング1位になると、夢のテーマパークへのペアチケットをプレゼント！お姉ちゃんと一緒に行けるよう、配信を見て全力で応援しよう。",
    badges: ["SHOWROOM", "イベント", "6/4〜6/10", "ランキング"],
    links: [
      { label: "イベントページ", url: "https://www.showroom-live.com/event/dreamisland6", kind: "stream" },
      { label: "SHOWROOMへ", url: "https://www.showroom-live.com/room/profile?room_id=550336", kind: "stream" }
    ],
    isImportant: true
  },

  {
    id: "yofukashi-campus-2026-05-09",
    title: "ã¿ã¤ãã¨ãªãªãã®å¤ãµããã­ã£ã³ãã¹ vol.2 æ¥ã®æ°å­¦æããããSP",
    shortTitle: "å¤ãµããã­ã£ã³ãã¹",
    category: "radio",
    startAt: "2026-05-09T17:00:00+09:00",
    endAt: "2026-05-09T19:45:00+09:00",
    displayDate: "2026å¹´5æ9æ¥ï¼åï¼17:00ãã",
    venue: "WALLOPæ¼ä¸ã¹ã¿ã¸ãª",
    image: driveImage("1A8rODe-N__YMWSjNEL5hNeT0U5gaT7Ka"),
    summary:
      "å¬éåé²ã¨ç¹å¸ä¼ãäºå®ãå¬éåé²ã¯17:00ãã18:00ãç¹å¸ä¼ã¯18:15ãã19:45ã§ãã",
    badges: ["NEXT", "ã©ã¸ãª", "å¬éåé²", "ç¹å¸ä¼"],
    links: [
      {
        label: "tigetã§äºç´",
        url: "https://tiget.net/events/481711",
        kind: "ticket"
      },
      {
        label: "WALLOPãã¼ã¸",
        url: "https://www.wallop.tv/",
        kind: "info"
      }
    ],
    isNextFocus: true
  },
  {
    id: "theoridea-2026-05-14",
    title: "åå ´å¬æ¼ãã®ãªã·ã£ç¥è©±æ¦è¨ããªãªãã¢ ã¢ãã©ã³ãã£ã¹ã®æ®é¿ã",
    shortTitle: "ããªãªãã¢",
    category: "stage",
    startAt: "2026-05-14T18:30:00+09:00",
    endAt: "2026-05-17T20:30:00+09:00",
    displayDate: "2026å¹´5æ14æ¥ï¼æ¨ï¼ãã5æ17æ¥ï¼æ¥ï¼",
    venue: "è¬åå ´ï¼å¤§å¡ï¼",
    image: driveImage("1AzWL5zxhUWd2l4_Clk6SfR-eNsjwuRmg"),
    summary:
      "åææ¦ã®èå°åºæ¼ã5æ16æ¥ã¯Special Liveå¬æ¼ã5æ17æ¥ã¯åç§æ¥½ãç¾å°ãã±ããã¨éä¿¡ãã±ãããããã¾ãã",
    badges: ["èå°", "ãã±ããçºå£²ä¸­", "éä¿¡ãã", "éè¦"],
    links: [
      {
        label: "ãã±ããäºç´",
        url: "https://www.quartet-online.net/ticket/sankyou2026?m=03hggeh",
        kind: "ticket"
      },
      {
        label: "éä¿¡ãã±ãã",
        url: "https://twitcasting.tv/",
        kind: "stream"
      },
      {
        label: "ä¼å ´ã¢ã¯ã»ã¹",
        url: "https://yorozu-s.com/",
        kind: "info"
      }
    ],
    isImportant: true
  },
  {
    id: "aitoki-2026-05-29",
    title: "æã·ã¢å¥åç¬¬ä¸éãI'm talking about lovin'ã",
    shortTitle: "æã·ã¢å¥å",
    category: "stage",
    startAt: "2026-05-29T19:00:00+09:00",
    endAt: "2026-06-02T21:00:00+09:00",
    displayDate: "2026å¹´5æ29æ¥ï¼éï¼ãã6æ2æ¥ï¼ç«ï¼",
    venue: "è¥¿è»çªª éç©ºéããã³ã",
    image: driveImage("1hPMNv9kiFKfBKgp7CLfjv7zJBtTOKCx_"),
    summary:
      "é³æ¥½ã¨æ¼åãåããã£ãå¬æ¼ãAsideã¨ãã¦åºæ¼äºå®ãå¨8åå¬æ¼ãåå£²å¸ã¯6,000åã§ãã",
    badges: ["èå°", "åè¡è²©å£²ä¸­", "å¨8å", "ã¢ã¤ãã­"],
    links: [
      {
        label: "ãã±ããè³¼å¥",
        url: "https://livepocket.jp/t/aitoki",
        kind: "ticket"
      },
      {
        label: "KAIGYAC STAGE X",
        url: "https://x.com/kaigyacstage",
        kind: "sns"
      }
    ],
    isImportant: true
  },
  {
    id: "birthday-2026-06-24",
    title: "ããã¡ããã®ãèªçæ¥",
    shortTitle: "èªçæ¥",
    category: "birthday",
    startAt: "2026-06-24T00:00:00+09:00",
    endAt: "2026-06-24T23:59:59+09:00",
    displayDate: "2026å¹´6æ24æ¥ï¼æ°´ï¼",
    image: driveImage("1rUFypXYABEcyRUaxhie6o_jaNBTAWR16"),
    summary:
      "SNSãSHOWROOMã§ãç¥ãã®æ°æã¡ãå±ãããæ¥ãã«ã¦ã³ããã¦ã³ã¨ä¸ç·ã«æºåã§ãã¾ãã",
    badges: ["ç¹å¥", "Birthday"],
    links: [
      {
        label: "Xã§ãç¥ããè¦ã",
        url: "https://x.com/frecam2025_0306",
        kind: "sns"
      },
      {
        label: "SHOWROOMã¸",
        url: "https://www.showroom-live.com/room/profile?room_id=550336",
        kind: "stream"
      }
    ]
  },
  {
    id: "fukurow-fm-2026-04-21",
    title: "ãµãããFMãã¹ãã© HAPPYStyleï¼ CatchTheHeartãå¬éåé²ï¼ãã§ã­ä¼ï¼ç¹å¸ä¼",
    shortTitle: "ãµãããFMå¬éåé²",
    category: "radio",
    startAt: "2026-04-21T18:00:00+09:00",
    endAt: "2026-04-21T21:00:00+09:00",
    displayDate: "2026å¹´4æ21æ¥ï¼ç«ï¼",
    venue: "ææ©ã¹ã¿ã¸ãª",
    image: driveImage("1uaNFIH1HkefOjn06tXwSJZvq8eIGjLBA"),
    summary:
      "å¬éåé²ããã§ã­ä¼ãç¹å¸ä¼ã«åºæ¼ãã¢ã¼ã«ã¤ããããå ´åã¯é æ¹ããããã§ãã¯ã§ãã¾ãã",
    badges: ["ã©ã¸ãª", "å¬éåé²", "ç¹å¸ä¼", "ã¢ã¼ã«ã¤ã"],
    links: [
      {
        label: "ãµãããFMãã¼ã¸",
        url: "https://fukurowfm.co.jp/",
        kind: "info"
      },
      {
        label: "Xã§è©³ç´°",
        url: "https://x.com/frecam2025_0306",
        kind: "sns"
      }
    ]
  },
  {
    id: "tvk-nekohita-2026-04-16",
    title: "ãã¬ãç¥å¥å·ãç«ã®ã²ããã»ã©ã¯ã¤ãNEOããå¤©æ°ã³ã¼ãã¼",
    shortTitle: "tvkç«ã²ã",
    category: "tv",
    startAt: "2026-04-16T12:00:00+09:00",
    endAt: "2026-04-16T13:30:00+09:00",
    displayDate: "2026å¹´4æ16æ¥ï¼æ¨ï¼12:00ãã13:30",
    image: driveImage("1R8gptDr0DxZ71Ncuw8koDmgKo-lDjoYi"),
    summary:
      "SHOWROOMã¤ãã³ãã®ç¹å¸ã¨ãã¦çæ¾éãã¬ãåºæ¼ããå¤©æ°ã³ã¼ãã¼ã«ç»å ´ãã¾ããã",
    badges: ["ãã¬ã", "çæ¾é", "ãå¤©æ°"],
    links: [
      {
        label: "tvkãã¼ã¸",
        url: "https://www.tvk-yokohama.com/",
        kind: "info"
      }
    ]
  },
  {
    id: "imacampus-2026-04-12",
    title: "MBSã©ã¸ãªãã¤ããã­ã ã­ã£ã³ãã¹ãã¤ãã",
    shortTitle: "ã¤ãã­ã£ã³",
    category: "radio",
    startAt: "2026-04-12T23:30:00+09:00",
    endAt: "2026-04-13T00:00:00+09:00",
    displayDate: "2026å¹´4æ12æ¥ï¼æ¥ï¼23:30ãã24:00",
    image: driveImage("1FM8cYikXk6Z2TtAoHCpBkq_XOT_AmqbS"),
    summary:
      "éå­¦å¨è¾ºã®ããããã°ã«ã¡ãªã©ãèªã£ãã©ã¸ãªåºæ¼åãå£°ã®é­åãæ¥½ãããæ¾éã§ãã",
    badges: ["ã©ã¸ãª", "æ¾éæ¸ã¿", "radiko"],
    links: [
      {
        label: "radikoã§æ¢ã",
        url: "https://radiko.jp/",
        kind: "stream"
      }
    ]
  },
  {
    id: "steenz-2026-04-08",
    title: "steenz åæè¨äºå¬éããã¬ã­ã£ã³ã",
    shortTitle: "steenzè¨äºå¬é",
    category: "web",
    startAt: "2026-04-08T10:00:00+09:00",
    endAt: "2026-04-08T23:59:59+09:00",
    displayDate: "2026å¹´4æ8æ¥ï¼æ°´ï¼",
    image: driveImage("1Amj4Ddj1QaQpv2IXO9qw2vHwS0wMXwGv"),
    summary:
      "ã³ã³ãã¹ãã§ã®åè³ããéå±±å­¦é¢å¤§å­¦çã¨ãã¦ã®ç´ é¡ãå½¹èãç®æãæ³ããèª­ããã¤ã³ã¿ãã¥ã¼è¨äºã§ãã",
    badges: ["WEB", "ã¤ã³ã¿ãã¥ã¼", "å¬éä¸­"],
    links: [
      {
        label: "steenzã§èª­ã",
        url: "https://steenz.jp/",
        kind: "info"
      }
    ]
  },
  {
    id: "kyanly-2026-03-14",
    title: "KYANLYãã¡ã³æè¬ç¥­2026 éåä¼ï¼ãã§ã­ä¼",
    shortTitle: "KYANLYæè¬ç¥­",
    category: "event",
    startAt: "2026-03-14T11:00:00+09:00",
    endAt: "2026-03-14T16:00:00+09:00",
    displayDate: "2026å¹´3æ14æ¥ï¼åï¼11:00ãã16:00",
    venue: "æ±äº¬é½ç«å·å¸ å±å¤æ½è¨­",
    image: driveImage("1D9t__MTdyoBzSHyK9-gxTWetikuHYnZ7"),
    summary:
      "ã¹ãã¼ããã¼ã¨ãã§ã­æ®å½±ä¼ã«åºæ¼ãã©ã³ã¦ã§ã¤å§¿ã¯KYANLYã®åç»ã§ããã§ãã¯ã§ãã¾ãã",
    badges: ["ã¤ãã³ã", "éåä¼", "ãã§ã­ä¼"],
    links: [
      {
        label: "KYANLY YouTube",
        url: "https://www.youtube.com/@kyanly_ch",
        kind: "stream"
      }
    ]
  }
];
