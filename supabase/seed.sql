insert into public.sources (
  id,
  title,
  source_type,
  author,
  publisher,
  url,
  publication_date,
  original_language,
  reliability_tier,
  rights_notes
) values
  (
    '10000000-0000-0000-0000-000000000001',
    'Beatles Bible chronology: John and Paul travel to Paris',
    'article',
    null,
    'The Beatles Bible',
    'https://www.beatlesbible.com/1961/09/30/john-lennon-paul-mccartney-travel-paris/',
    null,
    'en',
    3,
    'Reference link for editorial verification.'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Paul McCartney Project: Paul and George hitchhiking trip',
    'fan-research',
    null,
    'The Paul McCartney Project',
    'https://www.the-paulmccartney-project.com/1959/08/paul-mccartney-and-george-harrisons-hitchhiking-trip/',
    null,
    'en',
    3,
    'Reference link for editorial verification.'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Beatles Interviews: John Lennon Playboy interview, 1980',
    'interview',
    null,
    'Beatles Interviews',
    'https://www.beatlesinterviews.org/db1980.jlpb.beatles.html',
    '1980',
    'en',
    2,
    'Reference link for editorial verification.'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Museum of Liverpool: When Paul McCartney met John Lennon',
    'official',
    null,
    'Museum of Liverpool',
    'https://www.liverpoolmuseums.org.uk/stories/when-paul-mccartney-met-john-lennon',
    null,
    'en',
    2,
    'Reference link for editorial verification.'
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'Circulating Anthology-era blue light clip',
    'other',
    null,
    'YouTube',
    'https://www.youtube.com/watch?v=kGtqsQ72xV8',
    null,
    'en',
    5,
    'Provisional source; original production source still needs verification.'
  )
on conflict (id) do update set
  title = excluded.title,
  source_type = excluded.source_type,
  author = excluded.author,
  publisher = excluded.publisher,
  url = excluded.url,
  publication_date = excluded.publication_date,
  original_language = excluded.original_language,
  reliability_tier = excluded.reliability_tier,
  rights_notes = excluded.rights_notes;

insert into public.events (
  id,
  event_type,
  start_date,
  end_date,
  date_precision,
  confidence,
  review_status,
  metadata
) values
  (
    '20000000-0000-0000-0000-000000000001',
    'trip',
    '1961-09-30',
    null,
    'exact',
    0.900,
    'approved',
    '{"label":"John and Paul leave Liverpool for Paris"}'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'meeting',
    '1957-07-06',
    null,
    'exact',
    0.950,
    'approved',
    '{"label":"John Lennon meets Paul McCartney at Woolton"}'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'record_release',
    '1980-04-11',
    null,
    'exact',
    0.800,
    'approved',
    '{"label":"Coming Up is released"}'
  )
on conflict (id) do update set
  event_type = excluded.event_type,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  date_precision = excluded.date_precision,
  confidence = excluded.confidence,
  review_status = excluded.review_status,
  metadata = excluded.metadata;

