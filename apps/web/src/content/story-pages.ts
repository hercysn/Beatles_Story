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
    "从利物浦、汉堡、Beatlemania、录音室实验到最后的录音，先抓住披头士故事的主线。",
  editorialNote: "中文完整译稿待补；当前页面先保留清晰的章节入口。",
  chapters: startWithTheBeatles.chapters.map((chapter) => ({
    ...chapter,
    paragraphs: [chapter.dek],
    quote: undefined,
    deeperReading: undefined,
  })),
};

const zhStartWithJohnAndPaul: StoryFixture = {
  title: "走近约翰与保罗",
  readingTime: "约 16-20 分钟",
  promise:
    "沿着相遇、共同创作、竞争、疏远、和解与 McLennon 解读，进入披头士故事最核心的一段关系。",
  editorialNote: "中文完整译稿待补；当前页面先保留证据标签和章节结构。",
  chapters: startWithJohnAndPaul.chapters.map((chapter) => ({
    ...chapter,
    paragraphs: [chapter.dek],
    quote: undefined,
    deeperReading: undefined,
  })),
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
