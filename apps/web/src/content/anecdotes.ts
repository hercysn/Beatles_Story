import type { Locale } from "@/i18n/routing";

export type EvidenceStatus =
  | "Documented context"
  | "Corroborated recollection"
  | "Disputed recollection"
  | "Interpretive connection"
  | "Fandom theory";

export type AnecdoteSource = {
  title: string;
  detail: string;
};

export type AnecdoteFixture = {
  slug: string;
  title: string;
  hook: string;
  summary: string;
  dateLabel: string;
  people: string[];
  place: string;
  tone: string[];
  evidenceStatus: EvidenceStatus;
  beginnerRelevance: string;
  sections: {
    happened: string;
    whyInteresting: string;
    before: string;
    connection: string;
    documented: string[];
    interpretation: string[];
  };
  connectionChain: string[];
  sources: AnecdoteSource[];
  related: string[];
};

type AnecdoteCollectionLabels = {
  title: string;
  description: string;
  filtersTitle: string;
  filters: string[];
  readStory: string;
  detail: AnecdoteDetailLabels;
};

export type AnecdoteCollectionFixture = {
  labels: AnecdoteCollectionLabels;
  items: AnecdoteFixture[];
};

export type AnecdoteDetailLabels = {
  date: string;
  people: string;
  place: string;
  beginnerRelevance: string;
  happened: string;
  whyInteresting: string;
  before: string;
  connection: string;
  documented: string;
  interpretation: string;
  connectionChain: string;
  sources: string;
  related: string;
};

const parisEn: AnecdoteFixture = {
  slug: "much-better-place-paris",
  title: "A much better place, Paris",
  hook:
    "Decades after traveling to Paris with John, Paul unexpectedly named Paris while discussing a journey to a better place.",
  summary:
    "A small phrase links an early trip, later grief, and a fan interpretation of how memory can echo through interviews and songs.",
  dateLabel: "1961 and 2007",
  people: ["Paul McCartney", "John Lennon"],
  place: "Paris",
  tone: ["affectionate", "bittersweet", "easily overlooked"],
  evidenceStatus: "Interpretive connection",
  beginnerRelevance: "Good first anecdote",
  sections: {
    happened:
      "In the early 1960s, John and Paul traveled to Paris together, a trip that became part of the lore around their young friendship. Many years later, while talking about death and the song “The End of the End,” Paul mentioned Paris in the image of a better place.",
    whyInteresting:
      "The anecdote is not proof of a hidden message. Its value is smaller and more precise: it shows how one place can carry emotional weight across decades of Beatles history.",
    before:
      "Before world fame, John and Paul were still young Liverpool musicians building a shared language through travel, performance, jokes, and private reference points.",
    connection:
      "Fans often notice the Paris detail because it sits at the crossroads of early friendship, late-life reflection, and the temptation to read songs as private conversation.",
    documented: [
      "John and Paul made the Paris trip before Beatlemania.",
      "Paul later discussed “The End of the End” in interviews.",
      "The Paris mention is a real detail in later discussion of the song.",
    ],
    interpretation: [
      "The emotional connection between the Paris trip and the later interview is interpretive.",
      "The anecdote should not be presented as proof that the song is about John.",
    ],
  },
  connectionChain: [
    "1961 Paris trip",
    "later recollections of the trip",
    "“The End of the End”",
    "2007 interview mentioning Paris",
    "later fan interpretation",
  ],
  sources: [
    {
      title: "Paul McCartney interviews around Memory Almost Full",
      detail: "Primary interview context for “The End of the End.”",
    },
    {
      title: "Beatles chronology references",
      detail: "Background context for the early Paris trip.",
    },
  ],
  related: ["John and Paul", "Paris", "The End of the End", "Memory"],
};

