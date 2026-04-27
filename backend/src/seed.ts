import { db } from "./db";
import { topic, questions, passage, choice } from "./schema";

async function seed() {
  // Topics
  const [rhetoricalAnalysisTopic] = await db
    .insert(topic)
    .values({ name: "Rhetorical Analysis" })
    .returning();

  const [argumentTopic] = await db
    .insert(topic)
    .values({ name: "Argument" })
    .returning();

  // Passage 1
  const [passage1] = await db
    .insert(passage)
    .values({
      topic_id: rhetoricalAnalysisTopic.topic_id,
      title: "On the Quiet Work of Libraries",
      source:
        "Original, written in the style of an early 20th-century American essay",
      body: `(1) There is a particular kind of silence that belongs only to libraries, and anyone who has spent an afternoon among the stacks knows it at once. (2) It is not the silence of an empty room, which feels merely vacant, nor the silence of a church, which feels observed. (3) It is, rather, the silence of attention — the sound, if one may call it that, of many minds at work on different problems in the same room.
(4) I have often thought that the library is the most democratic of our institutions, and also the most misunderstood. (5) We praise it in speeches and starve it in budgets. (6) We call it essential and treat it as ornamental. (7) A city will spend millions on a stadium that sits empty six days a week, and quibble for months over the cost of keeping a branch library open on Sundays — the one day, it might be noted, when the working person is most likely to have an hour to spare.
(8) The library asks nothing of you. (9) It does not demand that you believe anything, buy anything, or be anything in particular. (10) It simply opens its doors and waits. (11) In an age when every screen we own is engineered to capture our attention and sell it to the highest bidder, there is something almost radical about a room full of books that wants nothing from you but your curiosity.`,
    })
    .returning();

  // Passage 2
  const [passage2] = await db
    .insert(passage)
    .values({
      topic_id: argumentTopic.topic_id,
      title: "The Case Against the Productivity Hack",
      source: "Original, written in the style of a contemporary opinion essay",
      body: `(1) The productivity industry has a problem, and the problem is that it works — but only for the wrong thing. (2) It is extraordinarily good at making us feel productive. (3) It is considerably worse at helping us do anything that matters.
(4) Walk into any bookstore and you will find a shelf, often several shelves, devoted to the optimization of the self. (5) Read these books, download these apps, color-code this calendar, and you too can extract 14 usable hours from a 24-hour day. (6) The promise is seductive, and the evidence, at first, seems to support it: people who adopt these systems do report getting more done. (7) What they rarely report is whether any of it was worth doing.
(8) This is the quiet sleight of hand at the heart of the genre. (9) Productivity, as the books define it, is a measure of output per unit time. (10) It is silent on the question of whether the output is any good, or whether it needed to exist at all. (11) A person who answers two hundred emails in an hour is, by this definition, four times as productive as a person who answers fifty — even if one hundred and ninety of those emails should never have been sent in the first place.
(12) The deeper trouble is that the habits these systems cultivate are not neutral. (13) Someone who has trained themselves to measure every hour by what it produced will find it difficult, over time, to sit with an hour that produced nothing. (14) And some of the most important hours of a human life — the ones spent thinking, or grieving, or simply paying attention to another person — are precisely the ones that produce nothing at all.`,
    })
    .returning();

  // Questions & Choices — Passage 1
  const p1questions = [
    {
      prompt: `The primary rhetorical function of the contrasts in sentences 5 and 6 ("We praise it... ornamental") is to`,
      order_in_set: 1,
      difficulty: "medium",
      choices: [
        {
          text: "establish the writer's credibility as a longtime library patron",
          is_correct: false,
        },
        {
          text: "highlight an inconsistency between public rhetoric and public action",
          is_correct: true,
        },
        {
          text: "concede a point that the writer will later refute",
          is_correct: false,
        },
        {
          text: "introduce statistical evidence about library funding",
          is_correct: false,
        },
        {
          text: "appeal to the reader's sense of nostalgia",
          is_correct: false,
        },
      ],
    },
    {
      prompt:
        "The comparison in sentence 7 (the stadium and the branch library) primarily serves to",
      order_in_set: 2,
      difficulty: "medium",
      choices: [
        {
          text: "suggest that sports are less culturally valuable than reading",
          is_correct: false,
        },
        {
          text: "expose a misalignment between civic spending and civic need",
          is_correct: true,
        },
        {
          text: "argue that libraries should be open every day of the week",
          is_correct: false,
        },
        {
          text: "provide a personal anecdote supporting the thesis",
          is_correct: false,
        },
        {
          text: "shift the essay's focus from libraries to urban planning",
          is_correct: false,
        },
      ],
    },
    {
      prompt: `In the context of the passage as a whole, the three short sentences in lines 8–10 ("The library asks nothing... waits") function primarily to`,
      order_in_set: 3,
      difficulty: "hard",
      choices: [
        {
          text: "signal a transition from description to narration",
          is_correct: false,
        },
        {
          text: "undercut the argument developed in the preceding paragraph",
          is_correct: false,
        },
        {
          text: "slow the pace and give weight to an idealized characterization of the library",
          is_correct: true,
        },
        {
          text: "introduce a counterargument the writer will address",
          is_correct: false,
        },
        {
          text: "establish an ironic distance from the subject",
          is_correct: false,
        },
      ],
    },
    {
      prompt:
        "The writer's characterization of the silence in the opening paragraph (sentences 1–3) is best described as",
      order_in_set: 4,
      difficulty: "medium",
      choices: [
        { text: "nostalgic and mournful", is_correct: false },
        { text: "precise and distinguishing", is_correct: true },
        { text: "ironic and detached", is_correct: false },
        { text: "reverent and religious", is_correct: false },
        { text: "anxious and conflicted", is_correct: false },
      ],
    },
    {
      prompt: `The word "radical" in sentence 11 derives its rhetorical force primarily from`,
      order_in_set: 5,
      difficulty: "hard",
      choices: [
        {
          text: "its political connotations, which align libraries with activist causes",
          is_correct: false,
        },
        {
          text: "its contrast with the passivity the library is said to embody earlier in the paragraph",
          is_correct: true,
        },
        {
          text: "its echo of language used by library advocates in public debate",
          is_correct: false,
        },
        {
          text: "its suggestion that libraries are under threat of closure",
          is_correct: false,
        },
        {
          text: "its implication that curiosity itself has become countercultural",
          is_correct: false,
        },
      ],
    },
  ];

  // Questions & Choices — Passage 2
  const p2questions = [
    {
      prompt:
        "The writer's central claim is best described as the argument that",
      order_in_set: 1,
      difficulty: "medium",
      choices: [
        {
          text: "productivity systems fail because most people lack the discipline to follow them",
          is_correct: false,
        },
        {
          text: "productivity systems succeed at their stated aim but at a cost their users rarely examine",
          is_correct: true,
        },
        {
          text: "productivity systems are a recent invention that has not yet been properly studied",
          is_correct: false,
        },
        {
          text: "productivity systems are useful in professional contexts but harmful in personal ones",
          is_correct: false,
        },
        {
          text: "productivity systems should be replaced by more rigorous scientific methods",
          is_correct: false,
        },
      ],
    },
    {
      prompt: `The phrase "the quiet sleight of hand" in sentence 8 characterizes the productivity genre as`,
      order_in_set: 2,
      difficulty: "hard",
      choices: [
        {
          text: "deliberately fraudulent in its financial claims",
          is_correct: false,
        },
        { text: "quietly persuasive through elegant prose", is_correct: false },
        {
          text: "subtly deceptive by shifting the definition of a key term",
          is_correct: true,
        },
        {
          text: "openly contradictory in its practical advice",
          is_correct: false,
        },
        {
          text: "excessively reliant on anecdotal evidence",
          is_correct: false,
        },
      ],
    },
    {
      prompt: "The email example in sentence 11 functions primarily as",
      order_in_set: 3,
      difficulty: "medium",
      choices: [
        {
          text: "an appeal to the reader's personal frustrations with technology",
          is_correct: false,
        },
        {
          text: "a concrete illustration that exposes a flaw in the genre's definition of productivity",
          is_correct: true,
        },
        {
          text: "a digression that weakens the paragraph's central argument",
          is_correct: false,
        },
        {
          text: "a concession that productivity systems can sometimes be helpful",
          is_correct: false,
        },
        {
          text: "a transition to a new argument about workplace communication",
          is_correct: false,
        },
      ],
    },
    {
      prompt:
        "The rhetorical strategy of the final paragraph (sentences 12–14) is best described as",
      order_in_set: 4,
      difficulty: "hard",
      choices: [
        {
          text: "a refutation of a counterargument introduced earlier",
          is_correct: false,
        },
        {
          text: "a shift from critique of a system to concern about its effect on character",
          is_correct: true,
        },
        {
          text: "a return to the personal anecdote that opened the essay",
          is_correct: false,
        },
        {
          text: "a qualification that softens the writer's earlier claims",
          is_correct: false,
        },
        {
          text: "a call to action directed at a specific audience",
          is_correct: false,
        },
      ],
    },
    {
      prompt:
        "The writer relies most heavily on which of the following to advance the argument?",
      order_in_set: 5,
      difficulty: "hard",
      choices: [
        {
          text: "Statistical data from studies of workplace efficiency",
          is_correct: false,
        },
        {
          text: "Appeals to recognized authorities in psychology and management",
          is_correct: false,
        },
        {
          text: "Careful redefinition of a term the audience is assumed to accept uncritically",
          is_correct: true,
        },
        {
          text: "Extended personal narrative drawn from the writer's own experience",
          is_correct: false,
        },
        {
          text: "Direct address to readers who already share the writer's skepticism",
          is_correct: false,
        },
      ],
    },
  ];

  for (const q of p1questions) {
    const [inserted] = await db
      .insert(questions)
      .values({
        topic_id: rhetoricalAnalysisTopic.topic_id,
        passage_id: passage1.passage_id,
        prompt: q.prompt,
        order_in_set: q.order_in_set,
        difficulty: q.difficulty,
      })
      .returning();

    await db
      .insert(choice)
      .values(
        q.choices.map((c) => ({ question_id: inserted.question_id, ...c })),
      );
  }

  for (const q of p2questions) {
    const [inserted] = await db
      .insert(questions)
      .values({
        topic_id: argumentTopic.topic_id,
        passage_id: passage2.passage_id,
        prompt: q.prompt,
        order_in_set: q.order_in_set,
        difficulty: q.difficulty,
      })
      .returning();

    await db
      .insert(choice)
      .values(
        q.choices.map((c) => ({ question_id: inserted.question_id, ...c })),
      );
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
