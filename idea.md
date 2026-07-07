# Beatles Story Website — Implementation Plan

## 1. Product goal

Build a multilingual website that gives newcomers a quick but compelling introduction to:

* the Beatles;
* John and Paul’s partnership;
* McLennon as a historical and interpretive lens;
* memorable anecdotes and hidden connections;
* the songs, relationships, and turning points that make the story interesting.

The website should not attempt to be the largest Beatles archive.

Its main purpose is to help a visitor move from:

```text
I know little about the Beatles
        ↓
I understand the main story
        ↓
I am intrigued by John and Paul
        ↓
I discover memorable anecdotes and connections
        ↓
I want to explore the music and original sources
```

The product promise is:

> **Understand the Beatles. Follow John and Paul. Discover the moments that make their story unforgettable.**

---

# 2. Core product principles

## 2.1 Story first

The primary experience should be guided storytelling, not an empty search box or a giant chronology.

New visitors should immediately see:

* where to begin;
* why the story is interesting;
* which events matter;
* which anecdote to explore next.

## 2.2 Anecdotes as first-class content

Small moments should be treated as standalone content objects.

Examples include:

* Paul mentioning Paris in the “The End of the End” interview;
* a quotation that gains meaning when connected to an earlier event;
* conflicting memories of the same meeting;
* a private joke resurfacing years later;
* a post-breakup song that appears to respond to another song;
* a famous photograph whose surrounding story is not widely known.

## 2.3 Concise surface, deep evidence

Every story should have several levels:

1. a one-sentence hook;
2. a concise explanation;
3. the surrounding timeline;
4. original sources;
5. interpretations and disputes.

## 2.4 Fact and interpretation must remain separate

Every claim should be marked internally as one of:

* documented fact;
* corroborated recollection;
* disputed recollection;
* reasonable interpretation;
* fandom theory.

The site should be emotionally engaging without presenting speculation as established history.

## 2.5 Multilingual from the beginning

The underlying event and anecdote records should be language-independent.

English and Simplified Chinese will be the first supported languages.

Translations should be stored as localized content attached to the same canonical record.

---

# 3. Initial MVP scope

The first public version should contain:

* a homepage;
* a “Start with the Beatles” guided introduction;
* a “Start with John and Paul” guided introduction;
* an anecdote collection;
* individual anecdote pages;
* a basic historical timeline;
* source and evidence panels;
* English and Simplified Chinese;
* a private editorial dashboard;
* manually entered seed content;
* automated ingestion from a small number of Tumblr blogs;
* AI-assisted drafting, but no fully automatic publication.

The MVP should not initially include:

* public user accounts;
* comments;
* a social network;
* a complete Beatles discography;
* every known Beatles event;
* automatic publishing without review;
* model fine-tuning;
* a native mobile application.

---

# 4. Recommended technology stack

## Frontend

* Next.js
* TypeScript
* App Router
* React Server Components where appropriate
* Tailwind CSS
* shadcn/ui or a similarly lightweight component system
* `next-intl` for internationalization

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy or direct Supabase/PostgreSQL access
* background processing scripts

## Database

* PostgreSQL
* Supabase for the first deployment

## Storage

* Supabase Storage initially
* Cloudflare R2 later if media storage grows

## Hosting

* Vercel for the Next.js site
* Supabase for PostgreSQL, authentication, and storage
* GitHub Actions for scheduled ingestion during the prototype stage
* a persistent Python worker later if necessary

## AI and ML

Use API models initially for:

* relevance classification;
* event extraction;
* anecdote proposal;
* summarization;
* translation;
* connection suggestions;
* contradiction detection.

Use embeddings for:

* semantic search;
* duplicate detection;
* anecdote-to-event matching;
* related-content recommendations.

---

# 5. Repository structure

Use a monorepo.

```text
beatles-story/
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── content/
│       ├── lib/
│       ├── messages/
│       └── public/
│
├── services/
│   ├── api/
│   │   ├── app/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── tests/
│   │
│   ├── ingestion/
│   │   ├── collectors/
│   │   ├── parsers/
│   │   ├── normalization/
│   │   └── jobs/
│   │
│   └── processing/
│       ├── extraction/
│       ├── summarization/
│       ├── translation/
│       ├── deduplication/
│       └── evaluation/
│
├── packages/
│   ├── database/
│   ├── shared-types/
│   ├── prompts/
│   ├── terminology/
│   └── content-schemas/
│
├── supabase/
│   ├── migrations/
│   └── seed/
│
├── scripts/
├── tests/
├── docs/
└── .github/
    └── workflows/
```

---

# 6. Main website structure

## 6.1 Homepage