const studioEn: AnecdoteFixture = {
  slug: "studio-as-pressure-cooker",
  title: "The studio as pressure cooker",
  hook:
    "The Beatles stopped touring and gained creative freedom, but the studio also made every difference in taste harder to avoid.",
  summary:
    "A beginner-friendly way into the late Beatles: the same room that made experimentation possible also concentrated pressure.",
  dateLabel: "1966-1969",
  people: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
  place: "Abbey Road",
  tone: ["revealing", "competitive"],
  evidenceStatus: "Documented context",
  beginnerRelevance: "Helpful background",
  sections: {
    happened:
      "After touring ended, recording sessions became the main place where the band could invent. Tape experiments, layered arrangements, and long studio hours expanded the music.",
    whyInteresting:
      "The change explains both the creative leap and the strain. The studio gave the group control, but it also turned taste, patience, and authorship into daily negotiations.",
    before:
      "Earlier Beatles records were shaped by a faster touring-and-recording cycle. By the late 1960s, the studio had become the center of the group’s work.",
    connection:
      "This context helps newcomers understand why beautiful late recordings can sit beside accounts of tension, boredom, or rivalry.",
    documented: [
      "The Beatles stopped regular touring in 1966.",
      "Late Beatles records used increasingly elaborate studio methods.",
      "Session accounts document both collaboration and disagreement.",
    ],
    interpretation: [
      "How much the studio caused the breakup is a matter of interpretation.",
      "Different memoirs and interviews emphasize different sources of tension.",
    ],
  },
  connectionChain: [
    "end of touring",
    "studio experimentation",
    "longer sessions",
    "creative disagreement",
    "late Beatles mythology",
  ],
  sources: [
    {
      title: "Session histories and interviews",
      detail: "Background for recording methods and studio atmosphere.",
    },
  ],
  related: ["Abbey Road", "Sgt. Pepper", "White Album", "Breakup"],
};

const parisZh: AnecdoteFixture = {
  ...parisEn,
  title: "巴黎，与更好的地方",
  hook:
    "多年以后，保罗谈到去往“更好的地方”时，意外提到了巴黎；而巴黎曾是他和约翰早年同行的重要记忆。",
  summary:
    "一个很小的词，把早年的旅行、晚年的回望，以及歌迷对歌曲和访谈回声的解读连接起来。",
  dateLabel: "1961 年与 2007 年",
  people: ["保罗·麦卡特尼", "约翰·列侬"],
  place: "巴黎",
  tone: ["亲近", "苦甜", "容易被忽略"],
  beginnerRelevance: "适合作为第一则轶事",
  sections: {
    happened:
      "20 世纪 60 年代初，约翰和保罗曾一起去巴黎旅行。许多年后，保罗谈到死亡和《The End of the End》时，在“更好的地方”的想象中提到了巴黎。",
    whyInteresting:
      "这则轶事并不能证明某个隐藏信息。它真正有趣的地方更细：同一个地点，如何在披头士故事里跨越几十年承载情绪重量。",
    before:
      "在成名之前，约翰和保罗还是两个利物浦年轻音乐人，通过旅行、演出、玩笑和私人的参照物建立共同语言。",
    connection:
      "歌迷会注意到巴黎，是因为这个细节站在早期友谊、晚年回望，以及把歌曲读成私人对话的冲动之间。",
    documented: [
      "约翰和保罗在 Beatlemania 之前有过巴黎之行。",
      "保罗后来在访谈中谈到过《The End of the End》。",
      "巴黎是后来谈及这首歌时出现过的真实细节。",
    ],
    interpretation: [
      "把巴黎之行和后来的访谈建立情感联系，属于解释。",
      "这则轶事不应被说成《The End of the End》写给约翰的证明。",
    ],
  },
  connectionChain: [
    "1961 年巴黎之行",
    "后来对这次旅行的回忆",
    "《The End of the End》",
    "2007 年访谈提到巴黎",
    "后来的歌迷解读",
  ],
  sources: [
    {
      title: "《Memory Almost Full》时期的保罗访谈",
      detail: "《The End of the End》的第一手访谈语境。",
    },
    {
      title: "披头士年表资料",
      detail: "早期巴黎之行的背景语境。",
    },
  ],
  related: ["约翰与保罗", "巴黎", "The End of the End", "记忆"],
};

