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
  url?: string;
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

const englishAnecdotes: AnecdoteFixture[] = [
  {
    slug: "much-better-place-paris",
    title: "A much better place, Paris",
    hook:
      "Decades after traveling to Paris with John, Paul unexpectedly named Paris while discussing a journey to a better place.",
    summary:
      "A small phrase links an early trip, late-life reflection, and a fan interpretation of how memory can echo through interviews and songs.",
    dateLabel: "1961 and 2007",
    people: ["Paul McCartney", "John Lennon"],
    place: "Paris",
    tone: ["affectionate", "bittersweet", "easily overlooked"],
    evidenceStatus: "Interpretive connection",
    beginnerRelevance: "Good first anecdote",
    sections: {
      happened:
        "In a 2007 French television interview about “The End of the End,” Paul was asked about death as a journey to a much better place. He joked about France, Spain through France, and then paused on Paris.",
      whyInteresting:
        "The documented moment is small, but the possible emotional resonance reaches back nearly five decades to John and Paul’s 1961 Paris trip.",
      before:
        "Before Beatlemania, John and Paul had planned to travel onward to Spain but stayed in Paris during John’s twenty-first-birthday trip.",
      connection:
        "The anecdote works because it separates the visible fact from the interpretive layer: Paul named Paris, and fans may connect that place to a formative shared memory with John.",
      documented: [
        "Paul explicitly named Paris in the interview context around “The End of the End.”",
        "John and Paul traveled to Paris together in 1961.",
        "The trip happened before the Beatles became famous.",
      ],
      interpretation: [
        "Whether Paul consciously meant to evoke John or the 1961 trip cannot be proved.",
        "The anecdote should not be presented as confirmation that the song is about John.",
      ],
    },
    connectionChain: [
      "1961 Paris trip",
      "John’s twenty-first birthday",
      "“The End of the End”",
      "2007 interview mentioning Paris",
      "later fan interpretation",
    ],
    sources: [
      {
        title: "Beatles Abbey interview excerpt and transcript context",
        detail: "Context for Paul’s Paris answer while discussing the song.",
        url: "https://www.beatlesabbey.com/p/1526",
      },
      {
        title: "Paris in John and Paul’s life",
        detail: "Fan research collection tracing Paris references.",
        url: "https://www.tumblr.com/mclennonlgbt/748378131777404928/paris-in-john-and-pauls-life",
      },
    ],
    related: ["John and Paul", "Paris", "The End of the End", "Memory"],
  },
  {
    slug: "paul-george-hitchhiking-shock",
    title: "Paul and George go down South",
    hook:
      "Teenage Paul and George hitchhiked through Britain, and one slow lift left George with a shocking zipper-shaped memory.",
    summary:
      "A funny travel story becomes a useful example of pre-fame friendship, imperfect memory, and Paul’s continuing storytelling about George.",
    dateLabel: "Late 1950s and 2026",
    people: ["Paul McCartney", "George Harrison", "Olivia Harrison"],
    place: "Wales, Devon, and southwest England",
    tone: ["funny", "revealing", "easily overlooked"],
    evidenceStatus: "Corroborated recollection",
    beginnerRelevance: "Good character story",
    sections: {
      happened:
        "As teenagers, Paul and George took hitchhiking holidays through Wales and southwest England. Paul later recalled one ride on an electric milk float: George sat over the battery, and the metal zipper on his jeans connected with the terminals and gave him an electric shock.",
      whyInteresting:
        "The image is comic, but it also places Paul and George before fame: two young friends with guitars, little money, and a willingness to travel by whatever lift they could find.",
      before:
        "George had known Paul before he entered the Beatles story through John. Their friendship and travel memories formed independently of Beatlemania.",
      connection:
        "Paul’s recent retelling also points to how Beatles history is preserved through overlapping memories. Olivia Harrison reportedly remembered the incident as happening to Paul, prompting Paul to note how memories can morph.",
      documented: [
        "Paul and George took teenage hitchhiking trips.",
        "George recalled traveling toward Devon and Exmouth.",
        "Paul later retold the electric shock story in detail.",
      ],
      interpretation: [
        "The exact physical details depend on later recollection.",
        "The point is not that George’s trousers caught fire, but that the zipper conducted an electric charge.",
      ],
    },
    connectionChain: [
      "teenage Paul and George friendship",
      "hitchhiking holidays",
      "electric milk float",
      "George’s zipper shock",
      "Paul retells the memory decades later",
    ],
    sources: [
      {
        title: "Paul’s filmed retelling",
        detail: "Video context for Paul revisiting the hitchhiking story.",
        url: "https://www.youtube.com/watch?v=kSp9K058Tbk",
      },
      {
        title: "Entertainment Weekly report",
        detail: "Contemporary account of Paul’s detailed retelling.",
        url: "https://ew.com/paul-mccartney-says-george-harrison-butt-once-got-electrocuted-by-battery-hitchhiking-11975831",
      },
      {
        title: "George’s Devon recollection",
        detail: "Background on George and Paul traveling toward Exmouth.",
        url: "https://www.cocosse.com/2016/08/hitchhiking-george-harrison-paul-mccartney/",
      },
    ],
    related: ["Paul and George", "Hitchhiking", "Memory", "Pre-fame"],
  },
  {
    slug: "john-21st-birthday-paris",
    title: "John spends his birthday money on Paris with Paul",
    hook:
      "John received a substantial twenty-first-birthday gift and chose Paul as his traveling companion.",
    summary:
      "The 1961 Paris trip links John’s personal attachment to Paul, their pre-fame self-image, and the look the Beatles would soon adopt.",
    dateLabel: "30 September-October 1961",
    people: ["John Lennon", "Paul McCartney", "Jürgen Vollmer", "Aunt Mimi"],
    place: "Paris",
    tone: ["affectionate", "revealing", "formative"],
    evidenceStatus: "Documented context",
    beginnerRelevance: "Core John-Paul anecdote",
    sections: {
      happened:
        "Before John’s twenty-first birthday, he received £100 as a gift and invited Paul to travel with him. They left Liverpool intending to reach Spain, stopped in Paris, and stayed there through John’s birthday.",
      whyInteresting:
        "John could have spent the money on himself, instruments, or records. Instead, he used it for a trip with Paul at a moment when both were moving out of adolescence and toward the Beatles’ rise.",
      before:
        "The Beatles were still a Liverpool and Hamburg story, not yet a global phenomenon. John and Paul were temporarily away from the band’s usual pressures.",
      connection:
        "In Paris they met Jürgen Vollmer, whose combed-forward hairstyle influenced the Beatles’ later look. The trip therefore connects private friendship to public image-making.",
      documented: [
        "John and Paul left Liverpool for Paris on 30 September 1961.",
        "John spent his twenty-first birthday in Paris with Paul.",
        "The trip is tied to the hairstyle influence associated with Jürgen Vollmer.",
      ],
      interpretation: [
        "John choosing Paul as his companion illuminates closeness without proving any single theory about the relationship.",
        "The emotional meaning of the surviving photographs remains interpretive.",
      ],
    },
    connectionChain: [
      "John receives £100",
      "John invites Paul",
      "planned Spain trip",
      "Paris stay",
      "Vollmer hairstyle influence",
      "Beatles visual identity",
    ],
    sources: [
      {
        title: "John and Paul travel to Paris",
        detail: "Chronology for the departure and original plan to reach Spain.",
        url: "https://www.beatlesbible.com/1961/09/30/john-lennon-paul-mccartney-travel-paris/",
      },
      {
        title: "John’s twenty-first birthday in Paris",
        detail: "Chronology for John’s birthday with Paul in Paris.",
        url: "https://www.beatlesbible.com/1961/10/09/john-lennon-21st-birthday-paris-paul-mccartney/",
      },
    ],
    related: ["John and Paul", "Paris", "Jürgen Vollmer", "Beatles image"],
  },
  {
    slug: "coming-up-pulls-john-back",
    title: "“Coming Up” pulls John back toward recording",
    hook:
      "Paul’s odd, energetic 1980 single caught John’s attention and may have helped restart their final creative conversation.",
    summary:
      "John’s response to “Coming Up” shows that admiration and rivalry could still travel through records after the Beatles.",
    dateLabel: "1980",
    people: ["Paul McCartney", "John Lennon", "Yoko Ono"],
    place: "New York and England",
    tone: ["competitive", "revealing", "bittersweet"],
    evidenceStatus: "Corroborated recollection",
    beginnerRelevance: "Good songs-as-conversation example",
    sections: {
      happened:
        "Paul released the experimental studio recording of “Coming Up” in 1980. John responded warmly to it, singling it out in his final major Playboy interview rather than dismissing Paul’s post-Beatles music.",
      whyInteresting:
        "The episode suggests that John and Paul’s creative rivalry continued even after years apart. Paul made something unexpected, John listened closely, and the old stimulus of being challenged by the other seems to have mattered.",
      before:
        "John had spent several years away from regular recording. In 1980 he returned to sustained work and completed “Double Fantasy” with Yoko Ono.",
      connection:
        "The defensible claim is not that “Coming Up” alone caused John’s return. It was one significant creative stimulus among several personal and artistic motivations.",
      documented: [
        "“Coming Up” was released in 1980.",
        "John singled out the song when discussing Paul’s work.",
        "John returned to recording during the same final year.",
      ],
      interpretation: [
        "The degree to which the song motivated John cannot be measured exactly.",
        "Yoko, family life, new songs, and other motivations also shaped John’s return.",
      ],
    },
    connectionChain: [
      "Paul records “Coming Up”",
      "John hears the single",
      "John praises it in 1980",
      "competitive creative spark",
      "John returns to sustained recording",
      "Double Fantasy",
    ],
    sources: [
      {
        title: "John Lennon Playboy interview",
        detail: "John’s 1980 comments about Paul’s work and “Coming Up.”",
        url: "https://www.beatlesinterviews.org/db1980.jlpb.beatles.html",
      },
      {
        title: "MusicRadar account",
        detail: "Later account framing the song as a final Lennon-McCartney creative exchange.",
        url: "https://www.musicradar.com/artists/singers-songwriters/apparently-it-was-the-one-song-that-got-john-recording-again-i-think-john-just-thought-uh-oh-i-had-better-get-working-too-the-story-of-the-last-entry-in-lennon-and-mccartneys-musical-conversation",
      },
    ],
    related: ["Coming Up", "Double Fantasy", "Songs as conversation", "1980"],
  },
  {
    slug: "john-paul-meet-1957",
    title: "John and Paul meet at Woolton fête",
    hook:
      "On 6 July 1957, a local church fête became the origin point of Lennon-McCartney and the Beatles story.",
    summary:
      "The meeting is precisely dated, modest in setting, and enormous in consequence: one teenager impressed another with a tuned guitar and a rock-and-roll song.",
    dateLabel: "6 July 1957",
    people: ["John Lennon", "Paul McCartney", "Ivan Vaughan", "The Quarry Men"],
    place: "Woolton, Liverpool",
    tone: ["formative", "revealing", "documented"],
    evidenceStatus: "Documented context",
    beginnerRelevance: "Essential starting point",
    sections: {
      happened:
        "Fifteen-year-old Paul attended the Woolton Parish Church garden fête, where sixteen-year-old John was performing with the Quarry Men. Ivan Vaughan introduced them in the church hall after the performance.",
      whyInteresting:
        "Paul could play, tune a guitar properly, and reportedly performed songs including Eddie Cochran’s “Twenty Flight Rock.” John was impressed, while also weighing whether another strong musician might challenge his leadership.",
      before:
        "John was leading the Quarry Men, and Paul was not yet part of the group. The meeting happened in a local teenage music world rather than in any professional setting.",
      connection:
        "Nearly every later John-Paul connection follows from this moment: the songwriting partnership, George’s entry through Paul, the Beatles’ development, and the mix of admiration and competition that shaped their work.",
      documented: [
        "John and Paul met on 6 July 1957.",
        "Ivan Vaughan introduced them after the Quarry Men performance.",
        "Paul was later invited to join the Quarry Men.",
      ],
      interpretation: [
        "Accounts differ in small performance details, including exact songs and emphasis.",
        "The emotional meaning of the meeting grows from hindsight, even though the event itself is well documented.",
      ],
    },
    connectionChain: [
      "Woolton Parish Church fête",
      "Quarry Men performance",
      "Ivan Vaughan introduces Paul",
      "Paul impresses John",
      "Paul joins the Quarry Men",
      "Lennon-McCartney begins",
    ],
    sources: [
      {
        title: "National Museums Liverpool account",
        detail: "Museum summary of when Paul McCartney met John Lennon.",
        url: "https://www.liverpoolmuseums.org.uk/stories/when-paul-mccartney-met-john-lennon",
      },
      {
        title: "The Beatles Bible chronology",
        detail: "Detailed chronology of 6 July 1957.",
        url: "https://www.beatlesbible.com/1957/07/06/john-lennon-meets-paul-mccartney/",
      },
    ],
    related: ["Woolton", "The Quarry Men", "Ivan Vaughan", "Lennon-McCartney"],
  },
];