insert into public.anecdotes (
  id,
  slug,
  primary_event_id,
  evidence_level,
  tone_tags,
  date_label,
  people_tags,
  place_label,
  related_tags,
  beginner_priority,
  confidence,
  review_status,
  metadata
) values
  (
    '30000000-0000-0000-0000-000000000001',
    'much-better-place-paris',
    '20000000-0000-0000-0000-000000000001',
    'interpretive',
    array['affectionate','bittersweet','easily overlooked'],
    '1961 and 2007',
    array['Paul McCartney','John Lennon'],
    'Paris',
    array['John and Paul','Paris','The End of the End','Memory'],
    2,
    0.700,
    'approved',
    '{"connectionChain":["1961 Paris trip","John’s twenty-first birthday","The End of the End","2007 interview mentioning Paris","later fan interpretation"]}'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'paul-george-hitchhiking-shock',
    null,
    'corroborated',
    array['funny','revealing','easily overlooked'],
    'Late 1950s and 2026',
    array['Paul McCartney','George Harrison','Olivia Harrison'],
    'Wales, Devon, and southwest England',
    array['Paul and George','Hitchhiking','Memory','Pre-fame'],
    3,
    0.750,
    'approved',
    '{"connectionChain":["teenage Paul and George friendship","hitchhiking holidays","electric milk float","George’s zipper shock","Paul retells the memory decades later"]}'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    'john-21st-birthday-paris',
    '20000000-0000-0000-0000-000000000001',
    'documented',
    array['affectionate','revealing','formative'],
    '30 September-October 1961',
    array['John Lennon','Paul McCartney','Jürgen Vollmer','Aunt Mimi'],
    'Paris',
    array['John and Paul','Paris','Jürgen Vollmer','Beatles image'],
    1,
    0.900,
    'approved',
    '{"connectionChain":["John receives £100","John invites Paul","planned Spain trip","Paris stay","Vollmer hairstyle influence","Beatles visual identity"]}'
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    'coming-up-pulls-john-back',
    '20000000-0000-0000-0000-000000000003',
    'corroborated',
    array['competitive','revealing','bittersweet'],
    '1980',
    array['Paul McCartney','John Lennon','Yoko Ono'],
    'New York and England',
    array['Coming Up','Double Fantasy','Songs as conversation','1980'],
    2,
    0.800,
    'approved',
    '{"connectionChain":["Paul records Coming Up","John hears the single","John praises it in 1980","competitive creative spark","John returns to sustained recording","Double Fantasy"]}'
  ),
  (
    '30000000-0000-0000-0000-000000000005',
    'blue-light-paul-talks-about-john',
    null,
    'fandom-theory',
    array['symbolic','affectionate','disputed'],
    '1995',
    array['Paul McCartney','John Lennon'],
    'Anthology-era interview footage',
    array['Anthology','John’s presence','Memory','Symbolic moments'],
    5,
    0.350,
    'approved',
    '{"connectionChain":["Anthology-era interview","Paul discusses John","blue light appears","Paul reportedly says it was John","fans interpret the moment symbolically","source work remains provisional"]}'
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    'john-paul-meet-1957',
    '20000000-0000-0000-0000-000000000002',
    'documented',
    array['formative','revealing','documented'],
    '6 July 1957',
    array['John Lennon','Paul McCartney','Ivan Vaughan','The Quarry Men'],
    'Woolton, Liverpool',
    array['Woolton','The Quarry Men','Ivan Vaughan','Lennon-McCartney'],
    1,
    0.950,
    'approved',
    '{"connectionChain":["Woolton Parish Church fête","Quarry Men performance","Ivan Vaughan introduces Paul","Paul impresses John","John weighs the challenge","Paul joins the Quarry Men","Lennon-McCartney begins"]}'
  )
on conflict (id) do update set
  slug = excluded.slug,
  primary_event_id = excluded.primary_event_id,
  evidence_level = excluded.evidence_level,
  tone_tags = excluded.tone_tags,
  date_label = excluded.date_label,
  people_tags = excluded.people_tags,
  place_label = excluded.place_label,
  related_tags = excluded.related_tags,
  beginner_priority = excluded.beginner_priority,
  confidence = excluded.confidence,
  review_status = excluded.review_status,
  metadata = excluded.metadata;

update public.anecdotes
set
  publication_status = 'published',
  verification_status = case
    when evidence_level = 'documented' then 'human_verified'::public.verification_status
    when evidence_level in ('disputed', 'fandom-theory') then 'disputed'::public.verification_status
    else 'unverified'::public.verification_status
  end,
  ai_assisted = false,
  source_status = 'partially_sourced'
