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

export type AnecdoteQuote = {
  text: string;
  attribution: string;
};

export type AnecdoteFixture = {
  slug: string;
  title: string;
  hook: string;
  summary: string;
  quote?: AnecdoteQuote;
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
    title: "A much better place—Paris",
    hook:
      "Decades after traveling to Paris with John, Paul unexpectedly named Paris while discussing a journey to a better place.",
    summary:
      "A small phrase links an early trip, late-life reflection, and a fan interpretation of how memory can echo through interviews and songs.",
    quote: {
      text: "It’s basically the start of a journey to France… It’s a much better place, Paris.",
      attribution: "Paul McCartney, discussing “The End of the End”",
    },
    dateLabel: "1961 and 2007",
    people: ["Paul McCartney", "John Lennon"],
    place: "Paris",
    tone: ["affectionate", "bittersweet", "easily overlooked"],
    evidenceStatus: "Interpretive connection",
    beginnerRelevance: "Good first anecdote",
    sections: {
      happened:
        "During an interview about “The End of the End,” Paul was asked about the song’s description of death as the beginning of a journey to a much better place. The interviewer jokingly asked whether he meant somewhere better than England. Paul answered that it was the beginning of a journey to France, before identifying the better place as Paris.",
      whyInteresting:
        "The moment links death as another journey, Paris as a better place, and John and Paul’s youthful journey to Paris. It is emotionally suggestive, but Paul did not explicitly say that Paris represented John.",
      before:
        "Before Beatlemania, John and Paul had planned to travel onward to Spain but stayed in Paris during John’s twenty-first-birthday trip.",
      connection:
        "The safest formulation is that Paul’s reference to Paris may resonate with the journey he and John took there in 1961, although he did not explicitly make that connection.",
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
        title: "Transcript of Paul’s answer about Paris",
        detail:
          "Surviving transcript context for Paul’s answer; the original interview still needs the strongest citation.",
        url: "https://www.reddit.com/r/beatles/comments/kdiiy8/thoughts_on_john_lennons_i_know_i_know_many_think/",
      },
      {
        title: "John and Paul begin their 1961 journey",
        detail: "Chronology for John and Paul leaving Liverpool for Paris.",
        url: "https://www.beatlesbible.com/1961/09/30/john-lennon-paul-mccartney-travel-paris/",
      },
      {
        title: "John’s twenty-first birthday in Paris",
        detail: "Chronology for John’s birthday with Paul in Paris.",
        url: "https://www.beatlesbible.com/1961/10/09/john-lennon-21st-birthday-paris-paul-mccartney/",
      },
    ],
    related: ["John and Paul", "Paris", "The End of the End", "Memory"],
  },
  {
    slug: "paul-george-hitchhiking-shock",
    title: "George gets an electric shock during a road trip with Paul",
    hook:
      "Teenage Paul and George hitchhiked through Britain, and one slow lift left George with a shocking zipper-shaped memory.",
    summary:
      "A funny travel story becomes a useful example of pre-fame friendship, imperfect memory, and Paul’s continuing storytelling about George.",
    quote: {
      text: "He had a big zip mark on his butt… It brings you together.",
      attribution: "Paul McCartney",
    },
    dateLabel: "Late 1950s and 2026",
    people: ["Paul McCartney", "George Harrison", "Olivia Harrison"],
    place: "Wales, Devon, and southwest England",
    tone: ["funny", "revealing", "easily overlooked"],
    evidenceStatus: "Corroborated recollection",
    beginnerRelevance: "Good character story",
    sections: {
      happened:
        "Before the Beatles became famous, Paul and George took hitchhiking trips through Wales and southern England. On one journey they were offered a ride on an electric milk float. George sat near or on the vehicle’s large battery, and the metal zipper on the back of his jeans made contact with the battery, giving him an electric shock.",
      whyInteresting:
        "The story is funny, but Paul’s comment that it brings you together turns the accident into a reflection on friendship.",
      before:
        "George had known Paul before he entered the Beatles story through John. Their friendship and travel memories formed independently of Beatlemania.",
      connection:
        "The story also introduces the theme of memory. Paul said Olivia Harrison remembered a version in which the accident happened to Paul rather than George, showing how personal stories can change as they are retold.",
      documented: [
        "Paul and George took teenage hitchhiking trips.",
        "George recalled traveling toward Devon and Exmouth.",
        "Paul later gave a detailed account in which George was shocked when his zipper contacted the battery.",
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
        title: "Full transcript of Paul’s hitchhiking account",
        detail: "Detailed account of Paul and George’s hitchhiking trip.",
        url: "https://www.the-paulmccartney-project.com/1959/08/paul-mccartney-and-george-harrisons-hitchhiking-trip/",
      },
      {
        title: "Report on Paul’s 2026 retelling",
        detail: "Contemporary report on Paul describing George being zapped by the battery.",
        url: "https://people.com/paul-mccartney-george-harrison-zapped-butt-battery-while-hitchhiking-11975596",
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
    quote: {
      text: "You got £100 off one of your rich relatives… so we decided we’d go to Spain.",
      attribution: "Paul McCartney, recalling the trip with John",
    },
    dateLabel: "30 September-October 1961",
    people: ["John Lennon", "Paul McCartney", "Jürgen Vollmer", "Aunt Mimi"],
    place: "Paris",
    tone: ["affectionate", "revealing", "formative"],
    evidenceStatus: "Documented context",
    beginnerRelevance: "Core John-Paul anecdote",
    sections: {
      happened:
        "Ahead of John’s twenty-first birthday on October 9, 1961, he received £100 from relatives in Scotland. John and Paul left Liverpool on September 30. Their original plan was to travel through France and continue to Spain, but they stopped in Paris and remained there through John’s birthday.",
      whyInteresting:
        "John could have used the money for records, clothes, instruments, or a trip with someone else. Instead, he chose Paul as his traveling companion for an important personal milestone.",
      before:
        "The Beatles were still a Liverpool and Hamburg story, not yet a global phenomenon. John and Paul were temporarily away from the band’s usual pressures.",
      connection:
        "John reportedly told Aunt Mimi he was traveling abroad to sell his paintings. In Paris, John and Paul reconnected with Jürgen Vollmer, whose brushed-forward hairstyle helped inspire the look they adopted shortly afterward.",
      documented: [
        "John and Paul left Liverpool for Paris on 30 September 1961.",
        "They intended to reach Spain but stayed in Paris.",
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
        title: "John and Paul depart for Paris",
        detail: "Chronology for the departure and original plan to reach Spain.",
        url: "https://www.beatlesbible.com/1961/09/30/john-lennon-paul-mccartney-travel-paris/",
      },
      {
        title: "John celebrates his twenty-first birthday with Paul",
        detail: "Chronology for John’s birthday with Paul in Paris.",
        url: "https://www.beatlesbible.com/1961/10/09/john-lennon-21st-birthday-paris-paul-mccartney/",
      },
      {
        title: "Collection of quotations and photographs about the trip",
        detail: "Fan research collection gathering trip quotations and images.",
        url: "https://www.tumblr.com/mclennonlgbt/748378131777404928/paris-in-john-and-pauls-life",
      },
    ],
    related: ["John and Paul", "Paris", "Jürgen Vollmer", "Beatles image"],
  },
  {
    slug: "coming-up-pulls-john-back",
    title: "“Coming Up” helps reignite John’s desire to record",
    hook:
      "Paul’s odd, energetic 1980 single caught John’s attention and may have helped restart their final creative conversation.",
    summary:
      "John’s response to “Coming Up” shows that admiration and rivalry could still travel through records after the Beatles.",
    quote: {
      text: "It’s a good piece of work.",
      attribution: "John Lennon on “Coming Up,” 1980",
    },
    dateLabel: "1980",
    people: ["Paul McCartney", "John Lennon", "Yoko Ono"],
    place: "New York and England",
    tone: ["competitive", "revealing", "bittersweet"],
    evidenceStatus: "Corroborated recollection",
    beginnerRelevance: "Good songs-as-conversation example",
    sections: {
      happened:
        "Paul released “Coming Up” in 1980. The studio version was unusual and experimental: Paul created it largely by himself, manipulating the recording and altering the sound of his voice. John heard the song during the final year of his life and responded positively.",
      whyInteresting:
        "The episode suggests that John and Paul’s creative rivalry continued after the breakup. They no longer needed to sit in the same room: John could hear Paul on the radio and re-enter the old pattern of admiration, competition, and artistic motivation.",
      before:
        "John had spent several years away from regular recording. In 1980 he returned to sustained work and completed “Double Fantasy” with Yoko Ono.",
      connection:
        "Paul later said he had heard the song got John recording again and imagined John thinking that he had better get working too. This is Paul’s later understanding, not a recorded statement from John that the song was his sole reason for returning.",
      documented: [
        "“Coming Up” was released in 1980.",
        "John called the song a good piece of work in a contemporary interview.",
        "John returned to sustained recording during the same final year.",
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
        title: "John’s 1980 Playboy interview",
        detail: "John’s contemporary comments about “Coming Up.”",
        url: "https://www.beatlesinterviews.org/db1980.jlpb.beatles.html",
      },
      {
        title: "History of “Coming Up” as a final musical exchange",
        detail: "Later account framing the song as a final Lennon-McCartney creative exchange.",
        url: "https://www.musicradar.com/artists/singers-songwriters/apparently-it-was-the-one-song-that-got-john-recording-again-i-think-john-just-thought-uh-oh-i-had-better-get-working-too-the-story-of-the-last-entry-in-lennon-and-mccartneys-musical-conversation",
      },
    ],
    related: ["Coming Up", "Double Fantasy", "Songs as conversation", "1980"],
  },
  {
    slug: "blue-light-paul-talks-about-john",
    title: "A blue light appears while Paul talks about John",
    hook:
      "During Anthology-era footage, Paul reportedly turned a strange blue light into a joke about John’s presence.",
    summary:
      "The moment belongs as symbolism rather than supernatural evidence: Paul’s reaction shows how John can re-enter the room through humor and memory.",
    quote: {
      text: "That was John.",
      attribution: "Paul McCartney, reportedly reacting to the blue light",
    },
    dateLabel: "1995",
    people: ["Paul McCartney", "John Lennon"],
    place: "Anthology-era interview footage",
    tone: ["symbolic", "affectionate", "disputed"],
    evidenceStatus: "Fandom theory",
    beginnerRelevance: "Use with sourcing caution",
    sections: {
      happened:
        "During footage associated with the 1995 Beatles Anthology period, Paul was speaking about John when a blue flash or flame-like light appeared in or passed through the shot. Paul reportedly noticed it and jokingly identified it as John.",
      whyInteresting:
        "The source of the light is not historically important on its own. What matters is Paul’s instinctive transformation of an interruption into a small sign of John’s presence.",
      before:
        "The footage belongs to the later period when Paul was publicly revisiting the Beatles story and speaking about John through memory, grief, and humor.",
      connection:
        "Paul often describes John as an active internal voice, imagining what John would say about a lyric, decision, or piece of music. This moment fits that broader pattern without requiring a literal supernatural claim.",
      documented: [
        "A blue light appears in circulating footage.",
        "Paul is reported to have identified it as John.",
      ],
      interpretation: [
        "The physical or optical source of the light is unknown.",
        "The remark should be treated as playful symbolism, not evidence of a paranormal event.",
        "The exact interview, date, complete wording, and official release status still need source work.",
      ],
    },
    connectionChain: [
      "Anthology-era interview",
      "Paul discusses John",
      "blue light appears",
      "Paul reportedly says it was John",
      "fans interpret the moment symbolically",
      "source work remains provisional",
    ],
    sources: [
      {
        title: "Circulating clip of the interview",
        detail: "Reposted clip showing the blue-light moment.",
        url: "https://www.youtube.com/watch?v=kGtqsQ72xV8",
      },
      {
        title: "Post identifying the footage as a 1995 interview",
        detail: "Social post context; original production source still needs confirmation.",
        url: "https://www.facebook.com/groups/361717340550274/posts/24072529499042392/",
      },
    ],
    related: ["Anthology", "John’s presence", "Memory", "Symbolic moments"],
  },
  {
    slug: "john-paul-meet-1957",
    title: "John meets Paul on July 6, 1957",
    hook:
      "On July 6, 1957, a local church fête became the origin point of Lennon-McCartney and the Beatles story.",
    summary:
      "The meeting immediately established the partnership’s central dynamic: Paul impressed John, and also threatened his position as leader.",
    quote: {
      text: "I think what impressed him most was that I knew all the words.",
      attribution: "Paul McCartney",
    },
    dateLabel: "6 July 1957",
    people: ["John Lennon", "Paul McCartney", "Ivan Vaughan", "The Quarry Men"],
    place: "Woolton, Liverpool",
    tone: ["formative", "revealing", "documented"],
    evidenceStatus: "Documented context",
    beginnerRelevance: "Essential starting point",
    sections: {
      happened:
        "On July 6, 1957, fifteen-year-old Paul attended the Woolton Parish Church fête in Liverpool. Ivan Vaughan brought Paul to see John’s group, the Quarry Men. After the performance, Ivan introduced John and Paul in the church-hall area.",
      whyInteresting:
        "Paul borrowed a guitar, performed Eddie Cochran’s “Twenty Flight Rock,” showed that he knew how to tune a guitar, and remembered complete lyrics. John was impressed, but he also understood that Paul might challenge his leadership.",
      before:
        "John was leading the Quarry Men, and Paul was not yet part of the group. The meeting happened in a local teenage music world rather than in any professional setting.",
      connection:
        "This is not only the day two future Beatles met. It establishes the attraction and competition that would power their songwriting: John wanted Paul’s talent, even though Paul might become his equal.",
      documented: [
        "John and Paul were introduced at the Woolton fête on July 6, 1957.",
        "Paul later recalled performing “Twenty Flight Rock” and impressing John.",
        "John later recalled worrying that Paul could challenge his leadership.",
      ],
      interpretation: [
        "Some performance details vary across later accounts.",
        "The meeting’s enormous emotional and historical meaning is partly visible through hindsight.",
      ],
    },
    connectionChain: [
      "Woolton Parish Church fête",
      "Quarry Men performance",
      "Ivan Vaughan introduces Paul",
      "Paul impresses John",
      "John weighs the challenge",
      "Paul joins the Quarry Men",
      "Lennon-McCartney begins",
    ],
    sources: [
      {
        title: "Museum of Liverpool account",
        detail: "Museum summary of when Paul McCartney met John Lennon.",
        url: "https://www.liverpoolmuseums.org.uk/stories/when-paul-mccartney-met-john-lennon",
      },
      {
        title: "Detailed chronology of July 6, 1957",
        detail: "Detailed chronology of the Woolton meeting.",
        url: "https://www.beatlesbible.com/1957/07/06/john-lennon-meets-paul-mccartney/",
      },
      {
        title: "Paul on “Twenty Flight Rock”",
        detail: "Paul’s account of knowing the words and chords.",
        url: "https://www.the-paulmccartney-project.com/song/twenty-flight-rock/",
      },
      {
        title: "New Yorker account of John’s decision",
        detail: "Context for John’s leadership hesitation.",
        url: "https://www.newyorker.com/magazine/2007/06/04/when-im-sixty-four-2",
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
      "多年以后，保罗谈到去往“更好的地方”时提到了巴黎；而巴黎曾是他和约翰早年同行的重要记忆。",
    summary:
      "一个很小的词，把早年的旅行、晚年的回望，以及歌迷对歌曲和访谈回声的解读连接起来。",
    quote: {
      text: "这基本上是去法国旅程的开始……更好的地方，是巴黎。",
      attribution: "保罗·麦卡特尼，谈《The End of the End》",
    },
    dateLabel: "1961 年与 2007 年",
    people: ["保罗·麦卡特尼", "约翰·列侬"],
    place: "巴黎",
    tone: ["亲近", "苦甜", "容易被忽略"],
    beginnerRelevance: "适合作为第一则轶事",
    sections: {
      happened:
        "在一段关于《The End of the End》的访谈中，保罗被问到歌曲里把死亡说成去往“更好的地方”的旅程。采访者开玩笑问是否比英格兰更好。保罗回答说那是去法国旅程的开始，随后把那个更好的地方指认为巴黎。",
      whyInteresting:
        "这个瞬间把死亡作为另一段旅程、巴黎作为更好的地方、以及约翰和保罗年轻时的巴黎之行联系在一起。它很有情绪暗示，但保罗并没有明说巴黎代表约翰。",
      before:
        "在 Beatlemania 之前，约翰和保罗原本计划继续去西班牙，最后却留在巴黎，并在那里度过约翰二十一岁生日那段旅程。",
      connection:
        "最稳妥的说法是：保罗提到巴黎，可能会让人联想到他和约翰 1961 年的共同旅程，尽管他没有明确建立这个连接。",
      documented: [
        "保罗在访谈语境里称巴黎是更好的地方。",
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
      "访谈中称巴黎是更好的地方",
      "后来的歌迷解读",
    ],
    related: ["约翰与保罗", "巴黎", "The End of the End", "记忆"],
  },
  {
    ...englishAnecdotes[1],
    title: "乔治在和保罗旅行时被电了一下",
    hook:
      "少年保罗和乔治曾搭便车旅行；一次慢悠悠的顺风车，给乔治留下了一个拉链形的触电记忆。",
    summary:
      "一个好笑的旅行故事，也能说明成名前的友谊、不可靠但珍贵的记忆，以及保罗如何继续讲述乔治。",
    quote: {
      text: "他的屁股上有一个很大的拉链印……这会让你们更亲近。",
      attribution: "保罗·麦卡特尼",
    },
    dateLabel: "20 世纪 50 年代末与 2026 年",
    people: ["保罗·麦卡特尼", "乔治·哈里森", "奥利维亚·哈里森"],
    place: "威尔士与英格兰南部",
    tone: ["好笑", "揭示性", "容易被忽略"],
    beginnerRelevance: "适合理解人物关系",
    sections: {
      happened:
        "成名前，保罗和乔治曾一起搭便车穿过威尔士和英格兰南部。一次他们搭上电动送奶车，乔治坐在大电池附近或上方，牛仔裤后面的金属拉链接触到电池，结果被电了一下。",
      whyInteresting:
        "故事很好笑，但保罗说“这会让你们更亲近”，把事故变成了对友谊的回望。",
      before:
        "在乔治通过保罗进入披头士故事之前，他和保罗已经相识。他们的友谊和旅行记忆并不是 Beatlemania 的产物。",
      connection:
        "保罗说奥利维亚记得另一个版本，好像被电的是保罗而不是乔治。这说明个人故事在反复讲述中会变化。",
      documented: [
        "保罗和乔治少年时期曾搭便车旅行。",
        "保罗后来说乔治的拉链接触电池后被电到。",
        "不同人记忆中的细节并不完全一致。",
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
      "保罗几十年后重新讲述",
    ],
    related: ["保罗与乔治", "搭便车", "记忆", "成名前"],
  },
  {
    ...englishAnecdotes[2],
    title: "约翰把二十一岁生日钱花在和保罗旅行",
    hook: "约翰收到一笔二十一岁生日礼物，然后选择保罗作为同行者。",
    summary:
      "1961 年巴黎之行把约翰对保罗的个人依恋、两人成名前的自我形象，以及披头士后来采用的造型连接起来。",
    quote: {
      text: "你从一个有钱亲戚那里拿到 100 英镑……所以我们决定去西班牙。",
      attribution: "保罗·麦卡特尼，回忆与约翰的旅行",
    },
    dateLabel: "1961 年 9 月 30 日至 10 月",
    people: ["约翰·列侬", "保罗·麦卡特尼", "Jürgen Vollmer", "Mimi 姨妈"],
    place: "巴黎",
    tone: ["亲近", "揭示性", "形成期"],
    beginnerRelevance: "约翰与保罗核心轶事",
    sections: {
      happened:
        "1961 年 10 月 9 日二十一岁生日之前，约翰从苏格兰亲戚那里收到 100 英镑。9 月 30 日，约翰和保罗离开利物浦，原本想穿过法国去西班牙，后来停在巴黎并一直待到约翰生日。",
      whyInteresting:
        "约翰本可以把钱花在唱片、衣服、乐器或和别人旅行上。但他选择了保罗，作为这个重要个人节点的同行者。",
      before:
        "当时披头士还只是利物浦和汉堡的故事，并不是全球现象。约翰和保罗暂时离开了乐队日常压力。",
      connection:
        "约翰据说告诉 Mimi 姨妈自己出国是为了卖画。在巴黎，他们又见到 Jürgen Vollmer；他的发型帮助影响了两人后来采用的披头士形象。",
      documented: [
        "约翰和保罗在 1961 年 9 月 30 日离开利物浦前往巴黎。",
        "他们原本打算去西班牙，但留在了巴黎。",
        "约翰和保罗一起在巴黎度过他的二十一岁生日。",
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
    related: ["约翰与保罗", "巴黎", "Jürgen Vollmer", "披头士形象"],
  },
  {
    ...englishAnecdotes[3],
    title: "《Coming Up》重新点燃约翰录音的欲望",
    hook:
      "保罗 1980 年那首奇异又有活力的单曲吸引了约翰，像是重启了他们最后的创作对话。",
    summary:
      "约翰对《Coming Up》的反应说明：披头士之后，欣赏和竞争仍然可以通过唱片传到对方那里。",
    quote: {
      text: "这是一件好作品。",
      attribution: "约翰·列侬谈《Coming Up》，1980 年",
    },
    dateLabel: "1980 年",
    people: ["保罗·麦卡特尼", "约翰·列侬", "小野洋子"],
    place: "纽约与英格兰",
    tone: ["竞争", "揭示性", "苦甜"],
    beginnerRelevance: "适合理解歌曲作为对话",
    sections: {
      happened:
        "保罗在 1980 年发行《Coming Up》。录音室版很不寻常：保罗基本独自完成，并改变了录音和人声质感。约翰在生命最后一年听到这首歌，并给出积极回应。",
      whyInteresting:
        "这说明披头士解散后，约翰和保罗的创作竞争仍然存在。他们不必坐在同一个房间；约翰只要在电台听到保罗，就可能重新进入欣赏、竞争和被激发的旧模式。",
      before:
        "约翰此前已有几年没有规律录音。1980 年，他重新投入持续创作，并和小野洋子完成《Double Fantasy》。",
      connection:
        "保罗后来听说这首歌促使约翰重新录音，并想象约翰会觉得自己也该开始工作了。这是保罗后来的理解，不是约翰亲口说它是唯一原因。",
      documented: [
        "《Coming Up》发行于 1980 年。",
        "约翰在当时的访谈中称这首歌是好作品。",
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
    related: ["Coming Up", "Double Fantasy", "歌曲作为对话", "1980"],
  },
  {
    ...englishAnecdotes[4],
    title: "保罗谈约翰时出现一道蓝光",
    hook:
      "在 Anthology 时期的影像中，保罗据说把一道奇怪的蓝光玩笑式地认作约翰的出现。",
    summary:
      "这个瞬间应被当作象征，而不是超自然证据：保罗的反应说明约翰如何通过幽默和记忆重新进入房间。",
    quote: {
      text: "那是约翰。",
      attribution: "保罗·麦卡特尼，据称回应蓝光时所说",
    },
    dateLabel: "1995 年",
    people: ["保罗·麦卡特尼", "约翰·列侬"],
    place: "Anthology 时期访谈影像",
    tone: ["象征性", "亲近", "有争议"],
    beginnerRelevance: "需谨慎使用来源",
    sections: {
      happened:
        "在与 1995 年《Beatles Anthology》时期相关的影像中，保罗谈到约翰时，一道蓝色闪光或火焰状光线出现在画面里。保罗据说注意到它，并开玩笑说那是约翰。",
      whyInteresting:
        "光线本身的来源并不是历史重点。真正重要的是保罗如何把一次画面干扰转化为约翰仍在场的微小标记。",
      before:
        "这属于保罗后来公开回望披头士、通过记忆、悲伤和幽默谈论约翰的时期。",
      connection:
        "保罗常把约翰描述成一种仍在心里的声音，会想象约翰如何评价歌词、决定或音乐。这一幕符合这种模式，但不需要把它说成字面上的超自然事件。",
      documented: [
        "流传影像中出现了一道蓝光。",
        "保罗据称把它认作约翰。",
      ],
      interpretation: [
        "光线的物理或光学来源未知。",
        "这句话应被视为玩笑式象征，而不是灵异证据。",
        "具体访谈、日期、完整措辞和官方发布状态仍需进一步考证。",
      ],
    },
    connectionChain: [
      "Anthology 时期访谈",
      "保罗谈到约翰",
      "蓝光出现",
      "保罗据称说那是约翰",
      "歌迷将其作象征性解读",
      "来源仍需确认",
    ],
    related: ["Anthology", "约翰的在场", "记忆", "象征性瞬间"],
  },
  {
    ...englishAnecdotes[5],
    title: "约翰在 1957 年 7 月 6 日遇见保罗",
    hook:
      "1957 年 7 月 6 日，一场当地教堂游园会成为 Lennon-McCartney 和披头士故事的起点。",
    summary:
      "这次相遇立刻呈现出两人关系的核心动力：保罗打动了约翰，也威胁到了约翰的领导位置。",
    quote: {
      text: "我想最打动他的，是我把歌词都记住了。",
      attribution: "保罗·麦卡特尼",
    },
    dateLabel: "1957 年 7 月 6 日",
    people: ["约翰·列侬", "保罗·麦卡特尼", "Ivan Vaughan", "The Quarry Men"],
    place: "利物浦 Woolton",
    tone: ["形成期", "揭示性", "有记录"],
    beginnerRelevance: "最基本的起点",
    sections: {
      happened:
        "1957 年 7 月 6 日，十五岁的保罗来到利物浦 Woolton Parish Church 游园会。Ivan Vaughan 带保罗去看约翰的 Quarry Men 演出。演出后，Ivan 在教堂大厅一带介绍约翰和保罗认识。",
      whyInteresting:
        "保罗借来吉他，演奏 Eddie Cochran 的《Twenty Flight Rock》，展示自己会调音，也记得完整歌词。约翰被打动，同时也意识到保罗可能挑战他的领导位置。",
      before:
        "当时约翰领导 Quarry Men，保罗还不是乐队成员。这次相遇发生在本地少年音乐圈，而不是任何专业场景。",
      connection:
        "这不只是两个未来披头士第一次见面。它立刻建立了吸引和竞争并存的关系：约翰想要保罗的才华，也知道保罗可能成为他的平等对手。",
      documented: [
        "约翰和保罗在 1957 年 7 月 6 日的 Woolton 游园会上被介绍认识。",
        "保罗后来回忆自己演奏《Twenty Flight Rock》并打动了约翰。",
        "约翰后来回忆自己担心保罗会挑战他的领导位置。",
      ],
      interpretation: [
        "一些演出细节在不同叙述里有小差异。",
        "这次相遇的巨大情感和历史意义部分来自后见之明。",
      ],
    },
    connectionChain: [
      "Woolton Parish Church 游园会",
      "Quarry Men 演出",
      "Ivan Vaughan 介绍保罗",
      "保罗打动约翰",
      "约翰权衡挑战",
      "保罗加入 Quarry Men",
      "Lennon-McCartney 开始",
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
