// Each page: { heading, text } or { heading, type: 'rubric', rows: [...] }
// In text: use \n\n for paragraph breaks, **word** for bold.
// Bold is stripped during streaming and applied when done.

export const GUIDE_CONTENT = {

  // ── SYNTHESIS ──────────────────────────────────────────────────────────────
  synthesis: [
    {
      heading: "what is synthesis?",
      text: "The synthesis essay (Q1) gives you 6–7 sources on a single topic and asks you to argue your own position using at least three of them. The sources do real work in your essay — they're not just decoration, they're not just proof. They're voices you put in conversation with each other to build something none of them could prove alone.\n\nHere is how synthesis is different from the other two essays.\n\n**Synthesis (Q1):** Build YOUR argument using at least 3 of the provided sources. The sources are your evidence.\n\n**RA (Q2):** Analyze how an author makes THEIR argument. Evidence comes only from the passage.\n\n**Argument (Q3):** Make YOUR own argument. Evidence comes from your own knowledge and experience.",
    },
    {
      heading: "the most important move",
      text: "The single most important distinction in synthesis is between sources taking turns and sources in conversation.\n\n**Sources taking turns is NOT synthesis:** each source gets its own paragraph or sentence, they're introduced one at a time, and they never talk to each other. The result reads like a list of who said what, and it caps you at Row B 1–2.\n\n**Sources in conversation IS synthesis:** sources are put in dialogue with each other within the same paragraph. You show what Source A and Source B together say that neither says alone, and how Source C complicates that. This reads like a thinker building an argument with help, and it is required for Row B 3–4.\n\n**The question to ask before every paragraph:** what do these sources together say that neither says alone?",
    },
    {
      heading: "synthesis verbs",
      text: "These verbs are not just vocabulary. They are thinking moves. Choosing the right verb forces you to clarify what relationship you're claiming between sources.\n\n**Agreement verbs** — affirms, exemplifies, extends, builds on — let you stack sources together. 'Source B and Source F together extend Source A's claim about scarcity by...'\n\n**Disagreement verbs** — refutes, critiques, undermines, subverts — let you set sources against each other. 'Source D undermines Source B's optimism by showing...'\n\n**Complexity verbs** — qualifies, contrasts, redefines, complicates — do the most sophisticated work. 'Source D does not refute Source B; it qualifies B's claim by adding the condition that...'\n\n**The verb test:** if you can replace your verb with 'says' or 'states' without losing meaning, your verb is too weak.",
    },
    {
      heading: "reading with BEAM",
      text: "Synthesis gives you 15 minutes of reading time before you start writing. Use it. Most students read passively — noting what each source says. High-scoring students read for function — noting how each source could work in their argument.\n\nPassive reading produces a list: 'Source A says X. Source B says Y.' Active BEAM reading produces roles: 'Source A could give me background. Source B could be my exhibit.' You walk into the essay with sources already cast.\n\n**B — Background:** sources that establish facts, definitions, or context.\n\n**E — Exhibit:** concrete examples you can analyze or interpret.\n\n**A — Argument:** sources that take positions you can engage or push back on.\n\n**M — Method:** sources that provide a framework that shapes your analysis.\n\nThree diagnostic questions for any source: who is this writer and what's their stake? What kind of evidence does this source provide? Where would it be most useful in my argument?",
    },
    {
      heading: "how to use BEAM",
      text: "Most sources can serve multiple BEAM functions. The same source might give you background in your first body paragraph and become an exhibit in your second. Cast sources into BEAM roles before you write, not during.\n\nIn the 15-minute reading period, mark B, E, A, or M next to each source. Aim for variety — an essay that uses three Argument sources makes three claims and engages none of them. An essay that mixes Background, Exhibit, and Argument puts sources in different roles, which is what makes conversation possible.\n\nIf you can't generate a BEAM function for a source, that's information. The source might not belong in your essay.",
    },
    {
      heading: "thesis levels",
      text: "Same prompt, three versions of the thesis — vertical farming as the example. Use the level you can confidently sustain. A clean Level 1 with strong commentary scores higher than a tangled Level 3 you cannot back up.\n\n**Level 1 — Basic, earns Row A:** 'Vertical farms are an impractical solution to global food insecurity, because their high costs and energy consumption outweigh their benefits.' Clear, defensible, names two reasons. Most students can write this under time pressure.\n\n**Level 2 — Developed, sets up Row B 3–4:** 'Although vertical farms offer real solutions to land scarcity, their cost and energy demands prevent them from serving the populations they claim to address, because the same scale that produces efficiency also produces externalities the smaller version did not.' This concedes, qualifies, and names the mechanism.\n\n**Level 3 — Sophisticated, primes Row C:** 'The question vertical farming forces is not whether it works, but which scarcity it addresses — the limited arable land that constrains traditional agriculture, or the limited carbon budget that constrains industrial energy use.' This reframes the prompt itself. Only attempt this if you can sustain the complexity across every paragraph.",
    },
    {
      heading: "the synthesis move",
      text: "Row B is where the score is won or lost. Most students lose points because they let sources take turns instead of putting them in dialogue. The body paragraph: topic sentence naming the claim; sources embedded in conversation within the same passage; commentary explaining what the sources together reveal; concluding sentence tying back to your thesis.\n\n**The Synthesis Move:** [Source A] and [Source B] together reveal [insight neither makes alone] because [mechanism]. [Source C] complicates this by [twist].\n\n**Weak (Row B 1–2):** 'Source B affirms vertical farming's space efficiency. Source D undermines this by showing the energy costs are high. This shows that vertical farming is complicated.' Sources take turns. Commentary just restates that the sources disagree.\n\n**Strong (Row B 3–4):** 'Source B and Source F together establish that vertical farming addresses real and growing scarcity — arable land disappearing under urbanization. Source D complicates this not by denying the space efficiency, but by revealing that the solution introduces a different scarcity: the carbon budget needed to power the lights. The tension reveals that vertical farming does not eliminate scarcity, it relocates it.'",
    },
    {
      heading: "counterargument",
      text: "Counterargument is the most misunderstood move in synthesis. Done well, it's a path to Row C. Done poorly, it actively hurts your Row B score by suggesting your argument has a hole you couldn't fill.\n\nDon't acknowledge and dismiss — raising the counterargument and immediately waving it off with a flat assertion. Don't define your way out — 'for the sake of this essay, I'm only counting the cases where vertical farms work.' Readers see this immediately.\n\n**How to refute well:**\n\nSteel-man it — state the strongest version of the opposing view, not a strawman. Concede what's actually true — the other side has a real point, name it. Identify the limit — where does the opposing view break down? Use that limit to sharpen your claim. The reader should feel your argument got sharper from the engagement.",
    },
    {
      heading: "score yourself",
      text: "AP Lang Q1 is scored on three rows for a total of 6 points. How the scores actually break down:\n\n**1-1-0 (2/6):** a thesis exists but mostly summarizes sources, and only two sources are used.\n\n**1-2-0 (3/6):** three sources used, but they take turns rather than enter conversation.\n\n**1-3-0 (4/6):** three sources, line of reasoning mostly clear, sources sometimes in conversation but not consistently.\n\n**1-4-0 (5/6):** three or more sources in genuine conversation, commentary consistently shows what sources together reveal.\n\n**1-4-1 (6/6):** all of the above plus sustained complexity — woven through the essay, not just gestured at.",
    },
    {
      heading: "6-point rubric",
      type: "rubric",
      rows: [
        { row: "Row A: Thesis", points: "0–1", asks: "Make a defensible claim that takes a position responding to the prompt.", earns: "Defensible position + goes beyond restating the prompt or summarizing sources. Most students earn this." },
        { row: "Row B: Evidence and Commentary", points: "0–4", asks: "Use at least three sources in conversation and consistently explain how they support your line of reasoning.", earns: "4: 3+ sources in genuine conversation, commentary shows what they together reveal. 3: Line of reasoning present but sources don't fully talk to each other. 2: Parallel source use. 1: Sources general or only 2 used." },
        { row: "Row C: Sophistication", points: "0–1", asks: "Do something genuinely complex with the prompt or the source material.", earns: "Broader context, tensions/conditions, weaponized counterargument, OR consistently vivid persuasive style. Most students don't earn this." },
      ],
    },
    {
      heading: "common mistakes",
      text: "Six patterns consistently keep students at a 3 or below.\n\n**One: sources taking turns instead of in conversation.** Each source gets its own sentence or paragraph. Fix: put two or three sources in the same passage and explain what they together reveal.\n\n**Two: commentary that restates.** 'This is significant because' introduces paraphrase, not analysis. Fix: ask what would be lost if this source pairing weren't there — that answer is your commentary.\n\n**Three: acknowledge-and-dismiss counterargument.** A half-engaged counterargument hurts Row B more than no counterargument at all. Fix: either genuinely refute it or cut it.\n\n**Four: overgeneralization.** Claims broader than the sources support. Fix: scope your claims — 'in contexts where...' or 'for populations that...'\n\n**Five: personal observation that just sits there.** Fix: tie it directly to a source, or cut it.\n\n**Six: thesis that lists rather than argues.** Fix: pick two reasons that depend on each other — show how reason 1 sets up reason 2.",
    },
  ],

  // ── RHETORICAL ANALYSIS ────────────────────────────────────────────────────
  rhetorical: [
    {
      heading: "what is rhetorical analysis?",
      text: "RA is not about what a text says. It's about what the writer is doing, why they made the choices they made, and what those choices accomplish for their audience. Every AP Lang Q2 prompt asks the same thing: analyze the rhetorical choices the speaker makes to achieve their purpose.\n\n**Summary answers:** what did the speaker say? It restates content. 'Malala says education is important.'\n\n**Rhetorical analysis answers:** what is the speaker doing, and why does it work? It analyzes choices. 'By opening with her own near-death experience, Malala transforms an abstract policy debate into a personal imperative.'\n\nThat distinction is the whole essay.",
    },
    {
      heading: "SPACECAT(M)",
      text: "Before you analyze a single choice, you have to know who is speaking, to whom, why, and under what circumstances. A misread rhetorical situation is the single biggest reason commentary falls apart later.\n\n**Speaker** — who is speaking, and what makes them the right or unexpected person for this message?\n\n**Purpose** — what does the speaker want the audience to do, think, or feel? NOT the same as message.\n\n**Audience** — start with the explicit audience, then ask who else will this reach. Layers matter.\n\n**Context** — only the world or speaker details that matter to this specific text.\n\n**Exigence** — the spark, the specific event that makes this text necessary NOW, not just the surrounding conditions.\n\n**Choices** — what writing strategies does the author use? Naming a choice isn't analysis — explain what it DOES.\n\n**Appeals** — ethos (credibility), pathos (emotion), logos (logic). Explain how each works on this specific audience.\n\n**Tone** — the speaker's attitude, created by word choice and syntax. Rarely just one thing — look for shifts.\n\n**Message** — the central argument or claim, distinct from purpose.",
    },
    {
      heading: "obstacles and leverage",
      text: "After you map SPACECAT(M), ask two more questions. These are the hinge between identifying choices and analyzing them. Every body paragraph should answer one of them.\n\n**Obstacles — where might this audience resist?**\n\nDoes the audience have a reason to distrust the speaker's credibility or identity? Does the audience have prior commitments that conflict with the speaker's purpose? Does the speaker face a structural disadvantage — age, status, outsider position?\n\n**Leverage — what advantages does the speaker have?**\n\nShared values, beliefs, or experience with the audience. Established credibility or moral authority on the topic. Timing — does a current event create unique receptivity? A privileged position to speak as an eyewitness, insider, victim, or expert.\n\nObstacles and leverage are where commentary lives. Every body paragraph should answer: how does this choice address an obstacle, or use the speaker's leverage?",
    },
    {
      heading: "reading the text rhetorically",
      text: "Don't just read for content. Read for choices. Three moves to use.\n\n**First:** generate a WHAT question before you read. Turn the prompt into a guiding question — 'What is Malala doing in this speech to convince UN delegates to act on girls' education?' Read with that question active.\n\n**Second:** chunk the text by function. Divide sections based on what each part DOES, not what it says. Look for shifts in the writer's strategy — establishes credibility, reframes the problem, calls to action.\n\n**Third:** use analytical verbs, not summary verbs.\n\n**Summary verbs to avoid:** says, shows, tells, writes, talks about, mentions.\n\n**Analytical verbs to reach for:** establishes, undermines, reframes, complicates, destabilizes, reassures, concedes, deflects, foregrounds, indicts, vindicates, positions, recasts.",
    },
    {
      heading: "thesis levels",
      text: "Same passage, three versions of the thesis — Malala's 2013 UN speech as the example. Use the level you can confidently sustain.\n\n**Level 1 — Basic, earns Row A:** 'In her 2013 UN speech, Malala Yousafzai uses personal narrative, anaphora, and antithesis to convince UN delegates to act on girls' education.' Names specific rhetorical choices and connects them to a clear purpose. Most students can write this under time pressure.\n\n**Level 2 — Developed, sets up Row B 3–4:** 'Speaking at the UN nine months after being shot for attending school, Malala Yousafzai uses personal narrative, anaphora, and antithesis to convince delegates that girls' education is a moral imperative, not a policy preference. To do this, she must overcome delegates' tendency to treat education as one issue among many.' Adds the obstacle and makes the thesis do analytical work.\n\n**Level 3 — Sophisticated, primes Row C:** adds that Malala must also resist the audience's instinct to reduce her to a victim, and names her leverage as a survivor transforming vulnerability into moral power. Only attempt this if you can sustain it across every paragraph.",
    },
    {
      heading: "the commentary loop",
      text: "Most students lose Row B points not because they can't write, but because their commentary stops at identification. The body paragraph: topic sentence naming the chunk's function; a short, specific quote from the passage; close the loop; concluding sentence tying back to the writer's purpose.\n\n**The Commentary Loop:** this choice DOES [X] for this AUDIENCE because of [Y obstacle].\n\n**Weak (Row B 1–2):** 'Malala uses an emotional tone to convey her passionate beliefs about education. This shows her dedication and helps support her argument.' Names 'emotional tone' and stops. Doesn't explain what it does for the specific audience.\n\n**Strong (Row B 3–4):** 'By grounding her call in her own near-death experience, Malala transforms an abstract policy debate into a personal imperative, shifting the frame from political strategy to moral urgency for partisan delegates who might otherwise treat girls' education as one issue among many.' Names the choice, explains what it does, identifies the audience, names the obstacle, shows how the choice overcomes it.",
    },
    {
      heading: "score yourself",
      text: "AP Lang Q2 is scored on three rows for a total of 6 points. How the scores actually break down:\n\n**1-1-0 (2/6):** a thesis exists but commentary is mostly restatement.\n\n**1-2-0 (3/6):** some explanation of how a choice works, but not consistent.\n\n**1-3-0 (4/6):** at least one choice is fully explained and the line of reasoning is mostly clear.\n\n**1-4-0 (5/6):** multiple choices explained, line of reasoning consistent throughout.\n\n**1-4-1 (6/6):** all of the above plus genuine complexity — tension, audience layering, or situated significance — woven through, not just gestured at.",
    },
    {
      heading: "6-point rubric",
      type: "rubric",
      rows: [
        { row: "Row A: Thesis", points: "0–1", asks: "Make a defensible claim about how the writer's rhetorical choices contribute to their purpose.", earns: "Names specific choices + connects to purpose. NOT just a restatement of the prompt. Most students earn this point." },
        { row: "Row B: Evidence and Commentary", points: "0–4", asks: "Use specific evidence from the text and consistently explain how the writer's choices contribute to their purpose.", earns: "4: Multiple choices, consistently closes the loop. 3: At least one choice fully explained. 2: Some commentary but mostly restatement. 1: Just summary or evidence with no analysis." },
        { row: "Row C: Sophistication", points: "0–1", asks: "Do something genuinely complex with the text.", earns: "Significance of choices given the rhetorical situation, exploring tensions/complexities, OR consistently vivid and persuasive style. Most students don't earn this." },
      ],
    },
    {
      heading: "common mistakes",
      text: "Six patterns consistently keep students at a 3 or below.\n\n**One: naming the device and stopping.** 'The author uses tone to project a more motivated feeling.' That sentence does no actual work. Fix: after you name the device, explain what it DOES for the audience.\n\n**Two: restating evidence instead of analyzing it.** 'This illustrates that...' followed by a paraphrase of the quote. Fix: skip the paraphrase — go straight to function and effect.\n\n**Three: formulaic structure that skips the work.** Naming a device, dropping a quote, saying it 'helps the claim' without explaining how. Fix: every paragraph must answer the Commentary Loop question.\n\n**Four: losing the rhetorical situation in body paragraphs.** You correctly identified obstacles in SPACECAT, then forgot about them in the body. Fix: in every body paragraph, name the specific audience and the specific obstacle the choice addresses.\n\n**Five: misreading the rhetorical situation.** Misidentifying the audience or occasion makes the rest of the analysis weaker, even if the writing is fine. Fix: spend the time on SPACECAT(M) — it's the foundation of everything else.\n\n**Six: the off-the-rails final paragraph.** Sweeping generalizations, personal anecdotes, speculation about what would happen if everyone followed the speaker's advice. Fix: stay in the room with the speaker and audience until the very last sentence.",
    },
  ],

  // ── ARGUMENTATIVE ──────────────────────────────────────────────────────────
  argumentative: [
    {
      heading: "what is the argument essay?",
      text: "The argument essay (Q3) gives you a claim from a writer, thinker, or public figure and asks you to argue your own position on it. Unlike rhetorical analysis, you're not analyzing somebody else's writing. You're making your own case using your own evidence.\n\nThe phrase 'the extent to which' is doing real work in every Q3 prompt. The strongest essays do not flat agree or flat disagree. They qualify — valid in some contexts but not others, valid except for one important condition.\n\n**Restating is not argument.** Restating answers: what does the prompt say? 'Schumacher argues that smallness requires courage.' Argument answers: what is your position on the claim, and how do you prove it? 'Schumacher's claim is largely valid in industries where scale produces hidden externalities, but it fails in domains where scale itself produces public good.'",
    },
    {
      heading: "surface and underneath",
      text: "Every Q3 prompt has two layers: the surface — what the writer literally said — and the underneath — the argumentative question the surface is actually asking you to answer. Most low-scoring essays argue against the surface. High-scoring essays answer the underneath.\n\n**The surface (don't stop here):** Schumacher says smallness takes courage. Surface response: agree or disagree with whether smallness requires courage. This will get you a thesis but not much more.\n\n**The underneath (this is the real prompt):** is prioritizing smallness, simplicity, or restraint valuable in our current world? Under what conditions does smallness produce better outcomes? When does it fail?\n\nThree diagnostic questions for any prompt: what is the surface claim? What is the underlying question the prompt is forcing you to answer? Where does it want me to qualify — what's the case where the surface claim doesn't hold?",
    },
    {
      heading: "brainstorm with PEEPS",
      text: "The biggest reason students score a 2 in Row B is that their evidence bank is too narrow. PEEPS forces you to brainstorm across five different frames so you walk into your essay with options. Spend 3–5 minutes filling in each frame with specific evidence you actually have. Then pick the two strongest.\n\n**P — Psychological:** what does this claim suggest about how the human mind works?\n\n**E — Economic:** are there market forces, costs, or financial incentives at play?\n\n**E — Ethical:** what moral or values-based dimension is at play?\n\n**P — Pragmatic:** what are the practical, real-world consequences?\n\n**S — Sociological:** what does this claim reveal about groups, institutions, or social patterns?\n\nTwo specific, fully developed examples beat four name-dropped ones every time.",
    },
    {
      heading: "evidence quality",
      text: "Not all evidence is equal. The same paragraph can score a 2 or a 4 depending entirely on what you put in the evidence slot. The single biggest predictor of Row B scores is whether your evidence is specific enough to do real argumentative work.\n\n**High-leverage evidence:** named historical events, figures, dates, places — 'Fannie Lou Hamer's 1964 testimony before the DNC credentials committee.' Documented social or political phenomena with specifics — 'the 2008 collapse of regional newspapers in the U.S.' Verifiable data with attribution — 'a 2023 Pew study found that 71% of teens...'\n\n**Low-leverage evidence:** personal anecdote alone ('my friend once...'), vague generalizations ('many people believe,' 'studies show' without specifics), hypothetical scenarios without grounding, made-up sources or invented statistics.\n\n**The specificity test:** could a reader who has never met you verify this with a quick search? If yes, it's high-leverage. If no, it needs to be paired with something verifiable.",
    },
    {
      heading: "thesis levels",
      text: "Same prompt (Schumacher), three versions of the thesis. Use the level you can confidently sustain.\n\n**Level 1 — Basic, earns Row A:** 'Schumacher is correct that prioritizing smallness over growth produces better outcomes, because smaller systems are more accountable and more sustainable.' Clear, defensible, names two reasons. Most students can write this under time pressure.\n\n**Level 2 — Developed, sets up Row B 3–4:** 'Although Schumacher overstates the universal value of smallness, his core claim holds in domains where scale produces hidden externalities the smaller version did not, because the costs of bigness are typically displaced onto people, ecosystems, or futures that cannot bargain back.' Concedes, qualifies, and names the mechanism.\n\n**Level 3 — Sophisticated, primes Row C:** 'Schumacher's claim is most useful not as a verdict on smallness vs. growth, but as a diagnostic — it asks us to name what scale is hiding. In domains where bigness externalizes its costs onto bystanders, Schumacher is right. But in domains where scale itself produces public goods — vaccines, basic research, infrastructure — the same instinct toward smallness becomes a refusal to share.' Only attempt this if you can sustain it across every paragraph.",
    },
    {
      heading: "the HOW Loop",
      text: "Row B is where the score is won or lost. Most students lose points because their commentary stops at restatement. The body paragraph: topic sentence naming the claim; specific, named, verifiable evidence — not 'a civil rights leader' but 'Fannie Lou Hamer's 1964 DNC testimony'; close the HOW Loop; concluding sentence tying back to your thesis.\n\n**The HOW Loop:** this evidence proves [claim] because [mechanism], which matters because [stakes].\n\n**Weak (Row B 1–2):** 'The Ozempic example shows that bigger isn't always better. Schumacher would agree this proves his point about scale being harmful.' Names the example, restates the thesis, explains nothing.\n\n**Strong (Row B 3–4):** 'Ozempic's mass production of semaglutide proves Schumacher's claim because the scale itself created a problem the smaller version never had — amphibians downstream of pharmaceutical wastewater experience insulin spikes that disrupt their metabolism. This matters because it reveals scale as a hidden cost mechanism: the harm did not exist at small scale and was generated by the act of scaling itself.'",
    },
    {
      heading: "counterargument + sophistication",
      text: "Counterargument done well is a path to Row C. Done poorly, it actively hurts your Row B score. Don't concede and drop. **How to refute well:** steel-man it, concede what's actually true, identify the limit, use the limit to sharpen your claim.\n\n**Four paths to Row C:**\n\n**First — distinguish kinds:** show the prompt's key term contains multiple meanings and your argument depends on which one. 'Schumacher's claim holds for extractive growth but not generative growth.'\n\n**Second — name conditions:** identify when the claim works and when it doesn't, and sustain that distinction across the essay.\n\n**Third — synthesize across examples:** use your examples to build toward a unified insight that none of them could prove alone.\n\n**Fourth — weaponize the counterargument:** take the strongest version of the opposing view and use it to sharpen your own claim. The reader should finish your essay thinking your argument got sharper from the engagement.",
    },
    {
      heading: "score yourself",
      text: "AP Lang Q3 is scored on three rows for a total of 6 points. How the scores actually break down:\n\n**1-1-0 (2/6):** a thesis exists but commentary is mostly restatement.\n\n**1-2-0 (3/6):** specific evidence but parallel points instead of building.\n\n**1-3-0 (4/6):** strong evidence, line of reasoning mostly clear, one paragraph weaker than the others.\n\n**1-4-0 (5/6):** multiple examples consistently developed, line of reasoning builds throughout.\n\n**1-4-1 (6/6):** all of the above plus sustained complexity — woven through the essay, not just gestured at.",
    },
    {
      heading: "6-point rubric",
      type: "rubric",
      rows: [
        { row: "Row A: Thesis", points: "0–1", asks: "Make a defensible claim that takes a position on the prompt.", earns: "Defensible position + goes beyond restating the prompt. Engages the 'extent to which' framing. Most students earn this." },
        { row: "Row B: Evidence and Commentary", points: "0–4", asks: "Use specific evidence and consistently explain how it supports your line of reasoning.", earns: "4: Multiple examples, consistently closes the HOW Loop. 3: At least one example fully explained, line of reasoning present. 2: Specific evidence but commentary repeats. 1: Evidence general or not connected." },
        { row: "Row C: Sophistication", points: "0–1", asks: "Do something genuinely complex with the prompt.", earns: "Situating in broader context, exploring tensions/conditions, weaponized counterargument, OR consistently vivid persuasive style. Most students don't earn this." },
      ],
    },
    {
      heading: "common mistakes",
      text: "Six patterns consistently keep students at a 3 or below.\n\n**One: the dopamine problem.** You name a real example but your commentary is 'this shows my thesis' said three different ways. Fix: use the HOW Loop and walk the reader through the mechanism.\n\n**Two: asserting causation without mechanism.** 'X therefore Y' without showing the middle steps. Fix: write the because, the which means, the and therefore — three or four sentences of gears turning.\n\n**Three: narration instead of analysis.** Telling the story of your evidence rather than explaining what it proves. Fix: ask what would be lost if this example weren't true — that answer is your commentary.\n\n**Four: the unfinished counterargument.** You raised a counterargument and didn't refute it. This actively hurts your Row B. Fix: either genuinely refute it or cut it.\n\n**Five: hedging language.** 'Often,' 'sometimes,' 'in the end,' 'overall.' Fix: make your claims with confidence. If you need a qualifier, qualify specifically.\n\n**Six: the off-the-rails final paragraph.** Sweeping generalizations, 'since the beginning of time' gestures, personal anecdotes that don't connect. Fix: stay tethered to your argument — the conclusion is your last chance to land sophistication, not abandon it.",
    },
  ],

  // ── MCQ ────────────────────────────────────────────────────────────────────
  mcq: [
    {
      heading: "the format",
      text: "The MCQ section is 60 minutes and contains 45 questions across 5 passages. That's about 12 minutes per passage. The passages are non-fiction prose — speeches, essays, letters, scientific writing. Questions test reading comprehension, rhetorical analysis, and grammar/style choices. You will not be penalized for wrong answers, so answer every question.",
    },
    {
      heading: "reading strategy",
      text: "Read the passage fully before answering any questions. This costs 2–3 minutes but saves you from constant re-reading later. As you read, track the argument's movement: where does the author's tone shift? What is each paragraph doing? Underline the thesis or controlling idea. For passages with footnotes, read them — they sometimes contain information questions test on.",
    },
    {
      heading: "how to eliminate",
      text: "For each question, eliminate answers that are too extreme — 'always,' 'never,' 'completely' — answers that contradict the passage, and answers that might be true in the world but aren't supported by the passage itself. Between two close answers, go back to the specific line referenced. The correct answer will be directly supported, not inferred. If you're guessing between two, pick the less extreme one.",
    },
    {
      heading: "rhetorical analysis questions",
      text: "Many questions ask what a word, phrase, or structural choice does — not just what it means. These are asking for effect, not definition. Translate: 'The primary purpose of lines 14–18 is to...' means 'what work are these lines doing for the argument?' Common correct answers involve contrast, qualification, evidence, concession, and transition. Common wrong answers are too literal or too vague.",
    },
    {
      heading: "time management",
      text: "If a question is taking more than 90 seconds, mark it and move on. You can always return. Spending 4 minutes on one hard question while skipping two easy ones is a losing trade. In the last 5 minutes, make sure every question is answered — even questions you haven't read. On the hardest questions, your instinct on a re-read is usually right. Don't overthink; trust your first elimination.",
    },
  ],
};