const chineseAnecdotes: AnecdoteFixture[] = [
  {
    ...englishAnecdotes[0],
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
        "在 2007 年一段法国电视访谈中，保罗谈到《The End of the End》里死亡像是去往“更好的地方”的旅程。他先开玩笑说法国，或穿过法国去西班牙，随后停顿了一下，说那个更好的地方是巴黎。",
      whyInteresting:
        "这个被记录下来的瞬间很小，但它可能承载的情绪回声，会一路回到将近五十年前约翰和保罗的巴黎之行。",
      before:
        "在 Beatlemania 之前，约翰和保罗原本计划继续去西班牙，最后却留在巴黎，并在那里度过约翰二十一岁生日那段旅程。",
      connection:
        "这则轶事的价值在于把事实和解释分开：保罗确实提到巴黎；歌迷可以把巴黎和他同约翰的早年共同记忆联系起来。",
      documented: [
        "保罗在谈到《The End of the End》的访谈语境里明确提到了巴黎。",
        "约翰和保罗在 1961 年一起去过巴黎。",
        "这次旅行发生在披头士成名之前。",
      ],
      interpretation: [
        "保罗是否有意想到约翰或 1961 年的旅行，无法证明。",
        "这则轶事不应被说成这首歌写给约翰的确认。",
      ],
    },
    connectionChain: [
      "1961 年巴黎之行",
      "约翰二十一岁生日",
      "《The End of the End》",
      "2007 年访谈提到巴黎",
      "后来的歌迷解读",
    ],
    sources: [
      {
        title: "Beatles Abbey 访谈摘录与文本语境",
        detail: "保罗谈到这首歌时回答巴黎的语境。",
        url: "https://www.beatlesabbey.com/p/1526",
      },
      {
        title: "约翰和保罗生命中的巴黎",
        detail: "整理巴黎相关线索的歌迷研究。",
        url: "https://www.tumblr.com/mclennonlgbt/748378131777404928/paris-in-john-and-pauls-life",
      },
    ],
    related: ["约翰与保罗", "巴黎", "The End of the End", "记忆"],
  },
  {
    ...englishAnecdotes[1],
    title: "保罗和乔治一路向南",
    hook:
      "少年保罗和乔治曾搭便车旅行；一次慢悠悠的顺风车，给乔治留下了一个被电到的拉链形记忆。",
    summary:
      "一个好笑的旅行故事，也能说明成名前的友谊、不可靠但珍贵的记忆，以及保罗如何继续讲述乔治。",
    dateLabel: "20 世纪 50 年代末与 2026 年",
    people: ["保罗·麦卡特尼", "乔治·哈里森", "奥利维亚·哈里森"],
    place: "威尔士、德文郡与英格兰西南部",
    tone: ["好笑", "揭示性", "容易被忽略"],
    beginnerRelevance: "适合理解人物关系",
    sections: {
      happened:
        "少年时期，保罗和乔治曾搭便车穿过威尔士和英格兰西南部。保罗后来回忆，有一次他们搭上一辆电动送奶车，乔治坐在电池上方，牛仔裤后袋的金属拉链接触到电池端子，被电了一下。",
      whyInteresting:
        "画面很好笑，但它也把保罗和乔治放回成名前的状态：两个带着吉他的年轻朋友，钱不多，没有车，只能靠陌生人的顺风车旅行。",
      before:
        "在乔治通过保罗进入披头士故事之前，他和保罗已经相识。他们的友谊和旅行记忆并不是 Beatlemania 的产物。",
      connection:
        "保罗的近年讲述也提醒我们：披头士历史常常保存在重叠但会变化的个人记忆里。奥利维亚据说把这事记成发生在保罗身上，保罗因此谈到记忆会变形。",
      documented: [
        "保罗和乔治少年时期曾搭便车旅行。",
        "乔治曾回忆他们往德文郡和 Exmouth 一带走。",
        "保罗后来详细讲述过这次被电到的故事。",
      ],
      interpretation: [
        "具体物理细节依赖后来的回忆。",
        "更准确的说法不是乔治的裤子着火，而是拉链导电。",
      ],
    },
    connectionChain: [
      "少年时期的保罗和乔治友谊",
      "搭便车旅行",
      "电动送奶车",
      "乔治的拉链被电",
      "几十年后保罗重新讲述",
    ],
    sources: [
      {
        title: "保罗的影像讲述",
        detail: "保罗重新谈起搭便车故事的视频语境。",
        url: "https://www.youtube.com/watch?v=kSp9K058Tbk",
      },
      {
        title: "Entertainment Weekly 报道",
        detail: "保罗详细讲述此事的当代报道。",
        url: "https://ew.com/paul-mccartney-says-george-harrison-butt-once-got-electrocuted-by-battery-hitchhiking-11975831",
      },
      {
        title: "乔治关于德文郡的回忆",
        detail: "乔治和保罗前往 Exmouth 一带的背景。",
        url: "https://www.cocosse.com/2016/08/hitchhiking-george-harrison-paul-mccartney/",
      },
    ],
    related: ["保罗与乔治", "搭便车", "记忆", "成名前"],
  },
  {
    ...englishAnecdotes[2],
    title: "约翰把生日钱花在和保罗去巴黎",
    hook: "约翰收到一笔二十一岁生日礼物，然后选择保罗作为同行者。",
    summary:
      "1961 年巴黎之行把约翰对保罗的个人依恋、两人成名前的自我形象，以及披头士后来采用的造型连接起来。",
    dateLabel: "1961 年 9 月 30 日至 10 月",
    people: ["约翰·列侬", "保罗·麦卡特尼", "Jürgen Vollmer", "Mimi 姨妈"],
    place: "巴黎",
    tone: ["亲近", "揭示性", "形成期"],
    beginnerRelevance: "约翰与保罗核心轶事",
    sections: {
      happened:
        "约翰二十一岁生日之前收到 100 英镑礼物，并邀请保罗一起旅行。他们离开利物浦，本想去西班牙，后来停在巴黎，并在那里度过约翰生日。",
      whyInteresting:
        "约翰本可以把钱花在自己、乐器或唱片上，却把它用于和保罗同行的旅行。那正是两人从少年走向披头士崛起的时刻。",
      before:
        "当时披头士还只是利物浦和汉堡的故事，并不是全球现象。约翰和保罗暂时离开了乐队日常压力。",
      connection:
        "他们在巴黎遇到 Jürgen Vollmer；他向前梳的发型影响了披头士后来的形象。因此，这趟旅行连接了私人友谊和公共形象的形成。",
      documented: [
        "约翰和保罗在 1961 年 9 月 30 日离开利物浦前往巴黎。",
        "约翰和保罗一起在巴黎度过他的二十一岁生日。",
        "这次旅行与 Jürgen Vollmer 相关的发型影响有关。",
      ],
      interpretation: [
        "约翰选择保罗同行能说明亲近，但不能证明某一种单一关系理论。",
        "巴黎照片的情感意义仍属于解释。",
      ],
    },
    connectionChain: [
      "约翰收到 100 英镑",
      "约翰邀请保罗",
      "原计划去西班牙",
      "留在巴黎",
      "Vollmer 发型影响",
      "披头士视觉身份",
    ],
    sources: [
      {
        title: "约翰和保罗去巴黎",
        detail: "离开利物浦以及原本计划去西班牙的年表。",
        url: "https://www.beatlesbible.com/1961/09/30/john-lennon-paul-mccartney-travel-paris/",
      },
      {
        title: "约翰在巴黎过二十一岁生日",
        detail: "约翰与保罗在巴黎过生日的年表。",
        url: "https://www.beatlesbible.com/1961/10/09/john-lennon-21st-birthday-paris-paul-mccartney/",
      },
    ],
    related: ["约翰与保罗", "巴黎", "Jürgen Vollmer", "披头士形象"],
  },
  {
    ...englishAnecdotes[3],
    title: "《Coming Up》把约翰拉回录音",
    hook:
      "保罗 1980 年那首奇异又有活力的单曲吸引了约翰，像是重启了他们最后的创作对话。",
    summary:
      "约翰对《Coming Up》的反应说明：披头士之后，欣赏和竞争仍然可以通过唱片传到对方那里。",
    dateLabel: "1980 年",
    people: ["保罗·麦卡特尼", "约翰·列侬", "小野洋子"],
    place: "纽约与英格兰",
    tone: ["竞争", "揭示性", "苦甜"],
    beginnerRelevance: "适合理解歌曲作为对话",
    sections: {
      happened:
        "保罗在 1980 年发行了实验感很强的录音室版《Coming Up》。约翰对它反应热烈，在最后一次重要的 Playboy 访谈中谈到保罗单飞作品时，特别提到了这首歌。",
      whyInteresting:
        "这件事说明，即使多年分开生活，约翰和保罗之间的创作竞争仍然存在。保罗做出意外的东西，约翰认真听见，并似乎再次被对方激发。",
      before:
        "约翰此前已有几年没有规律录音。1980 年，他重新投入持续创作，并和小野洋子完成《Double Fantasy》。",
      connection:
        "稳妥的说法不是《Coming Up》单独导致约翰复出，而是它是几个重要个人与艺术动机之一。",
      documented: [
        "《Coming Up》发行于 1980 年。",
        "约翰谈到保罗作品时特别提到这首歌。",
        "约翰在同一年重回持续录音。",
      ],
      interpretation: [
        "这首歌对约翰的激励程度无法精确衡量。",
        "洋子、家庭生活、新歌和其他动机也影响了约翰的回归。",
      ],
    },
    connectionChain: [
      "保罗录制《Coming Up》",
      "约翰听到单曲",
      "约翰在 1980 年称赞它",
      "竞争性的创作刺激",
      "约翰重回持续录音",
      "《Double Fantasy》",
    ],
    sources: [
      {
        title: "约翰·列侬 Playboy 访谈",
        detail: "约翰 1980 年谈到保罗作品和《Coming Up》的语境。",
        url: "https://www.beatlesinterviews.org/db1980.jlpb.beatles.html",
      },
      {
        title: "MusicRadar 文章",
        detail: "把这首歌视作最后一次 Lennon-McCartney 创作交流的后续叙述。",
        url: "https://www.musicradar.com/artists/singers-songwriters/apparently-it-was-the-one-song-that-got-john-recording-again-i-think-john-just-thought-uh-oh-i-had-better-get-working-too-the-story-of-the-last-entry-in-lennon-and-mccartneys-musical-conversation",
      },
    ],
    related: ["Coming Up", "Double Fantasy", "歌曲作为对话", "1980"],
  },
  {
    ...englishAnecdotes[4],
    title: "约翰与保罗在 Woolton 游园会相遇",
    hook:
      "1957 年 7 月 6 日，一场当地教堂游园会成为 Lennon-McCartney 和披头士故事的起点。",
    summary:
      "这次相遇日期明确、场景朴素、后果巨大：一个少年用调好音的吉他和摇滚歌曲打动了另一个少年。",
    dateLabel: "1957 年 7 月 6 日",
    people: ["约翰·列侬", "保罗·麦卡特尼", "Ivan Vaughan", "The Quarry Men"],
    place: "利物浦 Woolton",
    tone: ["形成期", "揭示性", "有记录"],
    beginnerRelevance: "最基本的起点",
    sections: {
      happened:
        "十五岁的保罗来到 Woolton Parish Church 游园会，十六岁的约翰正和 Quarry Men 演出。演出后，Ivan Vaughan 在教堂大厅介绍两人认识。",
      whyInteresting:
        "保罗会弹琴、会正确调音，并据说演奏了 Eddie Cochran 的《Twenty Flight Rock》等歌曲。约翰被打动，同时也要考虑让另一个强势音乐人加入是否会削弱自己的领导位置。",
      before:
        "当时约翰领导 Quarry Men，保罗还不是乐队成员。这次相遇发生在本地少年音乐圈，而不是任何专业场景。",
      connection:
        "后来几乎所有约翰与保罗的连接都从这里开始：创作搭档、乔治通过保罗加入、披头士的发展，以及贯穿他们作品的欣赏与竞争。",
      documented: [
        "约翰和保罗在 1957 年 7 月 6 日相遇。",
        "Ivan Vaughan 在 Quarry Men 演出后介绍两人。",
        "保罗后来被邀请加入 Quarry Men。",
      ],
      interpretation: [
        "一些演出细节在不同叙述里有小差异，包括具体歌曲和强调重点。",
        "这次相遇的情感意义来自后见之明，但事件本身记录明确。",
      ],
    },
    connectionChain: [
      "Woolton Parish Church 游园会",
      "Quarry Men 演出",
      "Ivan Vaughan 介绍保罗",
      "保罗打动约翰",
      "保罗加入 Quarry Men",
      "Lennon-McCartney 开始",
    ],
    sources: [
      {
        title: "National Museums Liverpool 介绍",
        detail: "关于保罗何时遇见约翰的博物馆叙述。",
        url: "https://www.liverpoolmuseums.org.uk/stories/when-paul-mccartney-met-john-lennon",
      },
      {
        title: "The Beatles Bible 年表",
        detail: "1957 年 7 月 6 日的详细年表。",
        url: "https://www.beatlesbible.com/1957/07/06/john-lennon-meets-paul-mccartney/",
      },
    ],
    related: ["Woolton", "The Quarry Men", "Ivan Vaughan", "Lennon-McCartney"],
  },
];

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
    items: englishAnecdotes,
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
    items: chineseAnecdotes,
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