The homepage should immediately communicate the site’s purpose.

### Hero section

Headline:

> **Understand the Beatles. Follow John and Paul.**

Supporting text:

> A guided introduction to the music, relationships, anecdotes, and hidden connections that make their story unforgettable.

Primary actions:

* Start with the Beatles
* Start with John and Paul
* Discover an anecdote

### Homepage sections

1. **Choose your starting point**
2. **A moment you may have missed**
3. **The story in ten turning points**
4. **Why John and Paul still fascinate people**
5. **Explore through songs, places, and relationships**
6. **Recently added discoveries**
7. **How we distinguish fact from interpretation**

---

## 6.2 “Start with the Beatles” story path

Target reading time: 10–15 minutes.

Suggested chapters:

1. Four young musicians from Liverpool
2. John meets Paul
3. Hamburg transforms the group
4. Beatlemania
5. The studio becomes an instrument
6. Their personalities and ambitions diverge
7. India, Apple, and growing tension
8. The final recordings
9. The breakup
10. Why the story still matters

Each chapter should include:

* title;
* one-sentence hook;
* 150–300 words;
* one or two images;
* one representative quotation;
* one representative song;
* two to four related events;
* an optional deeper-reading link.

---

## 6.3 “Start with John and Paul” story path

Target reading time: 12–20 minutes.

Suggested chapters:

1. The meeting
2. Shared loss and early closeness
3. Learning to write together
4. Hamburg and Paris
5. Lennon–McCartney becomes a system
6. Affection, competition, and creative rivalry
7. Fame changes the balance
8. New relationships and growing distance
9. The breakup becomes public
10. Songs as conversation
11. Contact after the breakup
12. Memory, grief, and McLennon interpretation

Each chapter should clearly distinguish:

* what is documented;
* what is inferred;
* what remains debated.

---

## 6.4 Anecdote discovery page

This should feel like a visual collection rather than a database table.

Filters:

* person;
* time period;
* place;
* song;
* album;
* relationship;
* tone;
* evidence level;
* beginner relevance.

Tone categories:

* funny;
* affectionate;
* bittersweet;
* revealing;
* competitive;
* contradictory;
* disputed;
* easily overlooked.

Example card:

```text
A much better place, Paris

Decades after traveling to Paris with John,
Paul unexpectedly named Paris while discussing
a journey to a “better place.”

[Read the story]
```

---

## 6.5 Anecdote detail page

Each anecdote page should contain:

### Header

* title;
* short hook;
* date or date range;
* people;
* place;
* evidence status.

### Sections

1. What happened?
2. Why is it interesting?
3. What came before?
4. The connection
5. What is documented?
6. What is interpretation?
7. Sources
8. Related songs, events, and anecdotes

### Connection chain

Display a concise sequence such as:

```text
1961 Paris trip
    ↓
later recollections of the trip
    ↓
“The End of the End”
    ↓
2007 interview mentioning Paris
    ↓
later fan interpretation
```

---

## 6.6 Timeline

The timeline is supporting infrastructure, not the main product.

Features:

* year and era filters;
* people filters;
* event categories;
* exact versus approximate dates;
* documented versus disputed labels;
* connection to anecdotes;
* multilingual display.

The timeline should prioritize curated events rather than every possible date.

---

## 6.7 Entity pages

Initial entity types:

* people;
* songs;
* albums;
* places;
* events;
* relationships.

Example person page sections:

* concise introduction;
* role in the story;
* key relationships;
* major events;
* memorable anecdotes;
* representative quotations;
* related songs;
* sources.

---

# 7. Content model

## 7.1 Source

```typescript
type Source = {
  id: string;
  title: string;
  sourceType:
    | "primary"
    | "official"
    | "book"
    | "interview"
    | "article"
    | "tumblr"
    | "fan-research"
    | "other";
  author?: string;
  publisher?: string;
  url?: string;
  publicationDate?: string;
  originalLanguage?: string;
  reliabilityTier: number;
  rightsNotes?: string;
  createdAt: string;
};
```

## 7.2 Raw document

```typescript
type RawDocument = {
  id: string;
  sourceId: string;
  externalId?: string;
  rawText: string;
  normalizedText?: string;
  originalUrl: string;
  publishedAt?: string;
  fetchedAt: string;
  contentHash: string;
  language?: string;
  metadata: Record<string, unknown>;
};
```

## 7.3 Event

```typescript
type Event = {
  id: string;
  eventType: string;
  startDate?: string;
  endDate?: string;
  datePrecision:
    | "exact"
    | "month"
    | "year"
    | "approximate"
    | "range"
    | "disputed";
  locationId?: string;
  confidence: number;
  reviewStatus: "draft" | "review" | "approved" | "rejected";
};
```

