import type { StoryRoute } from "@beatles-story/shared-types";

import type { Locale } from "@/i18n/routing";

type HomeLink = {
  label: string;
  href: StoryRoute;
};

type StartingPoint = HomeLink & {
  eyebrow: string;
  description: string;
};

type FeaturedMoment = {
  title: string;
  summary: string;
  context: string;
  evidenceLabel: string;
  href: StoryRoute;
};

type TurningPoint = {
  year: string;
  title: string;
  description: string;
};

type RecentDiscovery = {
  title: string;
  description: string;
  evidenceLabel: string;
};

export type HomeFixture = {
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    primaryLinks: HomeLink[];
  };
  startingPoints: {
    title: string;
    items: StartingPoint[];
  };
  featuredMoment: {
    title: string;
    item: FeaturedMoment;
  };
  turningPoints: {
    title: string;
    items: TurningPoint[];
  };
  johnPaul: {
    title: string;
    description: string;
    points: string[];
  };
  explore: {
    title: string;
    items: string[];
  };
  recentDiscoveries: {
    title: string;
    items: RecentDiscovery[];
  };
  evidence: {
    title: string;
    description: string;
    labels: string[];
  };
};

export const homeFixtures: Record<Locale, HomeFixture> = {
  en: {
    hero: {
      eyebrow: "A storytelling guide",
      title: "Understand the Beatles. Follow John and Paul.",
      text: "Begin with the story, the partnership, and the small details that make the Beatles feel newly alive.",
      primaryLinks: [
        { label: "Start with the Beatles", href: "/start" },
        { label: "Start with John and Paul", href: "/john-and-paul" },
        { label: "Discover an anecdote", href: "/anecdotes" },
      ],
    },
    startingPoints: {
      title: "Choose your starting point",
      items: [
        {
          eyebrow: "10-15 min",
          label: "Start with the Beatles",
          href: "/start",
          description:
            "Follow the essential arc from Liverpool and Hamburg to Beatlemania, studio reinvention, Apple, and the final recordings.",
        },
        {
          eyebrow: "12-20 min",
          label: "Start with John and Paul",
          href: "/john-and-paul",
          description:
            "Trace the partnership through closeness, rivalry, fame, distance, songs-as-conversation, and later memory.",
        },
        {
          eyebrow: "Quick read",
          label: "Discover an anecdote",
          href: "/anecdotes",
          description:
            "Begin with a compact story: a revealing detail, a hidden connection, or a small moment that reframes the larger history.",
        },
      ],
    },
    featuredMoment: {
      title: "A moment you may have missed",
      item: {
        title: "A much better place, Paris",
        summary:
          "Decades after traveling to Paris with John, Paul unexpectedly named Paris while discussing a journey to a better place.",
        context:
          "The detail matters because it connects early friendship, later memory, and the way fans interpret echoes across songs and interviews.",
        evidenceLabel: "Interpretive connection",
        href: "/anecdotes",
      },
    },
    turningPoints: {
      title: "The story in ten turning points",
      items: [
        {
          year: "1957",
          title: "John meets Paul",
          description:
            "A local church fete becomes the origin point of the central creative partnership.",
        },
        {
          year: "1960",
          title: "Hamburg transforms the group",
          description: "Long nights onstage harden the band into a live force.",
        },
        {
          year: "1964",
          title: "Beatlemania becomes global",
          description:
            "The group turns from British phenomenon into worldwide cultural shorthand.",
        },
        {
          year: "1966",
          title: "The studio becomes an instrument",
          description:
            "Touring gives way to experiments that could only exist on record.",
        },
        {
          year: "1969",
          title: "The final recordings",
          description:
            "Collaboration, tension, and farewell overlap in the last studio work.",
        },
      ],
    },
    johnPaul: {
      title: "Why John and Paul still fascinate people",
      description:
        "Their story is not only about authorship. It is about two ambitious people building a shared language, competing inside it, and leaving songs that listeners still read as dialogue.",
      points: [
        "Documented friendship",
        "Creative rivalry",
        "Emotional ambiguity",
      ],
    },
    explore: {
      title: "Explore through songs, places, and relationships",
      items: [
        "Liverpool",
        "Hamburg",
        "Paris",
        "Abbey Road",
        "Lennon-McCartney",
        "McLennon",
      ],
    },
    recentDiscoveries: {
      title: "Recently added discoveries",
      items: [
        {
          title: "The Paris thread",
          description:
            "A compact connection chain linking travel, memory, song, and later interviews.",
          evidenceLabel: "Mixed evidence",
        },
        {
          title: "Studio as pressure cooker",
          description:
            "A beginner-friendly route into how technical experiments changed the relationships.",
          evidenceLabel: "Documented context",
        },
        {
          title: "Songs as conversation",
          description:
            "A guide to reading later Lennon and McCartney songs without flattening debate into fact.",
          evidenceLabel: "Interpretive lens",
        },
      ],
    },
    evidence: {
      title: "How we distinguish fact from interpretation",
      description:
        "Stories should feel alive, but the site keeps documented facts, recollections, disputed memories, and interpretations visibly separate.",
      labels: [
        "Documented",
        "Corroborated",
        "Disputed",
        "Interpretive",
        "Fandom theory",
      ],
    },
  },
  zh: {
    hero: {
      eyebrow: "从故事进入",
      title: "读懂披头士，从约翰与保罗开始。",
      text: "一份循序渐进的导览：从音乐、关系、轶事和隐藏连接，进入这段至今仍让人着迷的故事。",
      primaryLinks: [
        { label: "先认识披头士", href: "/start" },
        { label: "走近约翰与保罗", href: "/john-and-paul" },
        { label: "读一则幕后小故事", href: "/anecdotes" },
      ],
    },
    startingPoints: {
      title: "选择你的入口",
      items: [
        {
          eyebrow: "10-15 分钟",
          label: "先认识披头士",
          href: "/start",
          description:
            "从利物浦、汉堡、Beatlemania 到录音室实验、Apple 与最后的录音，先抓住主线。",
        },
        {
          eyebrow: "12-20 分钟",
          label: "走近约翰与保罗",
          href: "/john-and-paul",
          description:
            "看见这段搭档关系里的亲近、竞争、成名后的失衡，以及歌曲之间若有若无的对话。",
        },
        {
          eyebrow: "快速阅读",
          label: "读一则幕后小故事",
          href: "/anecdotes",
          description:
            "从一个短小但有记忆点的细节开始：隐藏关联、录音室瞬间，或重新照亮大历史的小片段。",
        },
      ],
    },
    featuredMoment: {
      title: "你可能错过的一个瞬间",
      item: {
        title: "巴黎，与更好的地方",
        summary:
          "多年以后，保罗谈到去往“更好的地方”时，意外提到了巴黎；而巴黎曾是他和约翰早年同行的重要记忆。",
        context:
          "这个细节之所以迷人，是因为它把早期友谊、后来的回忆，以及歌迷对歌曲和访谈之间回声的解读连接到了一起。",
        evidenceLabel: "解释性连接",
        href: "/anecdotes",
      },
    },
    turningPoints: {
      title: "十个转折点里的故事",
      items: [
        {
          year: "1957",
          title: "约翰遇见保罗",
          description: "一场本地教堂活动，成了这段核心创作关系的起点。",
        },
        {
          year: "1960",
          title: "汉堡改变了乐队",
          description: "漫长的夜场演出，让他们真正成为一支现场乐队。",
        },
        {
          year: "1964",
          title: "Beatlemania 席卷世界",
          description: "他们从英国现象变成了全球文化符号。",
        },
        {
          year: "1966",
          title: "录音室变成乐器",
          description: "巡演退场，只有唱片才能完成的实验开始成为中心。",
        },
        {
          year: "1969",
          title: "最后的录音",
          description: "合作、紧张和告别，在最后的录音室作品里交叠出现。",
        },
      ],
    },
    johnPaul: {
      title: "为什么约翰与保罗仍然让人着迷",
      description:
        "这不只是署名问题。更吸引人的，是两个人如何建立共同语言，又在其中竞争、拉扯，并留下至今仍被听众读成对话的歌曲。",
      points: ["有记录的友谊", "创作上的竞争", "情感上的暧昧空间"],
    },
    explore: {
      title: "从歌曲、地点和关系进入",
      items: [
        "利物浦",
        "汉堡",
        "巴黎",
        "Abbey Road",
        "Lennon-McCartney",
        "McLennon",
      ],
    },
    recentDiscoveries: {
      title: "最近加入的发现",
      items: [
        {
          title: "巴黎这条线索",
          description: "一条把旅行、记忆、歌曲和后期访谈串起来的简短连接链。",
          evidenceLabel: "混合证据",
        },
        {
          title: "录音室作为压力场",
          description: "从技术实验进入人际变化，对新读者更友好。",
          evidenceLabel: "有记录的背景",
        },
        {
          title: "像对话一样听歌",
          description:
            "学习阅读约翰和保罗后期歌曲里的回声，同时不把争议说成定论。",
          evidenceLabel: "解释性视角",
        },
      ],
    },
    evidence: {
      title: "我们如何区分事实与解读",
      description:
        "故事可以有情绪，但事实、回忆、争议和解释必须分开呈现。这样读者能被故事吸引，也能看清证据在哪里。",
      labels: ["有文献记录", "多方印证", "存在争议", "解释性阅读", "歌迷理论"],
    },
  },
};

export function getHomeFixture(locale: Locale) {
  return homeFixtures[locale];
}
