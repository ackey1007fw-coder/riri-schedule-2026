export type GojetPerformance = {
  time: string;
  team: string;
};

export type GojetTimetableDay = {
  /** YYYY-MM-DD（JST） */
  date: string;
  label: string;
  performances: GojetPerformance[];
};

export const gojetTicketUrl = "https://premiumgoyukajet.hp.peraichi.com";

export const gojetOpeningDate = "2026-07-23";
export const gojetClosingDate = "2026-07-27";

// タイムテーブル（yukako-gojet-poster.jpg の記載どおり）
export const gojetTimetable: GojetTimetableDay[] = [
  {
    date: "2026-07-23",
    label: "7/23（木）",
    performances: [
      { time: "15:30", team: "A班" },
      { time: "19:00", team: "B班" }
    ]
  },
  {
    date: "2026-07-24",
    label: "7/24（金）",
    performances: [
      { time: "12:00", team: "C班" },
      { time: "15:30", team: "B班" },
      { time: "19:00", team: "A班" }
    ]
  },
  {
    date: "2026-07-25",
    label: "7/25（土）",
    performances: [
      { time: "12:00", team: "B班" },
      { time: "15:30", team: "A班" },
      { time: "19:00", team: "C班" }
    ]
  },
  {
    date: "2026-07-26",
    label: "7/26（日）",
    performances: [
      { time: "12:00", team: "C班" },
      { time: "15:30", team: "A班" },
      { time: "19:00", team: "B班" }
    ]
  },
  {
    date: "2026-07-27",
    label: "7/27（月）",
    performances: [
      { time: "18:00", team: "C班" },
      { time: "20:00", team: "全班合同LIVE" }
    ]
  }
];