## 7.4 Anecdote

```typescript
type Anecdote = {
  id: string;
  slug: string;
  primaryEventId?: string;
  evidenceLevel:
    | "documented"
    | "corroborated"
    | "single-recollection"
    | "disputed"
    | "interpretive"
    | "fandom-theory";
  toneTags: string[];
  beginnerPriority: number;
  confidence: number;
  reviewStatus: "draft" | "review" | "approved" | "rejected";
};
```

## 7.5 Localized anecdote content

```typescript
type AnecdoteTranslation = {
  id: string;
  anecdoteId: string;
  locale: "en" | "zh-CN";
  title: string;
  hook: string;
  whatHappened: string;
  whyInteresting: string;
  historicalContext?: string;
  documentedSection: string;
  interpretationSection?: string;
  translationStatus:
    | "draft"
    | "machine-translated"
    | "reviewed"
    | "approved";
};
```

## 7.6 Claim

Claims should be stored separately so evidence can be attached precisely.

```typescript
type Claim = {
  id: string;
  anecdoteId?: string;
  eventId?: string;
  claimType:
    | "fact"
    | "recollection"
    | "interpretation"
    | "disputed"
    | "theory";
  confidence: number;
  reviewStatus: string;
};
```

## 7.7 Claim-source relationship

```typescript
type ClaimSource = {
  claimId: string;
  sourceId: string;
  sourceExcerpt?: string;
  supportType:
    | "supports"
    | "contradicts"
    | "context"
    | "mentions";
};
```

## 7.8 Connection

```typescript
type Connection = {
  id: string;
  fromType: "event" | "anecdote" | "person" | "song" | "place";
  fromId: string;
  toType: "event" | "anecdote" | "person" | "song" | "place";
  toId: string;
  connectionType:
    | "chronological"
    | "thematic"
    | "quoted-reference"
    | "possible-allusion"
    | "shared-place"
    | "shared-language"
    | "interpretive";
  confidence: number;
  reviewStatus: string;
};
```

---

# 8. Editorial dashboard

The admin area should support the complete human-review workflow.

## Main review queues

* newly ingested documents;
* potential duplicates;
* proposed anecdotes;
* proposed events;
* unsupported claims;
* translation review;
* connection suggestions;
* failed processing jobs.

## Anecdote editor

The editor should show:

* original source;
* extracted quotation;
* proposed title;
* hook;
* factual summary;
* interpretation;
* related events;
* related people;
* related songs;
* evidence level;
* confidence;
* English version;
* Chinese version.

Actions:

* approve;
* edit;
* reject;
* merge;
* split;
* attach source;
* detach source;
* change evidence classification.

---

# 9. Ingestion pipeline

## Phase 1 sources

Begin with:

* three to five curated Tumblr blogs;
* one official Beatles source;
* one reliable historical/reference source;
* manually added sources.

## Pipeline stages

```text
Collect
  ↓
Normalize
  ↓
Deduplicate
  ↓
Classify relevance
  ↓
Extract entities and dates
  ↓
Match existing events
  ↓
Propose anecdote or timeline entry
  ↓
Generate draft summary
  ↓
Attach claims and sources
  ↓
Human review
  ↓
Translate approved content
  ↓
Publish
```

## Tumblr collector responsibilities

The collector should save:

* Tumblr post ID;
* blog name;
* original poster;
* reblog chain;
* post date;
* tags;
* text;
* image metadata;
* source links;
* notes count if available;
* fetched timestamp.

Do not treat a reblog as an independent historical source unless it adds meaningful commentary.

---

# 10. AI processing pipeline

## 10.1 Relevance classification

Determine whether a post contains:

* a historical claim;
* a useful quotation;
* an anecdote;
* interpretation;
* fan art or fiction;
* unrelated material;
* duplicate content.

## 10.2 Event extraction

Extract:

* date;
* people;
* location;
* song or album;
* event type;
* factual claims;
* uncertainty.

## 10.3 Anecdote proposal

The model should answer:

* What is the memorable moment?
* Why would a newcomer care?
* What prior context is required?
* Which earlier or later events connect to it?
* What is factual?
* What is interpretive?
* Is the anecdote strong enough to publish?

## 10.4 Connection proposal

The system should look for:

* repeated places;
* repeated phrases;
* referenced journeys;
* recurring jokes;
* contrasting recollections;
* songs and interviews connected by wording;
* events separated by many years but linked conceptually.

## 10.5 Translation

Translate only content that has been approved in the canonical language.

Translation must use:

* a Beatles glossary;
* standardized names;
* preferred song-title treatment;
* translation memory;
* quotation-preservation rules.

---

# 11. Seed content strategy

The first version should not depend on the automated pipeline producing good content immediately.

We should manually create a strong set of launch material.

## Initial story paths

* The Beatles in ten turning points
* John and Paul: from first meeting to breakup
* John and Paul after the breakup

## Initial anecdotes

Start with approximately 15–25 carefully reviewed anecdotes.

Suggested categories:

* first meeting;
* shared loss;
* Hamburg;
* Paris;
* early songwriting;
* affectionate quotations;
* creative rivalry;
* studio collaboration;
* India;
* breakup disputes;
* post-breakup songs;
* private meetings;
* later recollections;
* Paul after John’s death;
* disputed McLennon interpretations.

The Paris and “The End of the End” connection should be one of the first complete anecdote prototypes because it demonstrates the website’s unique value.

---

# 12. Design direction

## Visual tone

The site should feel:

* warm;
* archival;
* modern;
* intimate;
* readable;
* inviting to newcomers.

Avoid making it feel like:

* a generic fan wiki;
* a tabloid;
* an academic database;
* an imitation of 1960s psychedelic graphics;
* a Tumblr dashboard.

## Suggested visual system

* cream or warm neutral background;
* strong typography;
* restrained archival accents;
* black-and-white photography;
* one or two accent colors;
* large quotation treatments;
* clear evidence labels;
* subtle timeline connectors.

## Core reusable components

* StoryChapter
* AnecdoteCard
* AnecdoteDetail
* ConnectionChain
* EvidenceBadge
* SourceDrawer
* QuoteCard
* TimelineEvent
* PersonChip
* SongChip
* InterpretationNotice
* LanguageSwitcher
* ReadingLevelSelector

---

# 13. Reading modes

Offer three reading levels.

## New to the Beatles

Includes:

* explanations of people and context;
* fewer names;
* short historical introductions;
* recommended next steps.

## Familiar with the story

Includes:

* more quotations;
* additional event connections;
* fewer introductory explanations.

## Deep-dive mode

Includes:

* source excerpts;
* conflicting accounts;
* detailed chronology;
* interpretation history;
* bibliographic notes.

This can initially be implemented as a frontend display preference rather than separate generated content.

---

# 14. Multilingual implementation

Routes:

```text
/en
/en/start
/en/john-and-paul
/en/anecdotes
/en/anecdotes/paris-a-better-place

/zh
/zh/start
/zh/john-and-paul
/zh/anecdotes
/zh/anecdotes/paris-a-better-place
```

Store slugs separately from translated display titles.

The canonical content record should remain shared across languages.

The Chinese version should sometimes add cultural context rather than using direct translation alone.

Examples:

* Liverpool’s postwar environment;
* British school and class culture;
* skiffle;
* Hamburg’s role;
* British humor;
* historical attitudes toward male friendship;
* English wordplay.

---

# 15. Search and discovery

The MVP search should support:

* people;
* songs;
* albums;
* places;
* anecdote titles;
* quotations;
* aliases;
* Chinese and English names.

Later semantic search can support questions such as:

* Why is Paris important to John and Paul?
* Which songs are commonly interpreted as messages between them?
* What happened between India and the breakup?
* Which anecdotes involve jealousy?
* What did Paul say about John after his death?

---

# 16. Trust and transparency

Every content page should include:

* evidence classification;
* source links;
* last reviewed date;
* whether AI assisted the draft;
* whether a human approved it;
* correction mechanism.

Suggested labels:

* Documented
* Corroborated
* Recollected later
* Disputed
* Interpretation
* Fandom theory

The labels should be visually clear but not intrusive.

---

# 17. Testing strategy

## Frontend tests

* route rendering;
* language switching;
* story progression;
* anecdote filtering;
* source drawer behavior;
* accessibility;
* responsive layout.

## Backend tests

* Tumblr normalization;
* duplicate detection;
* date parsing;
* entity alias resolution;
* claim-source relationships;
* translation status transitions.

## Content tests

Automatically detect:

* missing citations;
* unsupported claims;
* approved pages without translations;
* broken source URLs;
* duplicate anecdotes;
* exact dates with insufficient evidence;
* interpretation presented as fact.

---

# 18. Development milestones

## Milestone 1: Project skeleton

Deliverables:

* monorepo;
* Next.js application;
* Tailwind;
* English and Chinese routing;
* Supabase connection;
* initial database migrations;
* homepage shell;
* deployment to Vercel.

## Milestone 2: Static prototype

Deliverables:

* homepage;
* story-path page;
* anecdote collection;
* anecdote detail page;
* connection-chain component;
* evidence labels;
* five manually entered anecdotes;
* responsive design.

At this point, the product concept should be visually testable without ingestion or AI.

## Milestone 3: Content backend

Deliverables:

* PostgreSQL schema;
* content API;
* source model;
* claims;
* events;
* anecdotes;
* translations;
* admin-only editing forms.

## Milestone 4: Tumblr ingestion

Deliverables:

* source registry;
* Tumblr collector;
* incremental fetch checkpoints;
* raw-document storage;
* normalization;
* exact duplicate detection;
* ingestion logs.

## Milestone 5: AI-assisted drafting

Deliverables:

* relevance classifier;
* structured event extraction;
* anecdote proposal;
* summary generation;
* evidence classification;
* connection proposal;
* draft review queue.

## Milestone 6: Multilingual workflow

Deliverables:

* approved-content translation;
* glossary;
* translation review;
* Chinese launch content;
* multilingual search aliases.

## Milestone 7: Public MVP

Deliverables:

* 15–25 reviewed anecdotes;
* two complete introductory story paths;
* public timeline;
* source pages;
* SEO metadata;
* sitemap;
* analytics;
* error monitoring;
* correction form.

## Milestone 8: ML improvement

Deliverables:

* embedding search;
* semantic duplicate detection;
* related-anecdote ranking;
* editorial-decision dataset;
* evaluation suite;
* relevance and importance classifiers.

---

# 19. Recommended Codex workflow

Use Codex in small, verifiable tasks.

Do not ask it to build the entire website in one prompt.

## Task sequence

### Task 1

Create the monorepo and base Next.js application.

### Task 2

Add localization and locale-aware routing.

### Task 3

Create the database schema and migrations.

### Task 4

Create TypeScript types matching the database records.

### Task 5

Build the homepage from static fixture data.

### Task 6

Build the anecdote-card and anecdote-detail components.

### Task 7

Build the connection-chain and evidence-label components.

### Task 8

Add five seed anecdotes.

### Task 9

Create the public content API.

### Task 10

Build the editorial dashboard.

### Task 11

Implement the Tumblr collector.

### Task 12

Add processing and AI draft-generation jobs.

### Task 13

Add translation workflow.

### Task 14

Add tests, monitoring, and deployment configuration.

Each Codex task should require:

* implementation;
* tests;
* documentation;
* commands to run;
* a summary of changed files.

---

# 20. First Codex prompt

Use the following as the first implementation prompt:

```text
We are building a multilingual Beatles storytelling website.

The product is not intended to be a comprehensive Beatles encyclopedia. Its purpose is to give newcomers a quick, compelling introduction to the Beatles, John and Paul’s partnership, McLennon as an interpretive lens, and memorable anecdotes or hidden historical connections.

Create the initial monorepo skeleton.

Technical requirements:

- Use a pnpm workspace.
- Create a Next.js application in apps/web.
- Use TypeScript.
- Use the Next.js App Router.
- Add Tailwind CSS.
- Add ESLint and Prettier.
- Add next-intl for English and Simplified Chinese.
- Create locale-aware routes for /en and /zh.
- Add placeholder pages for:
  - homepage
  - /start
  - /john-and-paul
  - /anecdotes
  - /timeline
- Create directories for:
  - services/api
  - services/ingestion
  - services/processing
  - packages/shared-types
  - packages/content-schemas
  - packages/prompts
  - packages/terminology
  - supabase/migrations
- Add a root README explaining the project structure and local-development commands.
- Add basic unit-test infrastructure.
- Add a GitHub Actions workflow that runs linting, type checking, and tests.

Do not add the database or AI integrations yet.

The visual shell should include:
- a shared header;
- a language switcher;
- a simple footer;
- warm neutral styling;
- a homepage hero containing:
  “Understand the Beatles. Follow John and Paul.”
- three primary links:
  “Start with the Beatles”
  “Start with John and Paul”
  “Discover an anecdote”

Return:
1. a summary of the implementation;
2. the resulting directory structure;
3. commands to install and run the project;
4. any design or technical assumptions;
5. the tests added.
```

---

# 21. Definition of MVP success

The MVP is successful when a new visitor can:

1. understand the Beatles’ basic story in less than 15 minutes;
2. understand why John and Paul’s relationship is compelling;
3. discover at least one anecdote they had not previously known;
4. see why the anecdote matters;
5. distinguish documented history from interpretation;
6. inspect the original sources;
7. continue exploring related events, songs, or people;
8. use the experience in either English or Chinese.

The project should optimize for curiosity created, not information volume.