const studioZh: AnecdoteFixture = {
  ...studioEn,
  title: "录音室也是压力锅",
  hook:
    "披头士停止巡演后获得了创作自由，但录音室也让每个人品味上的差异更难回避。",
  summary:
    "理解晚期披头士的一个入口：让实验成为可能的同一个房间，也把压力集中起来。",
  dateLabel: "1966-1969 年",
  people: ["约翰·列侬", "保罗·麦卡特尼", "乔治·哈里森", "林戈·斯塔尔"],
  place: "Abbey Road",
  tone: ["揭示性", "竞争"],
  beginnerRelevance: "有助于理解背景",
  sections: {
    happened:
      "停止巡演以后，录音室成为乐队发明音乐的主要场所。磁带实验、层层叠加的编曲和漫长的录音时间扩大了音乐的可能性。",
    whyInteresting:
      "这个变化同时解释了创作飞跃和关系压力。录音室给了他们控制权，也让品味、耐心和作者身份变成每天都要协商的问题。",
    before:
      "早期披头士唱片更多受巡演和快速录音周期影响。到 60 年代后期，录音室已经成为乐队工作的中心。",
    connection:
      "这个背景能帮助新读者理解：为什么晚期那些美丽录音，会和紧张、厌倦、竞争的叙述并存。",
    documented: [
      "披头士在 1966 年停止常规巡演。",
      "晚期唱片使用了越来越复杂的录音室方法。",
      "录音记录和访谈都显示合作与分歧并存。",
    ],
    interpretation: [
      "录音室压力在多大程度上导致解散，属于解释问题。",
      "不同回忆录和访谈会强调不同的矛盾来源。",
    ],
  },
  connectionChain: [
    "巡演结束",
    "录音室实验",
    "更长的录音时间",
    "创作分歧",
    "晚期披头士神话",
  ],
  sources: [
    {
      title: "录音记录与访谈",
      detail: "录音方法和录音室氛围的背景资料。",
    },
  ],
  related: ["Abbey Road", "Sgt. Pepper", "白色专辑", "解散"],
};

export const anecdoteFixtures: Record<Locale, AnecdoteCollectionFixture> = {
  en: {
    labels: {
      title: "Discover an anecdote",
      description:
        "Compact stories, hidden links, studio details, and historical echoes. Each one separates what is documented from what is interpretation.",
      filtersTitle: "Ways to browse",
      filters: [
        "person",
        "time period",
        "place",
        "song",
        "relationship",
        "tone",
        "evidence level",
      ],
      readStory: "Read the story",
      detail: {
        date: "Date",
        people: "People",
        place: "Place",
        beginnerRelevance: "Beginner relevance",
        happened: "What happened?",
        whyInteresting: "Why is it interesting?",
        before: "What came before?",
        connection: "The connection",
        documented: "What is documented?",
        interpretation: "What is interpretation?",
        connectionChain: "Connection chain",
        sources: "Sources",
        related: "Related",
      },
    },
    items: [parisEn, studioEn],
  },
  zh: {
    labels: {
      title: "读一则幕后小故事",
      description:
        "短小但有记忆点的故事：隐藏关联、录音室细节和历史回声。每一则都会区分已记录事实和解释。",
      filtersTitle: "浏览方式",
      filters: ["人物", "时期", "地点", "歌曲", "关系", "语气", "证据等级"],
      readStory: "阅读故事",
      detail: {
        date: "日期",
        people: "人物",
        place: "地点",
        beginnerRelevance: "新读者入口",
        happened: "发生了什么？",
        whyInteresting: "为什么有意思？",
        before: "之前发生了什么？",
        connection: "这条连接",
        documented: "哪些是已有记录？",
        interpretation: "哪些是解释？",
        connectionChain: "连接链",
        sources: "来源",
        related: "相关内容",
      },
    },
    items: [parisZh, studioZh],
  },
};

export function getAnecdoteCollection(locale: Locale) {
  return anecdoteFixtures[locale] ?? anecdoteFixtures.en;
}

export function getAnecdote(locale: Locale, slug: string) {
  return getAnecdoteCollection(locale).items.find((item) => item.slug === slug);
}

export function getAnecdoteSlugs() {
  return anecdoteFixtures.en.items.map((item) => item.slug);
}