where id in (
  '30000000-0000-0000-0000-000000000001',
  '30000000-0000-0000-0000-000000000002',
  '30000000-0000-0000-0000-000000000003',
  '30000000-0000-0000-0000-000000000004',
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

insert into public.anecdote_translations (
  anecdote_id,
  locale,
  title,
  hook,
  summary,
  what_happened,
  why_interesting,
  before_section,
  connection_section,
  documented_section,
  interpretation_section,
  quote_text,
  quote_attribution,
  translation_status
) values
  (
    '30000000-0000-0000-0000-000000000001',
    'en',
    'A much better place—Paris',
    'Decades after traveling to Paris with John, Paul unexpectedly named Paris while discussing a journey to a better place.',
    'A small phrase links an early trip, late-life reflection, and a fan interpretation.',
    'Paul named Paris while discussing The End of the End and a journey to a better place.',
    'The moment connects death as another journey, Paris, and John and Paul’s youthful trip.',
    'Before Beatlemania, John and Paul stayed in Paris during John’s twenty-first-birthday trip.',
    'Paul’s reference to Paris may resonate with the 1961 trip, but he did not explicitly make that connection.',
    'Paul named Paris in the interview context.\nJohn and Paul traveled to Paris together in 1961.',
    'Whether Paul consciously meant to evoke John cannot be proved.',
    'It’s basically the start of a journey to France… It’s a much better place, Paris.',
    'Paul McCartney, discussing The End of the End',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000001',
    'zh-CN',
    '巴黎，与更好的地方',
    '多年以后，保罗谈到去往“更好的地方”时提到了巴黎；而巴黎曾是他和约翰早年同行的重要记忆。',
    '一个很小的词，把早年的旅行、晚年的回望，以及歌迷对歌曲和访谈回声的解读连接起来。',
    '保罗在谈《The End of the End》时，把“更好的地方”说成巴黎。',
    '这个瞬间把死亡作为另一段旅程、巴黎、以及约翰和保罗年轻时的巴黎之行联系在一起。',
    'Beatlemania 之前，约翰和保罗曾在巴黎停留。',
    '保罗提到巴黎可能会让人联想到 1961 年的共同旅程，但他没有明确建立这个连接。',
    '保罗在访谈中提到巴黎。\n约翰和保罗在 1961 年一起去过巴黎。',
    '保罗是否有意想到约翰无法证明。',
    '这基本上是去法国旅程的开始……更好的地方，是巴黎。',
    '保罗·麦卡特尼，谈《The End of the End》',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    'en',
    'John meets Paul on July 6, 1957',
    'On July 6, 1957, a local church fête became the origin point of Lennon-McCartney and the Beatles story.',
    'The meeting immediately established the partnership’s central dynamic.',
    'Ivan Vaughan introduced Paul to John after the Quarry Men performed at the Woolton Parish Church fête.',
    'Paul impressed John musically and also threatened his position as leader.',
    'John was leading the Quarry Men, and Paul was not yet part of the group.',
    'The meeting establishes the attraction and competition that would power their songwriting.',
    'John and Paul were introduced at the Woolton fête on July 6, 1957.\nPaul later recalled performing Twenty Flight Rock.',
    'Some performance details vary across later accounts.',
    'I think what impressed him most was that I knew all the words.',
    'Paul McCartney',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    'zh-CN',
    '约翰在 1957 年 7 月 6 日遇见保罗',
    '1957 年 7 月 6 日，一场当地教堂游园会成为 Lennon-McCartney 和披头士故事的起点。',
    '这次相遇立刻呈现出两人关系的核心动力。',
    'Ivan Vaughan 在 Woolton Parish Church 游园会演出后介绍约翰和保罗认识。',
    '保罗在音乐上打动了约翰，也让约翰意识到自己的领导位置可能被挑战。',
    '当时约翰领导 Quarry Men，保罗还不是乐队成员。',
    '这次相遇建立了吸引和竞争并存的关系。',
    '约翰和保罗在 1957 年 7 月 6 日的 Woolton 游园会上被介绍认识。\n保罗后来回忆自己演奏了 Twenty Flight Rock。',
    '一些演出细节在不同叙述里有小差异。',
    '我想最打动他的，是我把歌词都记住了。',
    '保罗·麦卡特尼',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'en',
    'George gets an electric shock during a road trip with Paul',
    'Teenage Paul and George hitchhiked through Britain, and one slow lift left George with a shocking zipper-shaped memory.',
    'A funny travel story becomes a useful example of pre-fame friendship and memory.',
    'Paul and George took teenage hitchhiking trips, including one involving an electric milk float.',
    'The story is funny, but Paul’s retelling turns it into a reflection on friendship.',
    'George and Paul had a friendship before Beatlemania.',
    'The story also shows how personal memories change as they are retold.',
    'Paul and George took teenage hitchhiking trips.\nPaul later gave a detailed account of the electric shock story.',
    'The exact physical details depend on later recollection.',
    'He had a big zip mark on his butt… It brings you together.',
    'Paul McCartney',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'zh-CN',
    '乔治在和保罗旅行时被电了一下',
    '少年保罗和乔治曾搭便车旅行；一次慢悠悠的顺风车，给乔治留下了一个拉链形的触电记忆。',
    '一个好笑的旅行故事，也能说明成名前的友谊和记忆。',
    '保罗和乔治少年时期曾搭便车旅行，其中一次涉及电动送奶车。',
    '故事很好笑，但保罗的讲述把它变成了对友谊的回望。',
    '乔治和保罗在 Beatlemania 之前已经有自己的友谊。',
    '这个故事也显示个人记忆在反复讲述中会变化。',
    '保罗和乔治少年时期曾搭便车旅行。\n保罗后来详细讲述过这次触电故事。',
    '具体物理细节依赖后来的回忆。',
    '他的屁股上有一个很大的拉链印……这会让你们更亲近。',
    '保罗·麦卡特尼',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    'en',
    'John spends his birthday money on Paris with Paul',
    'John received a substantial twenty-first-birthday gift and chose Paul as his traveling companion.',
    'The 1961 Paris trip links personal attachment, pre-fame identity, and the Beatles’ later look.',
    'John and Paul left Liverpool for Paris before John’s twenty-first birthday.',
    'John could have traveled with someone else, but chose Paul for an important personal milestone.',
    'The Beatles were still a Liverpool and Hamburg story.',
    'The trip connects John and Paul’s friendship with the hairstyle influence associated with Jürgen Vollmer.',
    'John and Paul left Liverpool for Paris on 30 September 1961.\nJohn spent his twenty-first birthday in Paris with Paul.',
    'The emotional meaning of the trip remains interpretive.',
    'You got £100 off one of your rich relatives… so we decided we’d go to Spain.',
    'Paul McCartney',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    'zh-CN',
    '约翰把二十一岁生日钱花在和保罗旅行',
    '约翰收到一笔二十一岁生日礼物，然后选择保罗作为同行者。',
    '1961 年巴黎之行连接了个人依恋、成名前身份和披头士后来的造型。',
    '约翰和保罗在约翰二十一岁生日之前离开利物浦前往巴黎。',
    '约翰本可以和别人旅行，却选择保罗作为这个重要节点的同行者。',
    '当时披头士还只是利物浦和汉堡的故事。',
    '这次旅行把两人的友谊与 Jürgen Vollmer 相关的发型影响连接起来。',
    '约翰和保罗在 1961 年 9 月 30 日离开利物浦前往巴黎。\n约翰和保罗一起在巴黎度过他的二十一岁生日。',
    '这次旅行的情感意义仍属于解释。',
    '你从一个有钱亲戚那里拿到 100 英镑……所以我们决定去西班牙。',
    '保罗·麦卡特尼',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    'en',
    'Coming Up helps reignite John’s desire to record',
    'Paul’s odd, energetic 1980 single caught John’s attention and may have helped restart their final creative conversation.',
    'John’s response shows that admiration and rivalry could still travel through records after the Beatles.',
    'Paul released Coming Up in 1980, and John responded positively.',
    'The episode suggests that John and Paul’s creative rivalry continued after the breakup.',
    'John had spent several years away from regular recording.',
    'Paul later understood the song as part of John’s return to recording, though it was not the only cause.',
    'Coming Up was released in 1980.\nJohn called the song a good piece of work.',
    'The degree to which the song motivated John cannot be measured exactly.',
    'It’s a good piece of work.',
    'John Lennon on Coming Up, 1980',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    'zh-CN',
    '《Coming Up》重新点燃约翰录音的欲望',
    '保罗 1980 年那首奇异又有活力的单曲吸引了约翰，像是重启了他们最后的创作对话。',
    '约翰的反应说明，披头士之后欣赏和竞争仍然能通过唱片传到对方那里。',
    '保罗在 1980 年发行《Coming Up》，约翰对此作出积极回应。',
    '这说明披头士解散后，两人的创作竞争仍然存在。',
    '约翰此前已有几年没有规律录音。',
    '保罗后来把这首歌理解为约翰回归录音的一部分，但它不是唯一原因。',
    '《Coming Up》发行于 1980 年。\n约翰称这首歌是好作品。',
    '这首歌对约翰的激励程度无法精确衡量。',
    '这是一件好作品。',
    '约翰·列侬谈《Coming Up》，1980 年',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000005',
    'en',
    'A blue light appears while Paul talks about John',
    'During Anthology-era footage, Paul reportedly turned a strange blue light into a joke about John’s presence.',
    'The moment belongs as symbolism rather than supernatural evidence.',
    'A blue flash appears in circulating Anthology-era footage while Paul is speaking about John.',
    'Paul’s reaction shows how John can re-enter the room through humor and memory.',
    'The footage belongs to the later period when Paul was publicly revisiting the Beatles story.',
    'This fits Paul’s broader pattern of describing John as an internal voice.',
    'A blue light appears in circulating footage.\nPaul is reported to have identified it as John.',
    'The exact interview, date, complete wording, and official release status still need source work.',
    'That was John.',
    'Paul McCartney, reportedly reacting to the blue light',
    'human_translated'
  ),
  (
    '30000000-0000-0000-0000-000000000005',
    'zh-CN',
    '保罗谈约翰时出现一道蓝光',
    '在 Anthology 时期的影像中，保罗据说把一道奇怪的蓝光玩笑式地认作约翰的出现。',
    '这个瞬间应被当作象征，而不是超自然证据。',
    '在流传的 Anthology 时期影像中，保罗谈到约翰时出现一道蓝色闪光。',
    '保罗的反应说明约翰如何通过幽默和记忆重新进入房间。',
    '这属于保罗后来公开回望披头士故事的时期。',
    '它符合保罗常把约翰描述为内在声音的模式。',
    '流传影像中出现了一道蓝光。\n保罗据称把它认作约翰。',
    '具体访谈、日期、完整措辞和官方发布状态仍需进一步考证。',
    '那是约翰。',
    '保罗·麦卡特尼，据称回应蓝光时所说',
    'human_translated'
  )
on conflict (anecdote_id, locale) do update set
  title = excluded.title,
  hook = excluded.hook,
  summary = excluded.summary,
  what_happened = excluded.what_happened,
  why_interesting = excluded.why_interesting,
  before_section = excluded.before_section,
  connection_section = excluded.connection_section,
  documented_section = excluded.documented_section,
  interpretation_section = excluded.interpretation_section,
  quote_text = excluded.quote_text,
  quote_attribution = excluded.quote_attribution,
  translation_status = excluded.translation_status;

insert into public.claims (
  id,
  anecdote_id,
  claim_type,
  claim_text,
  confidence,
  review_status
) values
  (
    '40000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    'fact',
    'John and Paul traveled to Paris together in 1961.',
    0.900,
    'approved'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000002',
    'recollection',
    'Paul and George took teenage hitchhiking trips.',
    0.750,
    'approved'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000004',
    'fact',
    'John praised Coming Up in 1980.',
    0.800,
    'approved'
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    '30000000-0000-0000-0000-000000000005',
    'theory',
    'The blue light moment should be treated as symbolism rather than supernatural evidence.',
    0.350,
    'approved'
  ),
  (
    '40000000-0000-0000-0000-000000000005',
    '30000000-0000-0000-0000-000000000006',
    'fact',
    'John and Paul were introduced at the Woolton fête on July 6, 1957.',
    0.950,
    'approved'
  )
on conflict (id) do update set
  anecdote_id = excluded.anecdote_id,
  claim_type = excluded.claim_type,
  claim_text = excluded.claim_text,
  confidence = excluded.confidence,
  review_status = excluded.review_status;

insert into public.claim_sources (
  claim_id,
  source_id,
  source_excerpt,
  support_type
) values
  ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', null, 'supports'),
  ('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', null, 'supports'),
  ('40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', null, 'supports'),
  ('40000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000005', 'Original production source still needs verification.', 'context'),
  ('40000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000004', null, 'supports')
on conflict (claim_id, source_id, support_type) do update set
  source_excerpt = excluded.source_excerpt;
