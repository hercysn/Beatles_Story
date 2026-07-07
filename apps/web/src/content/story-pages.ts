import type { Locale } from "@/i18n/routing";

type ChapterEvidence = {
  documented: string;
  inferred: string;
  debated: string;
};

export type StoryChapter = {
  title: string;
  dek: string;
  paragraphs: string[];
  evidence?: ChapterEvidence | ChapterEvidence[];
  quote?: {
    text: string;
    attribution: string;
    needsVerification?: boolean;
  };
  song: string;
  relatedEvents: string[];
  deeperReading?: string;
};

export type StoryFixture = {
  title: string;
  readingTime: string;
  promise: string;
  editorialNote?: string;
  labels?: {
    chapter: string;
    documented: string;
    inferred: string;
    debated: string;
    representativeSong: string;
    relatedEvents: string;
    deeperReading: string;
    verifyWording: string;
  };
  chapters: StoryChapter[];
};

const startWithTheBeatles: StoryFixture = {
  title: "Start with the Beatles",
  readingTime: "Approximately 12-15 minutes",
  promise:
    "Meet four young musicians, follow their rapid transformation, and understand why eight extraordinary years still shape popular culture.",
  editorialNote:
    "First draft: quotations marked for verification should be checked against primary sources before publication.",
  chapters: [
    {
      title: "Four young musicians from Liverpool",
      dek: "Before they became an institution, the Beatles were four working-class and lower-middle-class young men trying to escape the limits of postwar Liverpool.",
      paragraphs: [
        "John Lennon began with a schoolboy skiffle group called the Quarrymen. Paul McCartney joined him in 1957, bringing a more disciplined musical ear; Paul soon introduced the younger George Harrison, whose guitar playing overcame John's doubts about his age. Ringo Starr arrived later, in 1962, after establishing himself as one of Liverpool's most respected drummers.",
        "They did not begin as the perfectly balanced foursome remembered today. Members came and went, names changed, and ambitions were still taking shape. What held the emerging group together was a shared fascination with American music: Elvis Presley, Little Richard, Chuck Berry, Buddy Holly, rhythm and blues, country, girl groups, and songs heard through imported records and Radio Luxembourg.",
        "Liverpool mattered. As a port city, it offered glimpses of music and fashion arriving from elsewhere. The Beatles absorbed those influences, copied them, and gradually began combining them into something recognizably their own. Their story starts not with fame but with imitation, friendship, argument, and relentless practice.",
      ],
      quote: {
        text: "Before Elvis, there was nothing.",
        attribution: "John Lennon",
        needsVerification: true,
      },
      song: "That'll Be the Day",
      relatedEvents: [
        "John forms the Quarrymen",
        "Paul joins the group",
        "George auditions for John",
        "Ringo replaces Pete Best",
      ],
      deeperReading: "The Beatles' official Anthology materials",
    },
    {
      title: "John meets Paul",
      dek: "One afternoon at a church fete created the partnership around which the Beatles would form.",
      paragraphs: [
        "On 6 July 1957, the Quarrymen performed at the garden fete of St Peter's Church in Woolton. After the afternoon performance, a mutual friend, Ivan Vaughan, introduced sixteen-year-old John Lennon to fifteen-year-old Paul McCartney.",
        "Paul demonstrated that he could tune a guitar properly and played songs including Eddie Cochran's \"Twenty Flight Rock.\" He also knew the words, chords, and arrangements of songs John admired. John was impressed, but inviting Paul into the group meant sharing authority with someone who might be as talented as he was.",
        "That tension would become central to their relationship. John and Paul were friends, collaborators, competitors, and mutual editors. Each could finish what the other had begun. The meeting did not instantly produce the Beatles, but it created the band's central creative partnership.",
      ],
      quote: {
        text: "I dug him.",
        attribution: "John Lennon on Paul's musicianship",
        needsVerification: true,
      },
      song: "Twenty Flight Rock",
      relatedEvents: [
        "Woolton church fete, 6 July 1957",
        "Ivan Vaughan introduces John and Paul",
        "Paul demonstrates \"Twenty Flight Rock\"",
        "Paul is invited to join the Quarrymen",
      ],
      deeperReading: "St Peter's Church heritage account, \"The Day John Met Paul\"",
    },
    {
      title: "Hamburg transforms the group",
      dek: "In Hamburg, the Beatles stopped behaving like boys who played music and began becoming a professional band.",
      paragraphs: [
        "Beginning in 1960, the group spent long periods playing clubs in Hamburg's red-light district. The conditions were punishing: cramped accommodation, unfamiliar surroundings, and sets that could stretch for hours. To hold the attention of noisy audiences, they had to play louder, longer, faster, and with greater confidence.",
        "Hamburg enlarged their repertoire and sharpened their stage instincts. It also contributed to their visual transformation. The leather clothing, swept-forward hair, dark humor, and defiant group identity associated with the early Beatles developed through their encounters with German friends and artists, especially Astrid Kirchherr and Klaus Voormann.",
        "The experience was not romantic in every respect. George was deported for being underage; Paul and drummer Pete Best were deported after a fire was started in their accommodation; Stuart Sutcliffe left the group and died in 1962. Yet when the Beatles returned to Liverpool, audiences encountered a strikingly improved band.",
      ],
      quote: {
        text: "We had to learn millions of songs.",
        attribution: "George Harrison",
        needsVerification: true,
      },
      song: "Some Other Guy",
      relatedEvents: [
        "First Hamburg engagement",
        "George's deportation",
        "Recordings with Tony Sheridan",
        "Stuart Sutcliffe's departure and death",
      ],
      deeperReading: "The Beatles Anthology: the Hamburg chapters",
    },
    {
      title: "Beatlemania",
      dek: "In less than two years, a popular Liverpool band became the center of a worldwide youth phenomenon.",
      paragraphs: [
        "Manager Brian Epstein refined the Beatles' presentation and secured them an audition with producer George Martin. After Ringo joined, the familiar foursome was complete. \"Love Me Do\" introduced them nationally in 1962; \"Please Please Me,\" \"She Loves You,\" and \"I Want to Hold Your Hand\" helped turn popularity into mass excitement.",
        "Beatlemania was not simply a series of successful records. It was a new kind of public experience: screaming crowds, relentless press coverage, police escorts, packed theaters, films, merchandise, and young people treating musicians as representatives of their own generation. The Beatles' humor and apparent informality made them seem different from conventional entertainers.",
        "Their February 1964 arrival in the United States transformed British success into global fame. Touring carried them from theaters to sports stadiums and from Europe to North America, Asia, and Australia. The scale was unprecedented, but the noise and confinement eventually made meaningful live performance nearly impossible.",
      ],
      quote: {
        text: "We were just four guys who made it very, very big.",
        attribution: "Ringo Starr",
        needsVerification: true,
      },
      song: "She Loves You",
      relatedEvents: [
        "Brian Epstein becomes manager",
        "George Martin signs the group",
        "Royal Variety Performance",
        "First appearance on The Ed Sullivan Show",
      ],
      deeperReading: "The Beatles: Eight Days a Week - The Touring Years",
    },
    {
      title: "The studio becomes an instrument",
      dek: "Once touring stopped, the Beatles used recording technology to create music that could not exist on a concert stage.",
      paragraphs: [
        "The Beatles' early records captured the energy of a performing group. By the middle of the decade, the studio had become a space for invention. Working with George Martin and EMI engineers, including Geoff Emerick, the band experimented with tape loops, altered speeds, reversed sound, artificial double tracking, orchestration, unusual instruments, and combinations assembled through editing.",
        "Rubber Soul suggested a more unified album experience. Revolver pushed further: \"Tomorrow Never Knows\" surrounded John's voice with loops and processed sound; \"Eleanor Rigby\" used a string octet without conventional rock instrumentation; \"Yellow Submarine\" became a miniature sound world. Sgt. Pepper's Lonely Hearts Club Band then presented the album itself as an imaginative event.",
        "The studio did not remove human collaboration. John, Paul, George, Ringo, Martin, and the engineering staff remained dependent on one another's ideas. But it changed the group's working method. Instead of reproducing a live act, they could build recordings layer by layer.",
      ],
      quote: {
        text: "The studio was our workshop.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "Tomorrow Never Knows",
      relatedEvents: [
        "Recording Rubber Soul",
        "Artificial double tracking is introduced",
        "Sessions for \"Tomorrow Never Knows\"",
        "Release of Sgt. Pepper",
      ],
      deeperReading: "McCartney 3,2,1",
    },
    {
      title: "Their personalities and ambitions diverge",
      dek: "The qualities that made the Beatles complementary also began pulling them in different directions.",
      paragraphs: [
        "The familiar shorthand - John the rebellious wit, Paul the musical organizer, George the quiet guitarist, Ringo the stabilizing drummer - is useful but incomplete. All four were ambitious musicians developing at different speeds and seeking greater control over their work.",
        "John became increasingly interested in direct, personal, and experimental forms of expression. Paul was often the member most eager to keep the band active, proposing concepts, films, recording projects, and new arrangements. George's songwriting expanded dramatically, but he continued to receive less album space than John and Paul.",
        "These differences enriched the records. \"A Day in the Life\" joined contrasting Lennon and McCartney sections. George brought Indian music into the group's vocabulary. Ringo's drumming and vocal persona grounded increasingly elaborate productions. Yet decisions now required negotiation among four established artists rather than four young musicians fighting for a first opportunity.",
      ],
      quote: {
        text: "It was like four people who eventually recovered their individuality.",
        attribution: "John Lennon",
        needsVerification: true,
      },
      song: "A Day in the Life",
      relatedEvents: [
        "George's Indian musical studies",
        "John meets Yoko Ono",
        "Paul develops the Magical Mystery Tour project",
        "George's songs gain greater prominence",
      ],
      deeperReading: "The Beatles' retrospective accounts in Anthology",
    },
    {
      title: "India, Apple, and growing tension",
      dek: "The Beatles searched for freedom beyond pop stardom, but their experiments in spirituality and business exposed new divisions.",
      paragraphs: [
        "In early 1968, the Beatles traveled to Rishikesh to study Transcendental Meditation with Maharishi Mahesh Yogi. Removed from touring and much of ordinary celebrity life, they wrote a remarkable quantity of music. Many of those songs later appeared on The Beatles, commonly known as the White Album.",
        "Back in London, Apple Corps represented another attempt to reshape their lives. Conceived as a creative company through which artists might receive support without conventional corporate restrictions, Apple rapidly became expensive and difficult to manage. Brian Epstein had died in August 1967, leaving a vacuum that the Beatles could not easily fill.",
        "During the White Album sessions, the studio became crowded with individual projects, visitors, arguments, and long hours. Ringo temporarily left; George Martin sometimes withdrew; the musicians increasingly recorded in smaller combinations. The album's variety is part of its power, but it also reveals four creators whose shared center was weakening.",
      ],
      quote: {
        text: "It's great. It sold. It's the bloody Beatles' White Album.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "Dear Prudence",
      relatedEvents: [
        "Trip to Rishikesh",
        "Death of Brian Epstein",
        "Launch of Apple Corps",
        "Ringo temporarily leaves the White Album sessions",
      ],
      deeperReading: "Official Anthology overview of India, Apple, and the breakup",
    },
    {
      title: "The final recordings",
      dek: "Even as their partnership fractured, the Beatles remained capable of extraordinary collective work.",
      paragraphs: [
        "The filmed project that became Let It Be began in January 1969 with an optimistic premise: the Beatles would rehearse new material, perform it live, and allow cameras to document the process. Instead, the sessions exposed uncertainty over leadership, location, purpose, and musical direction.",
        "Yet the surviving footage also contains warmth, joking, experimentation, and moments when musical instinct reconnects them. Billy Preston's arrival lifted the atmosphere, and the rooftop performance at Apple became their final public concert.",
        "Later in 1969, they reconvened to make Abbey Road. George Martin agreed on the understanding that they would work with greater discipline. The resulting album contains major contributions from all four, including George's \"Something\" and \"Here Comes the Sun,\" Ringo's \"Octopus's Garden,\" and the long medley shaped largely through Paul and Martin's efforts.",
      ],
      quote: {
        text: "I'd like to say thank you on behalf of the group and ourselves.",
        attribution: "John Lennon",
      },
      song: "The End",
      relatedEvents: [
        "Twickenham rehearsals",
        "George temporarily leaves",
        "Rooftop concert",
        "Recording of the Abbey Road medley",
      ],
      deeperReading: "Official Beatles material on Let It Be and Abbey Road",
    },
    {
      title: "The breakup",
      dek: "The Beatles did not end in a single argument; their partnership dissolved through overlapping personal, artistic, financial, and legal conflicts.",
      paragraphs: [
        "By 1969, each Beatle imagined a different future. John had begun releasing work with Yoko Ono and privately told the others he wanted a \"divorce.\" George had accumulated songs and frustration. Ringo pursued acting and solo opportunities. Paul continued trying to generate group projects but increasingly felt isolated.",
        "Management intensified the divide. John, George, and Ringo supported Allen Klein, while Paul distrusted him and preferred the Eastman family, connected to his wife Linda. The disagreement involved control of the Beatles' finances and future, not merely personality.",
        "In April 1970, promotional material for Paul's first solo album was interpreted as announcing that he had left the Beatles. Public blame consequently settled on him, although John had privately declared his departure months earlier. Paul later sued to dissolve the legal partnership, believing this was necessary to protect the group's assets.",
      ],
      quote: {
        text: "I didn't leave the Beatles. The Beatles have left the Beatles.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "Let It Be",
      relatedEvents: [
        "John privately announces his departure",
        "Disagreement over Allen Klein",
        "Release of McCartney",
        "Paul files suit to dissolve the partnership",
      ],
      deeperReading: "John's 1970 Rolling Stone interview",
    },
    {
      title: "Why the story still matters",
      dek: "The Beatles matter not because they were perfect, but because millions of people can still hear human possibility inside their unfinished story.",
      paragraphs: [
        "The Beatles compressed an extraordinary evolution into less than a decade: local skiffle, rock-and-roll apprenticeship, pop mastery, studio experimentation, cultural symbolism, fragmentation, and reinvention. Their records altered expectations about songwriting, albums, production, performance, fashion, celebrity, and the artistic possibilities of popular music.",
        "Their continued relevance also comes from the personalities inside the achievement. Listeners can identify with John's vulnerability and defiance, Paul's melodic imagination and persistence, George's search for space and meaning, or Ringo's humor and steadiness. No single member explains the Beatles. The interest lies in what happened when their contrasting abilities met.",
        "The best place to end a beginner's path is therefore not with the courtroom or the breakup announcement. It is with an invitation: return to the recordings and listen for four distinct people somehow creating a fifth identity together.",
      ],
      quote: {
        text: "In the end, the love you take is equal to the love you make.",
        attribution: "Lennon-McCartney",
      },
      song: "In My Life",
      relatedEvents: [
        "The solo careers",
        "Lennon's death in 1980",
        "The Anthology reunion",
        "\"Now and Then\" completes an unfinished Lennon recording",
      ],
      deeperReading: "The Beatles Anthology",
    },
  ],
};

const startWithJohnAndPaul: StoryFixture = {
  title: "Start with John and Paul",
  readingTime: "Approximately 16-20 minutes",
  promise:
    "Follow the friendship, songwriting partnership, rivalry, estrangement, and enduring mythology at the center of the Beatles.",
  editorialNote:
    "Evidence labels separate documented claims, reasonable interpretations, and debated readings.",
  chapters: [
    {
      title: "The meeting",
      dek: "John Lennon met Paul McCartney as a potential bandmate and immediately encountered someone who might become both his strongest ally and his closest rival.",
      paragraphs: [
        "On 6 July 1957, John performed with the Quarrymen at St Peter's Church fete in Woolton. Ivan Vaughan introduced him to Paul, who demonstrated \"Twenty Flight Rock,\" showed that he knew complete lyrics and chords, and impressed the older boy with his musicianship.",
        "John later recalled facing a choice: Paul would improve the group, but he might also challenge John's leadership. He invited him anyway. That decision established a pattern that lasted throughout their partnership. Each man wanted recognition, but each also understood that the other could push him beyond what he might achieve alone.",
        "The meeting has acquired the aura of destiny because of everything that followed. At the time, however, it was a local encounter between two teenagers who were serious about music.",
      ],
      evidence: {
        documented:
          "The date, location, introduction by Ivan Vaughan, and Paul's musical demonstration.",
        inferred: "John immediately recognized Paul as an equal.",
        debated: "Whether the two had briefly encountered one another before the fete.",
      },
      quote: {
        text: "I dug him.",
        attribution: "John Lennon",
        needsVerification: true,
      },
      song: "Twenty Flight Rock",
      relatedEvents: [
        "Woolton fete",
        "Paul joins the Quarrymen",
        "First rehearsals",
        "Paul introduces George",
      ],
    },
    {
      title: "Shared loss and early closeness",
      dek: "Music gave John and Paul a language for feelings that neither found easy to express directly.",
      paragraphs: [
        "Paul's mother, Mary, died from complications following breast-cancer surgery in 1956, when Paul was fourteen. John's mother, Julia, was struck and killed by a car in 1958, less than a year after John met Paul.",
        "The two young men did not necessarily hold long emotional conversations about bereavement. Paul later remembered that simply knowing the other had also lost his mother created a bond. Music offered a less exposed form of intimacy. They could spend hours with guitars, exchange songs, imitate favorite records, and create something together without naming every underlying feeling.",
        "Loss should not be used as a total explanation for their partnership. They were drawn together by talent, humor, ambition, proximity, and musical taste. Nevertheless, their shared experience distinguished the relationship from ordinary school friendship.",
      ],
      evidence: {
        documented:
          "Both lost their mothers as teenagers and later connected the experience to their friendship.",
        inferred: "Songwriting served as a substitute for direct emotional disclosure.",
        debated: "How consciously grief shaped their earliest songs.",
      },
      quote: {
        text: "We both knew about that.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "Julia",
      relatedEvents: [
        "Mary McCartney's death",
        "Julia Lennon's death",
        "Early writing sessions",
        "\"Julia\" and \"Let It Be\"",
      ],
      deeperReading: "Paul's conversation with Sean Ono Lennon about John and Julia",
    },
    {
      title: "Learning to write together",
      dek: "John and Paul turned songwriting into a private ritual long before anyone knew the name Lennon-McCartney.",
      paragraphs: [
        "They often wrote at Paul's home on Forthlin Road, sitting opposite one another with guitars. Paul, being left-handed, created a mirror image of John. They would begin with a title, a phrase, a melody, or an unfinished section one of them had brought. When progress stopped, the other supplied a chord, word, bridge, or contrasting idea.",
        "Their earliest songs imitated the structures and subjects of the records they loved. What distinguished them was their commitment to writing at all. Most young British groups still relied primarily on American material. John and Paul began building a catalogue before they had a realistic market for it.",
        "They also agreed that their jointly written songs would bear both names. The order later settled as Lennon-McCartney, regardless of how much either had contributed to an individual piece.",
      ],
      evidence: {
        documented: "They wrote together at Forthlin Road and agreed to joint credit.",
        inferred:
          "Face-to-face writing trained them to anticipate one another's musical choices.",
        debated:
          "The exact division of labor on several songs, including \"In My Life\" and \"Eleanor Rigby.\"",
      },
      quote: {
        text: "We wrote eyeball to eyeball.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "I Saw Her Standing There",
      relatedEvents: [
        "\"In Spite of All the Danger\"",
        "Forthlin Road sessions",
        "Adoption of joint credit",
        "First professional songwriting success",
      ],
      deeperReading: "McCartney 3,2,1",
    },
    {
      title: "Hamburg and Paris",
      dek: "Away from Liverpool, John and Paul began constructing an identity that belonged to the two of them as much as to the band.",
      paragraphs: [
        "Hamburg placed them in an adult world of clubs, sex, alcohol, stimulants, art students, and exhausting performance schedules. John and Paul watched one another perform night after night and learned how to provoke, rescue, and challenge each other before an audience.",
        "In October 1961, Paul accompanied John to Paris around John's twenty-first birthday. John had received money from an aunt, and the pair abandoned an intended trip onward to Spain. They spent days exploring the city, listening to music, and adopting a new hairstyle associated with their Hamburg friend Jurgen Vollmer.",
        "The surviving accounts establish that the trip occurred, but later fan interpretations often give it more emotional or romantic specificity than the evidence supports.",
      ],
      evidence: {
        documented: "Their Hamburg residencies and 1961 trip to Paris.",
        inferred: "Travel strengthened a distinct John-Paul unit within the group.",
        debated:
          "The emotional or romantic meaning attached to the Paris trip by some fans.",
      },
      quote: {
        text: "We were just two young guys on the loose.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "Besame Mucho",
      relatedEvents: [
        "Hamburg residencies",
        "John's twenty-first birthday",
        "Paris trip",
        "Adoption of the Beatle haircut",
      ],
    },
    {
      title: "Lennon-McCartney becomes a system",
      dek: "Their partnership succeeded because it was not one fixed method but a flexible system for completing songs.",
      paragraphs: [
        "Some songs were composed almost equally from the beginning. Others arrived largely finished and received a bridge, lyric change, arrangement suggestion, or final polish from the partner. John tended toward compressed language, unexpected imagery, emotional exposure, and rock-and-roll directness. Paul often brought melodic range, formal structure, harmonic movement, and an ability to develop an arrangement.",
        "Their competition increased productivity. A strong Lennon song challenged McCartney to respond, and vice versa. The presence of the other also created an unusually demanding first audience.",
        "By the middle 1960s, they wrote together less often from the first line onward. Yet the system persisted through mutual editing and studio collaboration. \"A Day in the Life,\" for example, joined a Lennon framework with a contrasting McCartney section and a collective arrangement.",
      ],
      evidence: {
        documented:
          "Their methods ranged from close co-writing to finishing one another's work.",
        inferred: "Competition functioned as a quality-control mechanism.",
        debated:
          "Whether one partner should receive greater credit for particular jointly credited works.",
      },
      quote: {
        text: "We could finish each other's songs.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "We Can Work It Out",
      relatedEvents: [
        "First number-one songs",
        "\"We Can Work It Out\"",
        "\"A Day in the Life\"",
        "Transition toward more individual composition",
      ],
    },
    {
      title: "Affection, competition, and creative rivalry",
      dek: "John and Paul wanted the other's approval and feared being surpassed by him.",
      paragraphs: [
        "Their friendship contained teasing, admiration, jealousy, dependence, and competition. Each monitored the other's newest song. John could dismiss Paul's work as sentimental or conventional while contributing decisively to it; Paul could appear diplomatically supportive while arriving with a song polished enough to shift the balance of an album.",
        "This rivalry should not be simplified into hostility. The desire to impress one another helped produce the Beatles' rapid development. Paul later described John's praise as unusually valuable because John did not offer it freely. John, even when attacking Paul after the breakup, repeatedly acknowledged his ability.",
        "Their different public personas complicate interpretation. John's sarcasm made criticism easy to quote. Paul's indirectness could conceal resentment behind charm or practical action. Neither was a neutral narrator of the partnership, especially when interviewed after the breakup.",
      ],
      evidence: {
        documented:
          "They compared songs, corrected each other, and sometimes expressed jealousy or admiration.",
        inferred: "Each remained the other's most important artistic audience.",
        debated:
          "Whether competition was primarily productive, destructive, or both at different stages.",
      },
      quote: {
        text: "He was a great melody writer.",
        attribution: "John Lennon on Paul",
        needsVerification: true,
      },
      song: "Strawberry Fields Forever / Penny Lane",
      relatedEvents: [
        "\"Yesterday\"",
        "\"Strawberry Fields Forever\"",
        "\"Penny Lane\"",
        "Sgt. Pepper sessions",
      ],
    },
    {
      title: "Fame changes the balance",
      dek: "Success gave John and Paul everything they had pursued, while making ordinary friendship almost impossible.",
      paragraphs: [
        "During Beatlemania, the four Beatles lived inside a protective group identity. John and Paul still wrote in hotel rooms, backstage areas, cars, and borrowed houses, but the circumstances around them had changed. Every new song carried commercial expectations. Every remark could become a headline.",
        "The balance between them also shifted. John had founded the original group and initially appeared its natural leader. As touring became exhausting and John grew less interested in managing day-to-day momentum, Paul increasingly proposed projects and organized sessions.",
        "Drug use, changing relationships, political interests, and artistic independence further altered how they spent time. They remained capable of close collaboration, but they no longer inhabited exactly the same life.",
      ],
      evidence: {
        documented:
          "Paul increasingly initiated projects after touring ended and especially after Brian Epstein's death.",
        inferred: "This challenged John's sense of his original position in the group.",
        debated: "Whether Paul's leadership prolonged the Beatles or accelerated resentment.",
      },
      quote: {
        text: "Paul would want us to work, because he was the workaholic.",
        attribution: "John Lennon",
        needsVerification: true,
      },
      song: "Getting Better",
      relatedEvents: [
        "End of touring",
        "Sgt. Pepper",
        "Death of Brian Epstein",
        "Magical Mystery Tour",
      ],
    },
    {
      title: "New relationships and growing distance",
      dek: "Linda Eastman and Yoko Ono did not simply break up the Beatles, but their presence made changes in John and Paul's loyalties impossible to ignore.",
      paragraphs: [
        "John's relationship with Yoko Ono became emotionally, artistically, and politically central to his life. He brought her into spaces where the Beatles had traditionally worked without partners present. Paul's relationship with Linda Eastman similarly offered him a new domestic and creative future, while her family's legal expertise became relevant to the Beatles' business disputes.",
        "It is misleading to treat either woman as an outside invader who caused four men to lose control of their own choices. The Beatles already faced artistic divergence, grief following Brian Epstein's death, financial disorder, and competing visions for Apple.",
        "Nevertheless, new partnerships changed the structure of intimacy. John and Paul were no longer each other's most automatic companion, confidant, or creative destination.",
      ],
      evidence: {
        documented: "Yoko attended sessions; Paul married Linda; management divided the group.",
        inferred:
          "Their new partners supplied emotional security previously found partly within the band.",
        debated: "How directly Yoko or Linda influenced specific decisions.",
      },
      quote: {
        text: "The old gang of mine was over the moment I met her.",
        attribution: "John Lennon on Yoko",
        needsVerification: true,
      },
      song: "Don't Let Me Down",
      relatedEvents: [
        "John meets Yoko",
        "Paul meets Linda",
        "White Album sessions",
        "Klein-Eastman dispute",
      ],
    },
    {
      title: "The breakup becomes public",
      dek: "John privately left first, but Paul became the public face of the breakup.",
      paragraphs: [
        "In September 1969, John reportedly told the other Beatles that he wanted a \"divorce.\" The decision was initially kept private because business negotiations were still underway. Paul retreated to Scotland, experienced a period of depression and uncertainty, and began recording alone.",
        "In April 1970, a self-interview distributed with Paul's album McCartney stated that he did not foresee writing with John again. Newspapers treated the comments as an announcement that Paul had left the Beatles. John was angry that Paul appeared to receive credit for ending a group John believed he had already left.",
        "This distinction - private decision versus public disclosure - helped shape years of resentment. Paul felt blamed for an ending he had resisted. John felt Paul had staged the announcement to promote his album.",
      ],
      evidence: {
        documented:
          "John privately announced his departure; Paul's April 1970 comments made the breakup public; Paul filed suit.",
        inferred: "Both experienced the public narrative as a betrayal.",
        debated: "How deliberately Paul timed the McCartney announcement.",
      },
      quote: {
        text: "I started the band. I disbanded it.",
        attribution: "John Lennon",
        needsVerification: true,
      },
      song: "The Long and Winding Road",
      relatedEvents: [
        "John's private announcement",
        "Release of McCartney",
        "Release of Let It Be",
        "Partnership lawsuit",
      ],
    },
    {
      title: "Songs as conversation",
      dek: "After direct communication became difficult, listeners began hearing John and Paul speak to one another through records.",
      paragraphs: [
        "Paul's \"Too Many People\" contained lines John interpreted as criticism of him and Yoko. John answered with \"How Do You Sleep?,\" a deliberately cutting attack recorded with George Harrison. Paul's \"Dear Friend\" moved in the opposite direction, asking whether hostility had concealed fear and whether reconciliation remained possible.",
        "Not every post-Beatles song about conflict is necessarily about John or Paul. Songwriters combine biography, invention, wordplay, and multiple targets. Yet several connections are supported by direct comments from the writers.",
        "The songs therefore form a partial dialogue, not a secret code explaining everything, but a public arena where private resentment could be reshaped as art.",
      ],
      evidence: {
        documented:
          "John linked \"How Do You Sleep?\" to Paul; Paul acknowledged barbs in \"Too Many People.\"",
        inferred: "Other songs indirectly continue their dialogue.",
        debated:
          "Which songs were consciously directed at the other and how literally lyrics should be read.",
      },
      quote: {
        text: "The only thing you done was yesterday.",
        attribution: "\"How Do You Sleep?\"",
      },
      song: "Dear Friend",
      relatedEvents: [
        "Ram",
        "\"How Do You Sleep?\"",
        "Wild Life",
        "Partial easing of public attacks",
      ],
    },
    {
      title: "Contact after the breakup",
      dek: "Estrangement did not erase affection: John and Paul gradually found ways to speak, visit, joke, and listen to one another again.",
      paragraphs: [
        "Their early post-breakup relationship was bitter, but the public attacks eventually decreased. They communicated by telephone, exchanged messages through friends, and occasionally met. Paul visited John and Yoko in New York during the 1970s.",
        "One well-known evening in 1976 found them watching Saturday Night Live when producer Lorne Michaels jokingly offered the Beatles money to reunite. They reportedly considered going to the studio but did not.",
        "Their final years should not be turned into a completed reconciliation story. Business issues remained unresolved, visits could be awkward, and John sometimes complained that Paul arrived unannounced. Yet they were no longer simply enemies.",
      ],
      evidence: {
        documented:
          "Phone calls, visits, the 1976 Saturday Night Live incident, and John's enthusiasm for \"Coming Up.\"",
        inferred: "John and Paul were moving toward a mature friendship.",
        debated: "How close they had truly become by 1980.",
      },
      quote: {
        text: "It's driving me crackers!",
        attribution: "John Lennon praising \"Coming Up\"",
        needsVerification: true,
      },
      song: "Coming Up",
      relatedEvents: [
        "Paul's New York visits",
        "Saturday Night Live offer",
        "\"Coming Up\"",
        "John resumes recording",
      ],
    },
    {
      title: "Memory, grief, and McLennon interpretation",
      dek: "After John's death, Paul was left not only to mourn him but also to explain a relationship whose most important witness could no longer answer.",
      paragraphs: [
        "John was murdered in New York on 8 December 1980. Paul's first public response, \"It's a drag,\" was criticized as emotionally inadequate, but he later explained that he had been shocked and unable to express himself before reporters. His deeper response emerged through music, interviews, archival projects, and decades of retelling.",
        "\"Here Today,\" written as an imagined conversation, allowed Paul to say what everyday masculine reserve had prevented him from saying directly. He recalled one night in Key West when he and John drank, talked, and cried together.",
        "McLennon interpretation occupies several levels. At its broadest, it simply names the unusually intense Lennon-McCartney bond. Some readers understand that bond as emotionally romantic, queer, or containing unacknowledged desire. Others regard such claims as unsupported by evidence or too dependent on symbolic readings. A responsible site should neither ridicule these interpretations nor present them as fact.",
        "Another revealing, but methodologically complicated, statement came from Yoko Ono. In an interview with biographer Philip Norman, she reportedly recalled John saying that \"no one ever hurt him as much as Paul hurt him.\" Paul later said the remark deeply troubled him and left him wondering what John had meant and how he had caused such pain.",
        "The quotation is significant because it suggests that, in John's own emotional understanding, the breakup with Paul was not merely a professional disagreement. Hurt of that intensity usually depends on attachment: Paul could wound John so deeply because Paul had once mattered so deeply.",
        "At the same time, this is not a surviving direct quotation from John. It is Yoko's later account of something John allegedly told her, transmitted through an interview and then through Norman's writing. It should therefore be presented as evidence of how Yoko remembered John describing the relationship, not as an independently verified statement by John.",
      ],
      evidence: [
        {
          documented:
            "Their friendship, creative interdependence, physical affection, shared experiences, conflicts, and Paul's continuing grief.",
          inferred:
            "The relationship carried forms of intimacy that neither man could comfortably articulate.",
          debated:
            "Whether the bond included romantic or sexual feeling, and how terms such as love should be understood historically.",
        },
        {
          documented:
            "Yoko told Philip Norman that John had said no one had ever hurt him as Paul had; Paul later encountered the quotation and was reportedly distressed by it.",
          inferred:
            "John experienced the deterioration of his relationship with Paul as a profound personal betrayal or emotional loss, not simply a disagreement over music and business.",
          debated:
            "What John believed Paul had done to hurt him; whether Yoko reproduced John's words and intended meaning accurately; and how much weight should be placed on a secondhand recollection given after John's death.",
        },
      ],
      quote: {
        text: "I loved him.",
        attribution: "Paul McCartney",
        needsVerification: true,
      },
      song: "Here Today",
      relatedEvents: [
        "John's death",
        "Writing \"Here Today\"",
        "The Beatles Anthology",
        "Paul's later interviews and performances",
      ],
      deeperReading: "Paul's account of \"Here Today\" and the night he and John cried",
    },
  ],
};

const zhStartWithTheBeatles: StoryFixture = {
  title: "先认识披头士",
  readingTime: "约 12-15 分钟",
  promise:
    "认识四个来自利物浦的年轻人，看他们如何在短短几年里完成惊人的转变，也理解为什么这八年仍然影响着流行文化。",
  editorialNote:
    "第一稿：标注需要核对的引语，发布前应回到原始访谈、书籍、录音或逐字稿确认。",
  labels: {
    chapter: "章节",
    documented: "有记录",
    inferred: "可推断",
    debated: "仍有争议",
    representativeSong: "代表歌曲",
    relatedEvents: "相关事件",
    deeperReading: "延伸阅读",
    verifyWording: "需核对原文",
  },
  chapters: [
    {
      title: "来自利物浦的四个年轻人",
      dek: "在成为一种文化象征之前，披头士只是四个来自战后利物浦的年轻人，想用音乐逃出眼前生活的边界。",
      paragraphs: [
        "约翰·列侬最早组的是一支学生 skiffle 乐队，叫 Quarrymen。1957 年，保罗·麦卡特尼加入，带来了更稳定也更讲究的音乐感；不久后，保罗又介绍了更年轻的乔治·哈里森。乔治的吉他能力最终压过了约翰对他年龄的迟疑。林戈·斯塔则到 1962 年才加入，在那之前他已经是利物浦很受尊重的鼓手之一。",
        "他们一开始并不是后来记忆中那个完美平衡的四人组合。成员来来去去，名字改了又改，野心也还在成形。真正把这个早期团体黏在一起的，是他们对美国音乐的共同迷恋：Elvis Presley、Little Richard、Chuck Berry、Buddy Holly、节奏布鲁斯、乡村、女子组合，还有从进口唱片和 Radio Luxembourg 里听来的声音。",
        "利物浦本身也很重要。作为港口城市，它让外来的音乐、衣着和气味更早进入年轻人的视野。披头士吸收这些影响，先是模仿，随后慢慢把它们混合成某种只属于自己的东西。他们的故事不是从成名开始，而是从模仿、友谊、争执和近乎蛮横的练习开始。",
      ],
      quote: {
        text: "Before Elvis, there was nothing.",
        attribution: "约翰·列侬",
        needsVerification: true,
      },
      song: "That'll Be the Day",
      relatedEvents: [
        "约翰组建 Quarrymen",
        "保罗加入乐队",
        "乔治为约翰试弹",
        "林戈取代 Pete Best",
      ],
      deeperReading: "披头士官方 Anthology 相关材料",
    },
    {
      title: "约翰遇见保罗",
      dek: "一个教堂游园会的下午，造就了后来披头士最核心的创作关系。",
      paragraphs: [
        "1957 年 7 月 6 日，Quarrymen 在伍尔顿的圣彼得教堂游园会上演出。下午演出结束后，共同的朋友 Ivan Vaughan 把 16 岁的约翰·列侬介绍给了 15 岁的保罗·麦卡特尼。",
        "保罗当场表现出他会正确给吉他调音，并弹唱了 Eddie Cochran 的《Twenty Flight Rock》等歌。他不只是会弹，还知道约翰喜欢的那些歌的歌词、和弦和结构。约翰被打动了，但邀请保罗加入也意味着要把一部分主导权让给一个可能同样有才华的人。",
        "这种张力后来成了两人关系的核心。他们是朋友、合作者、竞争者，也是彼此最严厉的修改者。一个人开了头，另一个人常常能把它完成。那次见面没有立刻产生披头士，却产生了披头士最重要的创作轴心。",
      ],
      quote: {
        text: "I dug him.",
        attribution: "约翰谈保罗的音乐能力",
        needsVerification: true,
      },
      song: "Twenty Flight Rock",
      relatedEvents: [
        "1957 年 7 月 6 日伍尔顿教堂游园会",
        "Ivan Vaughan 介绍约翰和保罗认识",
        "保罗示范《Twenty Flight Rock》",
        "保罗被邀请加入 Quarrymen",
      ],
      deeperReading: "圣彼得教堂关于“约翰遇见保罗那一天”的历史介绍",
    },
    {
      title: "汉堡改变了乐队",
      dek: "在汉堡，披头士不再像一群会弹歌的男孩，而开始真正变成一支职业乐队。",
      paragraphs: [
        "从 1960 年开始，他们多次到汉堡红灯区的俱乐部演出。条件很艰苦：住处狭窄，环境陌生，演出一场接一场，有时要撑上好几个小时。为了抓住吵闹观众的注意力，他们必须更大声、更持久、更快，也更有自信。",
        "汉堡扩大了他们的曲库，也磨出了他们的舞台本能。早期披头士身上的皮衣、向前梳的发型、黑色幽默和带点挑衅的团体气质，都和他们在德国结识的朋友与艺术学生有关，尤其是 Astrid Kirchherr 和 Klaus Voormann。",
        "这段经历并不全是浪漫故事。乔治因为未成年被遣返；保罗和鼓手 Pete Best 因住处起火事件被遣返；Stuart Sutcliffe 离开乐队，并在 1962 年去世。但当披头士回到利物浦时，观众看到的已经是一支明显更强的乐队。",
      ],
      quote: {
        text: "We had to learn millions of songs.",
        attribution: "乔治·哈里森",
        needsVerification: true,
      },
      song: "Some Other Guy",
      relatedEvents: [
        "第一次汉堡驻演",
        "乔治被遣返",
        "与 Tony Sheridan 录音",
        "Stuart Sutcliffe 离队与去世",
      ],
      deeperReading: "The Beatles Anthology 中关于汉堡的章节",
    },
    {
      title: "Beatlemania",
      dek: "不到两年，一支受欢迎的利物浦乐队变成了席卷全球的青年文化现象。",
      paragraphs: [
        "经纪人 Brian Epstein 打磨了披头士的公众形象，并为他们争取到制作人 George Martin 的试音机会。林戈加入后，后来熟悉的四人阵容终于完整。《Love Me Do》在 1962 年把他们带到全国视野里；《Please Please Me》《She Loves You》和《I Want to Hold Your Hand》则把受欢迎推成了狂热。",
        "Beatlemania 不只是连续几张畅销唱片。它是一种新的公共经验：尖叫的人群、没完没了的报道、警察护送、挤满的剧院、电影、周边商品，以及年轻人把音乐人当成自己这一代人的代表。披头士的幽默和不太端着的样子，让他们看上去不同于传统娱乐明星。",
        "1964 年 2 月他们抵达美国，把英国的成功推成了全球名声。巡演把他们从剧院带到体育场，从欧洲带到北美、亚洲和澳大利亚。规模前所未有，但尖叫声和封闭生活也让真正意义上的现场演奏越来越不可能。",
      ],
      quote: {
        text: "We were just four guys who made it very, very big.",
        attribution: "林戈·斯塔",
        needsVerification: true,
      },
      song: "She Loves You",
      relatedEvents: [
        "Brian Epstein 成为经纪人",
        "George Martin 签下乐队",
        "皇家综艺演出",
        "首次登上 The Ed Sullivan Show",
      ],
      deeperReading: "The Beatles: Eight Days a Week - The Touring Years",
    },
    {
      title: "录音室成为一种乐器",
      dek: "停止巡演之后，披头士开始用录音技术创造无法在舞台上原样发生的音乐。",
      paragraphs: [
        "早期唱片记录的是一支现场乐队的能量。到 60 年代中期，录音室变成了发明空间。与 George Martin 以及 EMI 工程师合作时，他们尝试磁带循环、变速、倒放、人声双轨、管弦配器、非常规乐器，以及通过剪辑拼接出来的结构。",
        "Rubber Soul 已经显示出更统一的专辑意识。Revolver 又往前推了一步：《Tomorrow Never Knows》让约翰的声音被循环和处理后的声响包围；《Eleanor Rigby》没有传统摇滚配器，而用了弦乐八重奏；《Yellow Submarine》则像一个小型声音世界。随后 Sgt. Pepper's Lonely Hearts Club Band 把整张专辑本身变成了一次想象事件。",
        "录音室没有取消人与人之间的合作。约翰、保罗、乔治、林戈、Martin 和工程团队仍然依靠彼此的点子。但工作方式变了：他们不再只是把现场表演保存到磁带上，而是可以一层一层地建造一首歌。",
      ],
      quote: {
        text: "The studio was our workshop.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "Tomorrow Never Knows",
      relatedEvents: [
        "录制 Rubber Soul",
        "人工双轨技术投入使用",
        "《Tomorrow Never Knows》录音",
        "Sgt. Pepper 发行",
      ],
      deeperReading: "McCartney 3,2,1",
    },
    {
      title: "性格与野心开始分流",
      dek: "让披头士彼此互补的那些特质，也开始把他们拉向不同方向。",
      paragraphs: [
        "常见的速写很有用：约翰是叛逆的机智者，保罗是音乐上的组织者，乔治是安静的吉他手，林戈是稳定节奏的人。但这太简化了。四个人都是有野心的音乐人，只是成长速度、表达需求和对控制权的渴望并不相同。",
        "约翰越来越被直接、私人和实验性的表达吸引。保罗常常是最想让乐队继续运转的人，不断提出概念、电影、录音计划和新编曲。乔治的写作迅速成熟，但在专辑空间上仍然少于约翰和保罗。",
        "这些差异也丰富了唱片。《A Day in the Life》把 Lennon 和 McCartney 两种截然不同的段落接在一起。乔治把印度音乐带入乐队语汇。林戈的鼓和声音形象稳住了越来越复杂的制作。但决策已经不再是四个年轻人为第一次机会拼命，而是四个成熟创作者之间的协商。",
      ],
      quote: {
        text: "It was like four people who eventually recovered their individuality.",
        attribution: "约翰·列侬",
        needsVerification: true,
      },
      song: "A Day in the Life",
      relatedEvents: [
        "乔治学习印度音乐",
        "约翰遇见 Yoko Ono",
        "保罗推动 Magical Mystery Tour 项目",
        "乔治的歌曲越来越重要",
      ],
      deeperReading: "披头士在 Anthology 中的回顾",
    },
    {
      title: "印度、Apple 与不断升高的紧张",
      dek: "披头士想在流行巨星身份之外寻找自由，但灵性和商业实验都暴露了新的分裂。",
      paragraphs: [
        "1968 年初，披头士前往印度瑞诗凯诗，跟随 Maharishi Mahesh Yogi 学习超觉静坐。离开巡演和日常名人生活后，他们写下了大量歌曲，其中许多后来进入 The Beatles，也就是常说的 White Album。",
        "回到伦敦后，Apple Corps 成为他们重塑生活的另一次尝试。它原本被设想为一个帮助艺术家摆脱传统公司束缚的创意公司，却很快变得昂贵、混乱且难以管理。Brian Epstein 已在 1967 年 8 月去世，留下的空缺不是披头士自己能轻易填上的。",
        "White Album 录音期间，录音室里充满各自的项目、访客、争论和漫长工作。林戈一度离开；George Martin 有时选择抽身；成员们越来越常以小组合录音。这张专辑的丰富性正是它的力量，但它也显露出四个创作者共同中心的削弱。",
      ],
      quote: {
        text: "It's great. It sold. It's the bloody Beatles' White Album.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "Dear Prudence",
      relatedEvents: [
        "前往瑞诗凯诗",
        "Brian Epstein 去世",
        "Apple Corps 成立",
        "林戈暂时离开 White Album 录音",
      ],
      deeperReading: "官方 Anthology 对印度、Apple 与解散阶段的回顾",
    },
    {
      title: "最后的录音",
      dek: "即使关系正在破裂，披头士仍然能共同完成惊人的作品。",
      paragraphs: [
        "后来成为 Let It Be 的影像项目，在 1969 年 1 月开始时有一个乐观设想：披头士排练新歌、现场演出，并让摄像机记录整个过程。实际情况却暴露出领导权、地点、目标和音乐方向上的不确定。",
        "但保存下来的影像里也有温暖、玩笑、试探和音乐本能重新接上的瞬间。Billy Preston 的加入改善了气氛，而 Apple 屋顶演出成为他们最后一次公开演出。",
        "1969 年后期，他们又聚在一起制作 Abbey Road。George Martin 同意参与，前提是大家更有纪律地工作。这张专辑包含四个人的重要贡献，包括乔治的《Something》和《Here Comes the Sun》、林戈的《Octopus's Garden》，以及很大程度上由保罗和 Martin 推动成形的长组曲。",
      ],
      quote: {
        text: "I'd like to say thank you on behalf of the group and ourselves.",
        attribution: "约翰·列侬",
      },
      song: "The End",
      relatedEvents: [
        "Twickenham 排练",
        "乔治短暂离开",
        "屋顶演出",
        "录制 Abbey Road 组曲",
      ],
      deeperReading: "关于 Let It Be 与 Abbey Road 的官方披头士资料",
    },
    {
      title: "解散",
      dek: "披头士不是在一次争吵里结束的；他们的关系是在个人、艺术、财务和法律冲突交叠中慢慢解体的。",
      paragraphs: [
        "到 1969 年，每个成员都在想象不同的未来。约翰已经开始与 Yoko Ono 发表作品，并私下告诉其他人他想要“离婚”。乔治积累了越来越多歌曲和不满。林戈尝试表演和个人机会。保罗仍想推动团体项目，却越来越孤立。",
        "经纪问题加剧了分裂。约翰、乔治和林戈支持 Allen Klein，保罗不信任他，更倾向于妻子 Linda 所属的 Eastman 家族。争论的核心是披头士的财务和未来控制权，而不只是性格不合。",
        "1970 年 4 月，保罗首张个人专辑的宣传材料被媒体理解为他宣布离开披头士。于是公众责任落到保罗身上，虽然约翰几个月前已经私下表明要退出。保罗后来起诉要求解散法律合伙关系，因为他认为这是保护乐队资产的必要方式。",
      ],
      quote: {
        text: "I didn't leave the Beatles. The Beatles have left the Beatles.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "Let It Be",
      relatedEvents: [
        "约翰私下宣布离开",
        "围绕 Allen Klein 的分歧",
        "McCartney 发行",
        "保罗提起解散合伙关系的诉讼",
      ],
      deeperReading: "约翰 1970 年 Rolling Stone 访谈",
    },
    {
      title: "为什么这个故事仍然重要",
      dek: "披头士重要，不是因为他们完美，而是因为人们仍能在这个未完成的故事里听见人的可能性。",
      paragraphs: [
        "披头士把一次惊人的演化压缩在不到十年里：本地 skiffle、摇滚学徒期、流行歌曲的成熟、录音室实验、文化象征、分裂与重新发明。他们的唱片改变了人们对写歌、专辑、制作、表演、时尚、名人和流行音乐艺术可能性的期待。",
        "他们持续相关，也来自成就内部那些具体的人。听众可以认出约翰的脆弱和反抗、保罗的旋律想象和坚持、乔治对空间和意义的寻找、林戈的幽默和稳定。没有任何一个成员能单独解释披头士。真正迷人的，是这些不同能力相遇时发生了什么。",
        "所以，给新读者的这条路径最好不要停在法庭或解散新闻上，而是停在一个邀请上：回到唱片里，听四个不同的人如何一度共同创造出第五种身份。",
      ],
      quote: {
        text: "In the end, the love you take is equal to the love you make.",
        attribution: "Lennon-McCartney",
      },
      song: "In My Life",
      relatedEvents: [
        "四人的个人生涯",
        "1980 年约翰去世",
        "Anthology 重聚项目",
        "Now and Then 完成一段未完成的 Lennon 录音",
      ],
      deeperReading: "The Beatles Anthology",
    },
  ],
};

const zhStartWithJohnAndPaul: StoryFixture = {
  title: "走近约翰与保罗",
  readingTime: "约 16-20 分钟",
  promise:
    "沿着友谊、创作搭档、竞争、疏远和后来不断被重读的神话，进入披头士故事最核心的一段关系。",
  editorialNote:
    "证据标签用于区分有记录的事实、合理推断和仍有争议的解读。",
  labels: {
    chapter: "章节",
    documented: "有记录",
    inferred: "可推断",
    debated: "仍有争议",
    representativeSong: "代表歌曲",
    relatedEvents: "相关事件",
    deeperReading: "延伸阅读",
    verifyWording: "需核对原文",
  },
  chapters: [
    {
      title: "相遇",
      dek: "约翰·列侬第一次见到保罗·麦卡特尼时，看到的不只是一个可能加入乐队的人，也可能是自己最强的盟友和最接近的对手。",
      paragraphs: [
        "1957 年 7 月 6 日，约翰和 Quarrymen 在伍尔顿圣彼得教堂游园会上演出。Ivan Vaughan 把他介绍给保罗。保罗演示了《Twenty Flight Rock》，表现出他知道完整歌词、和弦和弹法，这让年长一点的约翰印象很深。",
        "约翰后来回忆说，他面临一个选择：保罗会让乐队变好，但也可能挑战自己的领导位置。他还是邀请了保罗。这个决定建立了一种后来持续很久的模式：两个人都想被看见，也都明白对方能把自己推到独自达不到的地方。",
        "这次见面后来被赋予了命运感，因为后面发生的一切太大了。但在当时，它只是两个认真对待音乐的少年在本地活动上的相遇。重要之处不在于立刻亲密，而在于识别：约翰看见保罗有用的知识和能力，保罗也看见约翰的魅力和一支已经在运转的乐队。",
      ],
      evidence: {
        documented:
          "日期、地点、Ivan Vaughan 的介绍，以及保罗当场展示音乐能力。",
        inferred: "约翰很快意识到保罗可能成为与自己相当的人。",
        debated: "两人在游园会前是否曾经短暂见过。",
      },
      quote: {
        text: "I dug him.",
        attribution: "约翰·列侬",
        needsVerification: true,
      },
      song: "Twenty Flight Rock",
      relatedEvents: [
        "伍尔顿教堂游园会",
        "保罗加入 Quarrymen",
        "早期排练",
        "保罗介绍乔治",
      ],
    },
    {
      title: "共同的失去与早期亲近",
      dek: "音乐给了约翰和保罗一种语言，让他们能处理那些不容易直接说出口的感受。",
      paragraphs: [
        "保罗的母亲 Mary 在 1956 年因乳腺癌手术后的并发症去世，当时保罗 14 岁。约翰的母亲 Julia 在 1958 年被车撞死，距离约翰认识保罗还不到一年。约翰和 Julia 的关系原本就复杂：他主要由 Mimi 姨妈抚养，但那时刚开始重新接近母亲。",
        "这两个年轻人未必进行过很长、很直接的哀伤谈话。保罗后来记得，只是知道对方也失去了母亲，就已经形成了一种连接。音乐提供了一种不那么暴露的亲密方式。他们可以抱着吉他待上几个小时，交换歌曲，模仿喜欢的唱片，一起创造东西，而不必把所有底层情绪都说出来。",
        "失去母亲不应该被当成解释他们关系的一切。他们靠近彼此，也因为才华、幽默、野心、距离和共同音乐口味。但共同的丧亲经验确实让这段关系不同于普通校园友谊。两个人都知道，看似稳定的家庭世界会突然消失。",
      ],
      evidence: {
        documented:
          "两人都在青少年时期失去母亲，并在后来把这一经历与彼此关系联系起来。",
        inferred: "写歌在某种程度上替代了直接的情感表白。",
        debated: "悲伤在多大程度上有意识地塑造了他们最早的歌曲。",
      },
      quote: {
        text: "We both knew about that.",
        attribution: "保罗谈共同的失去",
        needsVerification: true,
      },
      song: "Julia",
      relatedEvents: [
        "Mary McCartney 去世",
        "Julia Lennon 去世",
        "早期写歌",
        "《Julia》和《Let It Be》",
      ],
      deeperReading: "保罗与 Sean Ono Lennon 关于约翰和 Julia 的谈话",
    },
    {
      title: "学会一起写歌",
      dek: "在 Lennon-McCartney 这个名字被世界知道之前，约翰和保罗已经把写歌变成了一种私密仪式。",
      paragraphs: [
        "他们常在保罗位于 Forthlin Road 的家里写歌，面对面抱着吉他坐着。保罗是左撇子，于是和约翰形成一种镜像。他们会从一个标题、一句话、一段旋律，或其中一个人带来的半成品开始。卡住时，另一个人补上和弦、词、桥段或相反的想法。",
        "他们最早的歌模仿的是喜爱唱片里的结构和主题。真正特别的是他们愿意自己写。许多英国年轻乐队仍主要依赖美国作品时，约翰和保罗已经在没有明确市场的情况下积累自己的曲库。",
        "他们也同意共同创作的歌署两个人的名字。后来顺序固定为 Lennon-McCartney，不论某首歌具体是谁写得更多。这个共同品牌很强大，但也逐渐遮住了真实分工，并为后来的作者权争论留下空间。",
      ],
      evidence: {
        documented: "他们曾在 Forthlin Road 一起写歌，并同意共同署名。",
        inferred: "面对面写作训练了他们预判彼此音乐选择的能力。",
        debated: "若干歌曲的具体分工，包括《In My Life》和《Eleanor Rigby》。",
      },
      quote: {
        text: "We wrote eyeball to eyeball.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "I Saw Her Standing There",
      relatedEvents: [
        "《In Spite of All the Danger》",
        "Forthlin Road 写歌",
        "采用共同署名",
        "第一次职业写歌成功",
      ],
      deeperReading: "McCartney 3,2,1",
    },
    {
      title: "汉堡与巴黎",
      dek: "离开利物浦后，约翰和保罗开始建造一种既属于乐队、也特别属于他们两个人的身份。",
      paragraphs: [
        "汉堡把他们放进一个成人世界：俱乐部、性、酒精、兴奋剂、艺术学生和极度消耗体力的演出安排。约翰的舞台攻击性和保罗的音乐适应力，都在同一个环境里成长。他们夜夜看着对方表演，也学会了如何在观众面前刺激、补位和挑战彼此。",
        "1961 年 10 月，约翰 21 岁生日左右，保罗陪他去了巴黎。约翰从姨妈那里得到一笔钱，两人放弃了继续去西班牙的原计划。他们在巴黎闲逛、听音乐，并采用了与汉堡朋友 Jurgen Vollmer 有关的新发型。",
        "这次旅行后来成为他们私人神话的一部分：两个野心勃勃的年轻人，短暂脱离家庭和乐队的要求。现存资料可以确定旅行发生过，但后来的歌迷解读常常赋予它比证据本身更明确的情感或浪漫含义。",
      ],
      evidence: {
        documented: "他们在汉堡驻演，也在 1961 年一起去了巴黎。",
        inferred: "旅行加强了乐队内部一个独特的 John-Paul 单位。",
        debated: "一些歌迷赋予巴黎之行的情感或浪漫意义。",
      },
      quote: {
        text: "We were just two young guys on the loose.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "Besame Mucho",
      relatedEvents: [
        "汉堡驻演",
        "约翰 21 岁生日",
        "巴黎之行",
        "采用 Beatle 发型",
      ],
    },
    {
      title: "Lennon-McCartney 成为一种系统",
      dek: "这段搭档关系之所以成功，是因为它不是一种固定方法，而是一套能把歌完成的弹性系统。",
      paragraphs: [
        "有些歌几乎从一开始就是两人共同写出来的；有些歌来时已经基本完成，只是从另一方那里得到桥段、歌词修改、编曲建议或最后润色。约翰常有更压缩的语言、意外的意象、情感暴露和摇滚直接性。保罗常带来更宽的旋律、形式结构、和声移动和发展编曲的能力。但这只是倾向，不是规则：约翰也能写出精致旋律，保罗也能做出粗粝实验。",
        "他们的竞争提高了产量。一首强的 Lennon 歌会逼 McCartney 回应，反过来也一样。对方的存在也是极其苛刻的第一批听众。一个点子必须经得住房间另一头的挑眉、玩笑、纠正，或者更好的替代方案。",
        "到 60 年代中期，他们越来越少从第一句开始共同写一首歌。但这个系统仍以互相修改和录音室合作的方式存在。《A Day in the Life》就是一个例子：Lennon 的框架、McCartney 的对照段落，以及全体共同完成的编曲结合在一起。",
      ],
      evidence: {
        documented: "他们的合作方式从紧密共写到为彼此完成作品都有。",
        inferred: "竞争起到了一种质量控制作用。",
        debated: "某些共同署名作品是否应该给其中一方更多创作权重。",
      },
      quote: {
        text: "We could finish each other's songs.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "We Can Work It Out",
      relatedEvents: [
        "早期冠军单曲",
        "《We Can Work It Out》",
        "《A Day in the Life》",
        "逐渐转向更个人化的创作",
      ],
    },
    {
      title: "亲近、竞争与创作上的较劲",
      dek: "约翰和保罗都想得到对方的认可，也害怕被对方超过。",
      paragraphs: [
        "他们的友谊里有打趣、欣赏、嫉妒、依赖和竞争。每个人都会盯着对方的新歌。约翰可以一边说保罗的作品太甜或太常规，一边给出关键贡献；保罗也可以表面圆滑支持，同时带来一首完成度很高的歌，改变整张专辑的重心。",
        "这种竞争不应被简化为敌意。想让对方刮目相看，正是披头士快速发展的动力之一。保罗后来形容约翰的称赞格外珍贵，因为约翰并不轻易夸人。约翰即使在解散后攻击保罗，也反复承认他的能力。",
        "两人的公众形象让解读更复杂。约翰的讽刺很容易被引用成批评。保罗的迂回有时会把怨气藏在魅力和实际行动后面。尤其在解散后的访谈里，两人都不是中立叙述者。",
      ],
      evidence: {
        documented: "他们比较歌曲、互相修改，也时常表达嫉妒或欣赏。",
        inferred: "对彼此而言，对方仍是最重要的艺术听众。",
        debated: "竞争在不同阶段主要是建设性的、破坏性的，还是两者兼有。",
      },
      quote: {
        text: "He was a great melody writer.",
        attribution: "约翰谈保罗",
        needsVerification: true,
      },
      song: "Strawberry Fields Forever / Penny Lane",
      relatedEvents: [
        "《Yesterday》",
        "《Strawberry Fields Forever》",
        "《Penny Lane》",
        "Sgt. Pepper 录音",
      ],
    },
    {
      title: "成名改变了平衡",
      dek: "成功给了约翰和保罗他们追求的一切，也让普通友谊几乎不可能继续以原来的方式存在。",
      paragraphs: [
        "Beatlemania 期间，四个披头士生活在一种保护性的团体身份里。约翰和保罗仍在旅馆房间、后台、车里和借来的房子里写歌，但周围环境已经变了。每首新歌都有商业期待，每句话都可能变成标题。他们的关系不再只是私人关系，也是一种值钱的出版身份和国际生意的发动机。",
        "两人之间的平衡也改变了。约翰创建了最早的乐队，起初看起来是自然的领袖。巡演变得耗尽人后，约翰越来越不愿管理日常推进，保罗则越来越常提出项目、组织录音。对保罗来说，这也许是在让乐队活下去；对约翰和其他人来说，却可能像被过去的小弟管理。",
        "药物、关系变化、政治兴趣和艺术独立性，也进一步改变了他们花时间的方式。他们仍然能密切合作，但已经不再生活在完全同一个世界里。",
      ],
      evidence: {
        documented:
          "停止巡演后，尤其是 Brian Epstein 去世后，保罗越来越常主动发起项目。",
        inferred: "这挑战了约翰对自己原始位置的感受。",
        debated: "保罗的领导究竟延长了披头士，还是加速了怨气。",
      },
      quote: {
        text: "Paul would want us to work, because he was the workaholic.",
        attribution: "约翰·列侬",
        needsVerification: true,
      },
      song: "Getting Better",
      relatedEvents: [
        "停止巡演",
        "Sgt. Pepper",
        "Brian Epstein 去世",
        "Magical Mystery Tour",
      ],
    },
    {
      title: "新的伴侣与越来越远的距离",
      dek: "Linda Eastman 和 Yoko Ono 并不是简单地“拆散披头士”的人，但她们的出现让约翰和保罗的亲密重心变化变得无法忽视。",
      paragraphs: [
        "约翰与 Yoko Ono 的关系，逐渐成为他情感、艺术和政治生活的中心。他把她带进过去通常不允许伴侣进入的披头士工作空间。保罗与 Linda Eastman 的关系，也给了他新的家庭和创作未来；Linda 家族的法律资源随后又与披头士的商业争端发生关联。",
        "把任何一位女性说成外来入侵者，导致四个男人失去控制，这种说法是误导性的。披头士已经面对艺术分流、Brian Epstein 去世后的失重、财务混乱和 Apple 的不同愿景。",
        "但新的伴侣确实改变了亲密关系的结构。约翰和保罗不再自动成为彼此最自然的同伴、倾诉对象或创作目的地。Yoko 出现在录音室，成为更深变化的可见符号：约翰不再接受披头士旧有边界。保罗与 Eastman 一方的联盟，也影响了经纪争端。",
      ],
      evidence: {
        documented:
          "Yoko 出席录音；保罗与 Linda 结婚；经纪问题使乐队分裂。",
        inferred: "新的伴侣提供了过去部分来自乐队内部的情感安全。",
        debated: "Yoko 或 Linda 对具体决定的影响到底有多直接。",
      },
      quote: {
        text: "The old gang of mine was over the moment I met her.",
        attribution: "约翰谈 Yoko",
        needsVerification: true,
      },
      song: "Don't Let Me Down",
      relatedEvents: [
        "约翰遇见 Yoko",
        "保罗遇见 Linda",
        "White Album 录音",
        "Klein 与 Eastman 之争",
      ],
    },
    {
      title: "解散成为公共事件",
      dek: "约翰私下先离开，但保罗成了公众眼中宣布解散的人。",
      paragraphs: [
        "1969 年 9 月，约翰据说告诉其他披头士，他想要“离婚”。因为商业谈判仍在进行，这个决定起初被保密。保罗退到苏格兰，经历了一段抑郁和不确定，并开始独自录音。",
        "1970 年 4 月，随保罗个人专辑 McCartney 发布的一份自问自答里，他说自己看不到再与约翰共同写作的可能。报纸把这些话当成保罗宣布离开披头士。约翰很愤怒，因为在他看来，自己已经先离开了，保罗却像是拿到了解散乐队的公共署名。",
        "这种区别——私下决定与公开披露——塑造了后来的多年怨气。保罗觉得自己因一个他曾努力抵抗的结局而被责备。约翰觉得保罗把这件事安排成了个人专辑宣传。保罗起诉其他三人要求解散合伙关系后，法律冲突进一步加深。",
      ],
      evidence: {
        documented:
          "约翰私下宣布离开；保罗 1970 年 4 月的评论使解散公开化；保罗提起诉讼。",
        inferred: "两人都把公众叙事体验为某种背叛。",
        debated: "保罗是否有意把 McCartney 的发布与解散新闻绑定。",
      },
      quote: {
        text: "I started the band. I disbanded it.",
        attribution: "约翰·列侬",
        needsVerification: true,
      },
      song: "The Long and Winding Road",
      relatedEvents: [
        "约翰私下宣布离开",
        "McCartney 发行",
        "Let It Be 发行",
        "合伙关系诉讼",
      ],
    },
    {
      title: "像对话一样的歌曲",
      dek: "当直接沟通变得困难，听众开始在唱片里听见约翰和保罗彼此说话。",
      paragraphs: [
        "保罗的《Too Many People》里有几句被约翰理解为针对他和 Yoko。约翰用《How Do You Sleep?》回应，那是一首刻意尖锐的攻击歌，录音中还有乔治·哈里森参与。保罗的《Dear Friend》则走向相反方向，像是在问：敌意是否掩盖了恐惧，和解是否仍然可能。",
        "不是每一首披头士解散后的冲突之歌都一定关于约翰或保罗。写歌者会混合个人经历、虚构、文字游戏和多个对象。但有些连接得到作者直接评论支持。",
        "因此，这些歌形成了一种部分对话。它不是能解释一切的秘密密码，而是一个公共场域，让私人怨气被改写成艺术。",
      ],
      evidence: {
        documented:
          "约翰把《How Do You Sleep?》与保罗联系起来；保罗承认《Too Many People》里有刺。",
        inferred: "其他歌曲也可能间接延续这场对话。",
        debated: "哪些歌是有意识写给对方的，以及歌词应被多字面地阅读。",
      },
      quote: {
        text: "The only thing you done was yesterday.",
        attribution: "《How Do You Sleep?》",
      },
      song: "Dear Friend",
      relatedEvents: [
        "Ram",
        "《How Do You Sleep?》",
        "Wild Life",
        "公开攻击逐渐缓和",
      ],
    },
    {
      title: "解散后的联系",
      dek: "疏远没有抹掉感情：约翰和保罗后来逐渐找到方式继续通话、拜访、开玩笑，也继续听见对方。",
      paragraphs: [
        "解散初期，他们的关系很苦涩，但公开攻击最终减少了。他们通过电话联系，通过朋友传话，也偶尔见面。70 年代，保罗曾去纽约拜访约翰和 Yoko。",
        "1976 年一个著名夜晚，两人一起看 Saturday Night Live，制作人 Lorne Michaels 在节目里开玩笑说愿意付钱请披头士重聚。他们据说真的考虑过直接去演播室，但最后没有去。",
        "最后几年不应被改写成一个完成的和解故事。商业问题仍未解决，拜访有时尴尬，约翰也曾抱怨保罗不打招呼就来。但他们已经不再只是敌人。1980 年，约翰听到保罗的《Coming Up》并热烈称赞；这首歌据说也刺激了他重新录音的动力。",
      ],
      evidence: {
        documented:
          "电话、拜访、1976 年 Saturday Night Live 事件，以及约翰对《Coming Up》的热情。",
        inferred: "约翰和保罗正在走向一种更成熟的友谊。",
        debated: "到 1980 年时，他们究竟已经重新亲近到什么程度。",
      },
      quote: {
        text: "It's driving me crackers!",
        attribution: "约翰称赞《Coming Up》",
        needsVerification: true,
      },
      song: "Coming Up",
      relatedEvents: [
        "保罗拜访纽约",
        "Saturday Night Live 重聚玩笑",
        "《Coming Up》",
        "约翰恢复录音",
      ],
    },
    {
      title: "记忆、哀悼与 McLennon 解读",
      dek: "约翰去世后，保罗不仅要哀悼他，也不得不解释一段最重要的见证者再也无法回应的关系。",
      paragraphs: [
        "约翰于 1980 年 12 月 8 日在纽约被杀。保罗最初对记者说出的“It's a drag”曾被批评为不够悲伤，但他后来解释，那一刻自己处于震惊中，无法在记者面前表达。更深的回应后来出现在音乐、访谈、档案项目和几十年的反复讲述里。",
        "《Here Today》写成一段想象中的对话，让保罗说出日常男性克制曾阻止他说出口的话。他回忆过在 Key West 的一个夜晚，他和约翰喝酒、谈话，并一起哭了。",
        "“McLennon”解读有好几个层次。最宽泛地说，它只是给 Lennon-McCartney 那种异常强烈的联系命名。一些读者把这种联系理解为情感上的浪漫、酷儿意味或未被承认的欲望。另一些人则认为这类说法缺乏证据，或太依赖象征性阅读。一个负责任的网站既不应该嘲笑这些解读，也不应该把它们当作事实呈现。",
        "另一个很有揭示性、但方法上更复杂的说法来自 Yoko Ono。她在与传记作者 Philip Norman 的访谈中据说回忆，约翰曾说“没有人像保罗那样伤害过他”。保罗后来表示这句话让他很困扰，也让他不断想约翰究竟是什么意思，自己又是怎样造成了那样的痛。",
        "这句话重要，是因为它暗示在约翰自己的情感理解里，他和保罗的破裂不只是职业分歧。那种强度的伤害通常依赖于依恋：保罗能如此伤到约翰，是因为保罗曾经如此重要。",
        "同时，这并不是一条保留下来的约翰直接引语。它是 Yoko 后来对约翰曾告诉她的话的回忆，又通过访谈和 Norman 的写作传递出来。因此，它应该被呈现为 Yoko 如何记得约翰描述这段关系的证据，而不是一条可以独立核实的约翰原话。",
      ],
      evidence: [
        {
          documented:
            "他们的友谊、创作互依、身体亲近、共同经历、冲突，以及保罗持续多年的哀悼。",
          inferred: "这段关系包含一些两人都难以舒服说清的亲密形式。",
          debated:
            "这段联系是否包含浪漫或性意味，以及“爱”这样的词在历史语境中应如何理解。",
        },
        {
          documented:
            "Yoko 告诉 Philip Norman，约翰曾说没有人像保罗那样伤害过他；保罗后来接触到这句话，并据说深受困扰。",
          inferred:
            "约翰把与保罗关系的恶化体验为深刻的个人背叛或情感失去，而不只是音乐和商业上的分歧。",
          debated:
            "约翰认为保罗到底做了什么伤害他；Yoko 是否准确再现了约翰的原话和意思；以及在约翰去世后出现的二手回忆应被赋予多大权重。",
        },
      ],
      quote: {
        text: "I loved him.",
        attribution: "保罗·麦卡特尼",
        needsVerification: true,
      },
      song: "Here Today",
      relatedEvents: [
        "约翰去世",
        "写下《Here Today》",
        "The Beatles Anthology",
        "保罗后来的访谈和演出",
      ],
      deeperReading: "保罗关于《Here Today》以及“那晚我们一起哭了”的回忆",
    },
  ],
};

export const storyFixtures = {
  start: {
    en: startWithTheBeatles,
    zh: zhStartWithTheBeatles,
  },
  johnAndPaul: {
    en: startWithJohnAndPaul,
    zh: zhStartWithJohnAndPaul,
  },
} satisfies Record<"start" | "johnAndPaul", Record<Locale, StoryFixture>>;

export function getStoryFixture(
  page: keyof typeof storyFixtures,
  locale: Locale,
) {
  return storyFixtures[page][locale];
}
