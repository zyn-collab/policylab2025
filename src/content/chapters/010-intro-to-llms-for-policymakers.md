---
title: "Intro to LLMs for policymakers"
section: "POLICY ESSAYS"
order: 7
slug: "intro-to-llms-for-policymakers"
---

Artificial Intelligence or AI systems include a lot of different tools with their own different architectures and designs. The most basic AI tools are effectively advanced regressions and machine learning that learns to predict patterns from data, but these broad ideas have evolved into a whole range of tools with many different purposes. What most people are referring to when they say AI is a specific type of AI called Large Language Models or LLMs. ChatGPT, Deepseek, Gemini, Claude, and so on are all LLMs. There are other types of AI also widely known by people, such as Diffusion models used to make images and videos and sound, or engines like AlphaZero which can dominate grandmasters in chess. This document explains how modern AI systems – particularly large language models (LLMs) – actually work. The goal is not to provide a computer science education, but to give you the conceptual foundation needed to understand what AI can and cannot do, what outputs to trust and what to verify, and how to make informed decisions about AI deployment and policy.

Every capability and limitation discussed here flows directly from how these systems are built. Understanding the mechanism helps you predict behaviour, spot misuse of AI claims, and evaluate proposals involving AI technology. When you finish this document, you should be able to assess AI-related claims critically, understand why certain tasks are easy or hard for AI, and make informed decisions about AI deployment in your organization.

#### How LLMs work

##### Next-token prediction: the foundation of LLMs

At its foundation, a large language model does one thing: it predicts what word (or more precisely, what "token") should come next, given all the text that came before. That's it. Everything else these systems can do – writing essays, answering questions, generating code, translating languages – emerges from this single capability applied at massive scale. This is fundamentally different from how most people imagine AI working. An LLM is not an intelligent brain with memory that stores information and retrieves it on demand. It's not a search engine looking up answers. It's not storing the raw text of every book and website it was trained on. Instead, it has learned statistical patterns about how language works – what words and concepts tend to follow other words and concepts in what contexts.

Frontier AI models are trained on datasets comprising trillions of words – essentially much of the digitized text ever written. Yet the resulting model might be only a few hundred gigabytes in size. This is vastly smaller than the training data itself. The model cannot possibly contain all that information verbatim. Instead, it has compressed that ocean of text into statistical patterns encoded as numerical weights. When the model "knows" something, it's because that knowledge is encoded in these patterns, not because it can retrieve a stored copy.

This compression explains something that often puzzles people about AI-generated images: how can a model that generates images from any conceivable prompt fit on a single hard drive? The answer is that it doesn't contain copies of images – it contains patterns about what images look like. The same principle applies to language models and text. Think of someone who has read extensively for decades and internalized how ideas flow, how arguments are structured, what explanations typically accompany what concepts. When you ask them a question, they're not flipping through a mental filing cabinet to find the exact page where they read the answer. They're drawing on deep familiarity with patterns of knowledge to construct a response. This is closer to how LLMs work than the "AI as database" model most people have.

Models don't process individual letters or even whole words – they process "tokens," which are typically word fragments. Common words might be single tokens, while unusual words get split into pieces. The word "understanding" might be two tokens ("under" + "standing"), while "the" is one. This tokenization scheme lets models handle misspellings, rare words, and even invented words by combining familiar fragments.

##### The limitations of next-token prediction

To understand what "pattern prediction" really means – and why it's different from "understanding" – consider how LLMs handle riddles. Classic riddles appear frequently in training data alongside their standard answers. When given a well-known riddle, models reliably produce the expected answer – not because they "solved" it, but because they've seen this riddle-answer pair countless times.

The revealing test is what happens with *modified* riddles. Take the famous "river crossing" puzzle: a farmer must transport a wolf, a sheep, and a cabbage across a river in a boat that can only hold the farmer plus one item, and he can't leave the wolf alone with the sheep or the sheep with the cabbage. The model knows this riddle and its solution.

Now modify it: the boat can hold the farmer plus two items. The puzzle becomes trivial – just take the wolf and cabbage first, then the sheep. Yet LLMs frequently still give the original complex solution, taking items one at a time with careful sequencing. Why? Because the model pattern-matches "this looks like the river crossing riddle" and predicts "the answer to the river crossing riddle is..." without actually processing the modified constraint.

Similarly, consider the riddle: "A father and son are in a car accident. The father dies. The boy is rushed to the hospital. The surgeon says, 'I can't operate on this boy – he's my son.' How is this possible?" The expected answer is that the surgeon is the boy's mother. But if you modify the setup to explicitly state the surgeon is male, many models still give the "mother" answer, because that's what typically follows this riddle pattern.

These examples reveal something fundamental about how these systems process information. The model isn't reading your text and reasoning about it the way a human would. It's recognizing patterns and predicting what typically comes next. This works remarkably well for many tasks, but it has important limits.

Why this matters: This demonstrates that "understanding" in LLMs is pattern recognition, not comprehension in the human sense. The model isn't reading and reasoning – it's predicting what answer typically follows this type of question. This fundamental characteristic shapes both the impressive capabilities and frustrating limitations of these systems.

##### Parameters, model size, and running AI

When you hear that a model has "70 billion parameters" or "405 billion parameters," what does that mean? Parameters are the numerical weights that encode everything the model has learned. During training, these numbers are adjusted millions of times to better predict text. They're the model's "knowledge" – not stored as facts, but as patterns encoded in relationships between numbers.

Current models range from around 1 billion parameters (small, can run on basic hardware) to hundreds of billions or even trillions (frontier models requiring massive infrastructure). This scale matters practically because all those parameters must be loaded into memory to run the model. A rough rule: each parameter needs about 2 bytes in optimized formats, so a 70 billion parameter model needs about 140 gigabytes of memory.

Practical infrastructure tiers:

- **Laptop-runnable (roughly 1-7 billion parameters):** Can run on consumer hardware with adequate RAM. Useful for simple tasks like basic text processing, drafting, and summarization, but limited in reasoning capability and knowledge depth. Response quality noticeably lower than larger models.

- **Desktop GPU (roughly 7-30 billion parameters):** Requires a gaming-grade graphics card with 16-24GB of VRAM. Meaningfully capable for many professional tasks, can handle complex queries and longer documents. This tier represents a sweet spot for many organizational deployments.

- **Server-grade (roughly 30-70 billion parameters):** Requires professional GPUs or multiple consumer GPUs working together. Significantly more capable, approaching frontier model performance on many tasks. Typical enterprise self-hosted deployments fall in this range.

- **Frontier models (100+ billion parameters):** Requires data centre infrastructure – racks of specialized AI chips. These are the most capable models, but running them is expensive and requires significant technical expertise. Most users access these via APIs rather than running them directly.

##### Training vs inference

Training is the process of teaching the model – exposing it to vast amounts of data and adjusting its parameters so it learns useful patterns. Training frontier models costs tens to hundreds of millions of dollars in computing resources and takes months of specialized hardware running continuously. Only a handful of organizations worldwide can train frontier models from scratch. The training process requires not just compute, but also massive datasets, specialized expertise, and significant trial and error.

Inference is running the trained model to get outputs. When you type a question into ChatGPT, you're doing inference. This is much cheaper per query than training, but costs add up at scale – running billions of queries across millions of users requires substantial infrastructure. A single query might cost fractions of a cent, but at scale, inference costs dominate operational budgets.

This distinction matters for understanding the AI landscape: many organizations can run existing models (inference), but few can create new frontier models from scratch (training). This creates a tiered ecosystem where a few labs create foundation models, and many others build on top of them.

##### How models learn – training, fine-tuning, and RLHF

Pre-training is the initial, massive training phase. Models are exposed to enormous text corpuses – web pages, books, scientific papers, code repositories, social media, and essentially anything digitized and available. The model learns to predict what comes next in all this text, absorbing patterns of grammar, facts, reasoning, style, and association.

This explains why AI-generated prose often has a particular quality – the slightly formal, hedge-everything, eager-to-help style that many find recognizable. The training data includes enormous amounts of LinkedIn posts, marketing copy, academic writing with excessive hedging, customer service transcripts, and other formulaic writing. The model learned these are common patterns for "how to sound helpful" or "how to sound professional," and it reproduces them. It also explains certain failure patterns. If the training data contains many incorrect claims presented confidently (as the internet does), the model learns to reproduce confident-sounding claims whether or not they're accurate. The model has no way to distinguish "true" from "false" during training – it only learns what text patterns are common.

Fine-tuning is additional training on specific datasets after pre-training. An organization might fine-tune a general model on legal documents to create a legal specialist, or on medical literature for healthcare applications. Fine-tuning is much cheaper than training from scratch – typically thousands rather than millions of dollars – but trades off some general capability for specialized performance. A heavily fine-tuned model might excel at legal document analysis but perform worse at creative writing than the base model.

Reinforcement learning is a step where LLM models are developed with a “reward function”, which is some way to check whether an LLM output is “good” or “bad”. When an LLM gives an answer, if it’s rated good by the reward giver, then the LLM knows to have future responses be closer to that answer. If an answer is rated bad by the reward giver, the LLM knows to have future responses be further away from that answer. Over thousands of runs, LLMs undergoing reinforcement learning get better and better at giving “good” answers and avoiding “bad” answers. Doing reinforcement learning is easier for areas where there are clear right and wrong answers, where it would be easy for a machine to check a response and give it a score as feedback.

A subset of reinforcement learning is RLHF (Reinforcement Learning from Human Feedback), where an actual human scores whether they like or don’t like an answer. Effectively, the reward function now is whether the user likes a response. This is a step that most current models have also had during development which shapes model behaviour. After pre-training, human raters evaluate model outputs – marking responses as helpful or unhelpful, safe or unsafe, accurate or inaccurate. The model is then trained to produce more of what humans rated highly. This is why modern chatbots are conversational, try to be helpful, and generally refuse certain requests. RLHF shapes the "personality" of AI assistants. It also contributes to models being somewhat eager to please – sometimes to the point of telling users what they want to hear rather than what's accurate. This tendency, called "sycophancy," is an active area of safety research. When a user pushes back on a correct answer, sycophantic models may change to an incorrect answer to seem agreeable.

Distillation is training a smaller model to mimic a larger model's outputs. Rather than learning from raw data, the small model learns to reproduce what the large model would say. This transfers some of the large model's capabilities into a more compact, cheaper-to-run package – though typically with some capability loss. Distillation is why capable models can now run on smartphones when frontier capabilities used to require data centres. Many commercial AI products use distilled models that inherit capability from much larger "teacher" models.

##### Reasoning vs non-reasoning LLM models

Pure next-token prediction has a fundamental limitation: the model must commit to its output token by token, without the ability to plan ahead, consider alternatives, or check its work. It's like being asked to solve a complex math problem while writing your answer left-to-right, unable to scratch out mistakes or work through possibilities before committing to paper. This works poorly for tasks requiring genuine multi-step reasoning: complex math, planning, novel problem-solving, tasks where you need to consider multiple approaches before choosing one. A base model answering a math question is essentially pattern-matching to similar problems it's seen, not working through the calculation. It might get the right answer for problems that closely resemble training examples, but fail on novel variations.

Reasoning models still use LLMs to function but have a significant architectural advance that increases their capabilities significantly. These models – such as OpenAI's o1 and o3 series, Anthropic's Claude with extended thinking, and DeepSeek-R1 – generate extended internal "thinking" before producing a final answer. They can explore multiple approaches, check their own work, backtrack from errors, and engage in genuine multi-step reasoning.

The training process for reasoning models is different. Rather than just learning to predict text, they're trained using reinforcement learning on problems with verifiable steps that get you to a verifiable answer – math problems where you can check if the answer is correct, coding problems where you can run the code, logical puzzles with definite solutions. This teaches the model not just what answers look like, but how to arrive at correct answers through step-by-step work.

What reasoning enables:

- Genuine multi-step mathematical reasoning, not just pattern-matching to similar problems

- Complex coding problems requiring planning and architecture decisions

- Scientific reasoning and hypothesis testing

- Self-correction – catching and fixing errors mid-reasoning

- Better performance on novel problems not directly represented in training data

- The modified riddle problems discussed earlier – reasoning models can sometimes catch themselves and actually read the modified conditions. Not always, but much more often than non-reasoning models

What reasoning models still can't do:

- They're still fundamentally predicting tokens – just in a more sophisticated way

- They still lack access to external computation (can't truly simulate physical systems or run exhaustive searches)

- They still hallucinate, though often less frequently than base models

- They can reason within learned frameworks but cannot truly discover fundamentally novel frameworks

- Extended thinking adds latency (sometimes minutes for complex problems) and cost (more tokens generated)

Non-reasoning models are faster, cheaper, and better for straightforward tasks like creative writing, simple questions, and conversation. Reasoning models excel at math, complex analysis, coding, and anything requiring step-by-step working. Matching model type to task matters – using a reasoning model for simple questions wastes resources; using a base model for complex reasoning wastes potential. Many applications benefit from a hybrid approach: quick responses from base models for simple queries, reasoning models for complex ones.

##### Chain of thought, tool use, and what's actually happening

Chain of Thought (CoT) prompting is a technique that improves even base model performance by asking the model to "think step by step." Each generated step becomes context for the next prediction, allowing the model to build toward an answer rather than jumping directly to a pattern-matched response. That said, base model CoT is less robust than trained reasoning models and can produce plausible-sounding but incorrect reasoning.

Some frontier models can execute code – ChatGPT's advanced modes, for instance, can write and run Python. This creates an important distinction that's often missed: in situations where these advanced models perform complex calculations correctly, the Python interpreter may be doing the math, not the language model. When reasoning through a question, the model recognizes it needs to calculate something, writes Python code to do the calculation, runs that code in a sandboxed environment, and reports the result. The Python isn’t actually part of the LLM and it wouldn’t be able to do this if you were just running the LLM model itself – these are cases where the LLM has been given access to a virtual environment and Python software that it can use itself and then draw from. The impressive-looking calculation is actually the result of traditional code execution, not AI inference. The model's role was recognizing the task and writing appropriate code – valuable, but different from having the capability to do math.

If you see an LLM give a correct complex calculation, it may be because the model recognized it should use a code tool and the code did the work. The LLM itself still cannot reliably do arithmetic – this is a fundamental limitation of next-token prediction, not a solved problem. When code execution isn't available, the same model may fail at the same calculation. Similar dynamics apply to other tools: web search (the search engine finds information, not the model), file reading (the file system retrieves content), and API calls (external services perform actions). When evaluating AI capabilities, always ask: is this the model's native capability, or is a tool doing the actual work? A correct calculation via code execution doesn't mean the AI "can do math." An accurate current-events answer via web search doesn't mean the model "knows" current events.

#### Capabilities and limitations of LLMs

LLMs excel at tasks that involve recognizing, recombining, or extending patterns from their training data. This covers a surprisingly wide range of useful capabilities:

- **Synthesis and summarization:** Compressing large amounts of text into key points is essentially what the model learned to do during training – identifying what patterns of information are most important and representative. Give a model a long document and ask for a summary, and it will identify the main themes, key arguments, and important details with impressive accuracy.

- **Translation:** The model has learned statistical patterns of correspondence between languages from millions of translated documents. It doesn't "know" grammar rules explicitly; it has internalized what phrases in one language typically correspond to in another. For common language pairs with lots of training data, translation quality approaches or matches human professional translators.

- **Explaining concepts:** Training data contains countless explanations of concepts at various levels – textbook explanations, forum posts, tutorials, lectures. The model can recombine these patterns to explain almost anything, adapting to the apparent expertise level of the questioner based on cues in how the question is phrased.

- **Code generation:** Programming languages have highly regular syntax, and the model has seen enormous amounts of code paired with descriptions, comments, documentation, and Stack Overflow discussions. This makes code a domain where pattern prediction works exceptionally well. The model can generate functional code for common tasks, debug issues, and translate between programming languages.

- **Writing in styles:** Different writing styles are just different statistical distributions of word choices, sentence structures, and rhetorical patterns. The model can shift between formal and casual, technical and accessible, various historical periods, and even imitations of specific authors' styles.

- **Cross-domain transfer:** Patterns learned in one domain often apply to others. Logical structures, argumentative patterns, organizational frameworks, and problem-solving approaches transfer across subjects. This is why LLMs can engage competently with topics they have limited specific training on – they apply general reasoning patterns to new domains.

##### What LLMs can’t do well or at all

LLMs are famously poor at chess, which puzzles people who know how "intelligent" these systems seem otherwise. But consider what the model is actually doing: it has seen chess game notation in training data, so it predicts what move notation typically comes next in games like this. It's not simulating the board, calculating positions, or planning moves ahead. It plays moves that "look like chess moves in this position" but fails against anyone who can actually evaluate positions. Even reasoning models struggle with chess, because they can think *about* chess in natural language but lack the spatial representation and exhaustive search that makes chess engines strong. They might reason "I should control the centre" but can't systematically evaluate thousands of possible move sequences to find the best one.

Contrast this with AlphaZero, the game-playing AI that mastered chess, Go, and shogi. This a completely different architecture and type of AI than the LLMs which most people think of when they think of “AI”. AlphaZero actually simulates millions of positions and learns which moves lead to wins through self-play – a fundamentally different architecture for a task that requires planning and search, not pattern prediction. The right architecture for the task matters enormously.

When a viral post claims to show "the 10 best books according to ChatGPT" or "the greatest football players according to AI," it fundamentally misrepresents what's happening. The model is not evaluating thousands of books or players against each other using some objective criteria. It's predicting what books or players typically appear on "best of" lists in its training data. The output reflects consensus in training data – what humans have previously said are the best books or players – not independent AI evaluation. If you ask for "underrated" books, you'll get books that frequently appear on "underrated books" lists, which are by definition not actually underrated. The model is surfacing human consensus, not generating original analysis. On top of that, because of temperature (the randomness dial in token selection), the same question asked multiple times will give different answers. There is no "definitive AI ranking" of anything. Each generation is a new sample from probability distributions. Treating any single output as authoritative misunderstands the technology.

Training also creates fuzzy statistical patterns, not exact storage. A model might "know" that Einstein did groundbreaking physics work in the early 1900s while being wrong about the exact date of a specific paper or mixing up details from similar-sounding information. More obscure facts have less training signal, making them more unreliable. This is why specific claims – dates, statistics, citations, quotes – require verification. The model might give you a citation that looks correct (right journal, right format, plausible author names) but is entirely fabricated because the pattern "academic claim followed by citation" is strong while the specific citation details are fuzzy.

Even reasoning models are predicting tokens, not running calculations. They can approximate arithmetic they've seen patterns of, but novel large-number calculations may fail. They cannot actually simulate physical systems, run code internally (unless given code tools), or perform operations requiring exact computation. When math is involved in a correct answer, check whether code execution was used. If you ask a model to multiply two large numbers and it gets the right answer, it probably wrote code to do it. If code execution isn't available, the same question might get a wrong answer.

Important caveat: Frontier AI labs invest heavily in addressing known weaknesses through specialized training, tool integration, and architectural innovations. You may encounter impressive results on tasks described as weaknesses here. This doesn't mean the weaknesses don't exist – it means significant engineering effort has been applied to specific problems. The underlying architectural limitations remain; mitigations are often partial, task-specific, or rely on tools rather than the model itself. Smaller models and less sophisticated deployments will exhibit these weaknesses more clearly.

#### The behaviour of LLMs

There are a few key elements in understanding LLM outputs.

**Temperature:** the control for randomness in selecting the next token. This is something you can set manually if working directly with an LLM or is set at a certain level in chat LLMs like ChatGPT or Gemini. Temperature controls randomness in token selection. At low temperature, the model picks the most likely next token, producing more deterministic but potentially repetitive output. At high temperature, it samples from less likely options, producing more creative but more variable output. This means the same prompt can produce different outputs – there is no single "answer" to any question, and claims about "ChatGPT's definitive view on X" reflect misunderstanding. Run the same prompt ten times, and you may get ten different responses. For factual questions, they'll usually be similar; for creative or evaluative questions, they may vary substantially.

**Context window:** how much text the model can "see" at once – typically thousands to millions of tokens now. Everything outside this window is invisible for that query. The model cannot remember previous conversations (unless they're included in context) or access information outside what's currently provided. For document analysis, this has critical implications: if a document exceeds the context window, the model may be working with truncated or sampled portions. More insidiously, gaps in coverage may be filled with plausible-sounding fabrication, and the model won't necessarily flag that it hasn't seen everything. If you ask about page 50 of a document but only pages 1-30 fit in context, the model might still give you a confident answer based on extrapolation rather than admission of ignorance.

**Hallucination (or confabulation):** Hallucination occurs because the model predicts what should come next – and if it doesn't "know," it predicts what would *plausibly* come next. This is why citations get invented: the pattern in academic text is "claim followed by citation," so the model generates plausible-looking citations that may not exist. Critically, hallucinations are mixed with accurate information and presented with equal confidence. A response might be 90% accurate with 10% fabricated, and both parts will sound equally authoritative. You cannot tell from the tone which parts are reliable. A reader who verifies the parts they know about and finds them correct may incorrectly assume the parts they can't verify are equally reliable.

**Prompt sensitivity:** LLMs use all context to predict responses, including subtle cues you might not intend. Word choice, framing, and implied expectations all shift outputs. A question phrased as "Don't you think X is problematic?" will bias toward agreeing that X is problematic. A question that provides negative context about something will likely produce a negative response about it. This means you cannot evaluate an AI output without considering how the input shaped it. The same factual question asked in different ways – neutrally, sceptically, enthusiastically – may produce quite different answers as the model picks up on and reinforces the implied stance. When you see someone quote an answer by an LLM, especially for something that has any level of subjectivity or judgement, it is very likely following cues and associations. For example, words that are more often associated with a technical field or ideological viewpoint might give the kind of answer accepted in that field, a leading question that frames a point negatively might give an answer that is also negative while the same question using positive language might get a positive response, even the different tones of synonyms can give different cues to a model.

When models are training on predicting next tokens, the likeliest next tokens it predicts are also often reflecting the way an issue is addressed in source materials addressing that issue, which might be related to technical perspectives or ideologies (for example, the same question about an industry might have the LLM expect and predict different answers based on whether you used “capitalist class”, “industry titans”, “billionaires”, “upper class”, “the 1%”, etc since those terms are most likely to be in different contexts even when talking about the same issue. On top of that, RLHF further trains models to give the answers that humans prefer, and humans are likely to rate answers that agree with them while also being likely to use language associated with their views, which further reinforces word associations that can affect answers. RLHF also would teach models to give answers the human wants, and when humans ask leading questions like “Don’t you think X is bad?” then it’s likely that the LLM responses getting a positive feedback by the user will be ones agreeing with them.

**Sycophancy**: In particular, sycophancy or “yes men” behaviour results from RLHF training that rewards pleasing users. Models may agree with incorrect statements, change answers when challenged (even if originally correct), or tell users what they seem to want to hear rather than what's accurate. If you push back on a correct answer, a sycophantic model may say "You're right, I was wrong" even when it wasn't. This is an active area of safety research, but it remains a concern with current models. Some models are much more obvious about this than others, but this is a concern with all major models.

##### The algorithmic black box brain of LLMs

We can observe what goes into an LLM and what comes out, but we have limited understanding of why specific outputs emerge from the billions of parameters inside. The patterns are encoded in ways we cannot directly inspect or interpret. Interpretability research is advancing – we can now identify some circuits in models responsible for specific behaviours – but it remains in relatively early stages for understanding complex reasoning.

The mixed-accuracy problem is perhaps the most important practical concern. Outputs blend correct information, reasonable inferences, and fabrications – all presented in the same confident tone. This is especially dangerous when users aren't domain experts who could spot errors, when users don't examine reasoning traces that might reveal problems, or when fabricated parts are stylistically consistent with accurate parts. Consider document analysis: a model might correctly analyse portions of a document it fully processed, while fabricating plausible-sounding analysis for portions it only partially processed or missed entirely. A reader who recognizes the accurate parts as correct may not notice the fabricated parts that look equally credible. The fabrications aren't random nonsense – they're what the model predicts would plausibly be true, which makes them hard to spot.

Confidence does not equal accuracy. Models don't have reliable self-knowledge about when they're uncertain. The confident tone reflects training patterns – training data contains more confident statements than "I don't know," so models reproduce confidence whether or not it's warranted. When a model says "The study was published in 2019," it sounds just as certain whether that's a fact it encoded reliably or a plausible guess.

This makes proper verification and checking very important. Check specific claims (especially citations, statistics, quotes, dates) against primary sources. Be more sceptical for obscure topics or niche tasks where the model has less training signal. For document analysis, confirm full processing occurred. Actually read the reasoning traces (this is what shows as “Thinking” on ChatGPT or similarly expandable text in Claude-with-thinking, Gemini, Deepseek R1 and so on) when available to actually watch the steps the model takes to reach its conclusions, so that you can notice if steps are going completely wrong in ways you may not notice if the final output looks plausible. For critical applications, use multiple sources or human review. Understand that verification burden is on the user, not the model.

#### Extending LLM capabilities

##### AI agents and tool use

Agents are LLMs connected to tools: web search, code execution, file systems, APIs, software interfaces. LLMs have access to tools. Most LLMs now have web search capabilities, which work similar to an RAG but where the RAG is the internet’s search results. Sometimes models can also use specific tools – models like ChatGPT can open up Python in virtual environments and run their own code to get answers. The model decides when to use which tools and how to chain them together. This enables tasks like research across multiple sources, data analysis, workflow automation, and interacting with external systems.

Developing tool use is a harder task than training the original powerful LLMs were. Training data contains vastly more text than examples of software interfaces being used correctly. There are far fewer patterns to learn from, making tool use less reliable than text generation. When you read a million web pages, you learn a lot about language; you don't learn much about how to navigate complex software interfaces. Errors compound across steps – one wrong tool choice or parameter leads to cascading failures. If an agent is supposed to perform a five-step task and gets step two wrong, steps three through five will likely fail or produce incorrect results. This is different from text generation, where each sentence is relatively independent. Most major AI labs now create data for tool use that AI can train on by recording the workflow process for various tasks, from app development to making spreadsheets to booking flight tickets or doing shopping orders.

New failure modes include choosing wrong tools for the task, misusing tools (wrong parameters, wrong sequence), hallucinating tool outputs instead of actually using tools (the model says it searched when it didn't), taking unintended actions with real-world consequences, and difficulty recovering from errors mid-task.

Agentic AI introduces new risks because errors result in actions, not just text. An LLM that writes a wrong answer is annoying; an agent that sends wrong emails, modifies wrong files, or makes wrong API calls can cause real damage. The more power an LLM has and the more tools its given access to, the greater the risks are. This is also an ongoing area of study in trying to make safe models: the more access we give to LLMs over our data, the bigger the risks are that a rogue AI could do things such as extract our personal data from emails to pressure users, or delete major system files and cause crashes in organization databases. Oversight, sandboxing, and human-in-the-loop designs become critical when AI can affect systems beyond just generating text.

##### Multimodal models

Multimodal models extend beyond text to images, audio, and video. They're trained to associate content across modalities – learning patterns like "images that look like this tend to be described as..." Capabilities include image understanding and description, document and chart reading, audio transcription and understanding, and generating images, audio, or video from text descriptions. These capabilities are advancing rapidly, with recent models able to understand complex visual scenes, read handwritten text, and generate increasingly realistic media. The limitations of these models, since they are still built on LLM architecture which is primarily trained on text, are similar: visual hallucination (confidently misidentifying objects or reading text incorrectly), weak spatial reasoning (struggling with questions like "what's to the left of X?"), and the same fundamental pattern-based nature that can fabricate. Generated media can contain artifacts, inconsistencies, or physically impossible features – extra fingers on hands are a famous example, though this specific issue has largely been addressed in newer models.

##### Retrieval-Augmented Generation (RAG) and Knowledge Graphs

Retrieval-Augmented Generation or RAG addresses several fundamental limitations of LLMs: knowledge cutoffs (training data ends at some date), inability to access private information not in training, and the fuzzy nature of model "knowledge" that leads to hallucination. How RAG works is that when a query comes in, relevant documents are retrieved from a database and inserted into the model's context window. The model then generates answers grounded in this retrieved content rather than relying solely on its training. Answers can cite specific, verifiable sources, and hallucination is reduced for topics covered by the retrieved documents. For example, if an organization wants AI to answer questions about their internal policies, they can build a RAG system: the policy documents go into a searchable database, queries retrieve relevant sections, and the model answers based on the retrieved text. The model doesn't need to have been trained on those policies – it reads them in context.

Knowledge graphs are structured representations of facts and relationships – explicit connections like "Einstein → birthplace → Ulm" that can be queried precisely. Unlike fuzzy model knowledge, knowledge graphs give exact answers to factual queries. They can be combined with LLMs: the LLM understands natural language questions, queries the knowledge graph, and formulates natural language answers from precise data.

RAG is only as good as retrieval – if relevant documents aren't found (because the search failed or the information isn't in the database), the model falls back on potentially unreliable internal knowledge. It may not tell you it couldn't find relevant documents. Knowledge graphs require construction and maintenance, which is labor-intensive. Both add infrastructure complexity and latency. For organizational use cases where accuracy on specific documents matters more than general capabilities, RAG is often the right approach. It's widely used in enterprise AI deployments for exactly this reason.

#### The broader AI landscape

LLMs are just one type of AI. Understanding other architectures helps calibrate expectations and choose the right tool for the task.

Image and video generation (diffusion models) work differently from LLMs. They start with pure noise and iteratively refine toward coherent images, learning patterns of what images look like rather than storing copies. Model file sizes are vastly smaller than the images used in training – proof that it's patterns, not storage. A 2GB model cannot contain millions of high-resolution training images. The models don't "remix" specific artworks; they generate from learned visual statistics about what images look like.

Specialized machine learning (cancer detection from medical images, fraud detection, credit scoring, protein structure prediction) learns correlations between inputs and outcomes. These systems can find patterns invisible to humans. One key thing to pay attention to is that being finely attuned to finding any pattern that decides whether something is a yes or no, even if that pattern is some artifact in the input data. A famous cautionary example: models trained to detect cancer in medical images that learned to recognize hospital measurement rulers in the scans rather than actual pathology. Of course, the presence of a marker on the identified tumour in scans where doctors did identify a tumour and the lack of one in others means that the strongest predictor of yes/no for whether a scan had a tumour was the presence of the mark on the scan. When trying to work as a model that can actually predict cancer, “does the scan have the mark pointing to the cancer cells” is not a useful diagnostic. So, these achieved high accuracy on the training data but failed on images from different hospitals with different equipment. The model found a correlation (certain image artifacts correlate with cancer diagnoses) but not the causal pattern (actual cellular abnormalities). Success requires careful validation that the model is using the right features for the right reasons.

AlphaGo/AlphaZero type models are another different architecture represents a fundamentally different architecture from LLMs. These systems actually simulate games, learn from millions of self-play games, and search through future positions using Monte Carlo tree search. This is why they beat world champions at Go and chess while LLMs play these games poorly – they use the right architecture for tasks requiring planning and exhaustive search over possibilities.

##### The AI ecosystem – labs, models, and access

There are closed models and open-source models for LLMs. Most of the major Western AI labs have closed models, where customers can access their LLMs for pay. This includes the three most dominant AI companies in the West: the three American companies OpenAI, Anthropic, and Google which operate ChatGPT, Claude, and Gemini respectively. Some other Western AI labs include xAI which makes Grok, Meta (which releases Llama open-weight models), and Mistral (French company, open and commercial models).

The other major player in AI aside from the U.S. is China. Most Chinese models are open-source and comparable in quality to major U.S. labs. These include Alibaba's Qwen series (highly capable open models, widely used globally as fine-tuning bases), DeepSeek (including R1 reasoning model, notable for achieving strong performance at lower cost), Zhipu AI's GLM/ChatGLM series (strong Chinese-language capabilities), Moonshot AI's Kimi (known for very long context windows), Baidu's ERNIE series, 01.AI's Yi series (open models with strong multilingual performance), and numerous emerging labs from ByteDance, Tencent, and others.

Many of these Chinese LLMs are fully open-source and open-weight, enabling global use without API dependence. They're frequently used as base models for fine-tuning by companies worldwide, often without end users knowing. They often offer strong capability-to-cost ratios. Government and enterprise deployments may unknowingly rely on Chinese base models through vendors. This raises questions about supply chain visibility and dependencies that merit policy attention.

| Aspect | Closed (API-based) | Open (Downloadable) |
|----|----|----|
| Access | Via API, pay per use | Download and self-host |
| Customization | Limited (prompting, some fine-tuning) | Full (fine-tune, modify, combine) |
| Data Privacy | Data goes to provider | Data stays on your infrastructure |
| Cost Model | Usage-based, scales with volume | Infrastructure costs (fixed) |
| Capabilities | Currently strongest models | Catching up rapidly |
| Provenance | Clear who made it | May be derivatives of other models |

##### AI vendors and LLM wrappers

A wrapper is software that provides a user interface around an existing model. The wrapper company didn't build the AI – they built the interface, prompts, and possibly some fine-tuning or integrations. Value can range from substantial (genuine domain expertise, critical integrations) to minimal (just a chat interface calling an API). This matters because government and enterprise buyers often encounter AI vendors who present impressive capabilities without clarifying that 90% of that capability comes from an underlying model they didn't create. The vendor's contribution might be a nice interface and some prompt engineering – valuable, but not worth the premium often charged.

Common wrapper patterns:

- API wrappers: Interface that calls OpenAI, Anthropic, or other provider APIs. You're paying the wrapper company's margin plus the underlying API costs.

- Open model wrappers: Interface around Llama, Qwen, Mistral, or other open models. The AI itself is free; you're paying for the interface and hosting.

- Fine-tuned wrappers: Open model with additional training on specific data. More value-add, but capability still largely comes from the base model.

- RAG systems: Model plus document retrieval. Value depends heavily on retrieval quality and integration sophistication.

Questions to ask vendors:

- What base model(s) do you use? (If they won't say, be suspicious)

- What did you build versus what comes from the base model?

- Could we achieve similar results with direct API access or self-hosted open models?

- What happens to our data? (Especially if they're using third-party APIs)

- What's the actual cost breakdown? (Their margin versus underlying model costs)

Red flags here for a vendor is unwillingness to disclose base model; capabilities that exactly match a known model with no clear additions; pricing dramatically higher than direct API access for similar capabilities; claims of proprietary "AI" that sound like prompt engineering; or inability to explain what makes their system different from the base model.

Wrappers can still sometimes provide genuine value. These include when wrappers have deep domain expertise embedded in fine-tuning or RAG; critical integrations with existing systems; compliance, security, or audit features your organization needs; genuine workflow innovation; support and reliability guarantees; or when you lack internal capability to deploy directly.

Understanding these aspects are important from a procurement and fiscal responsibility perspective. Someone creating a simple AI wrapper as an app can show outcomes that appear dazzling in a demo or presentation, which would seem to justify massive prices if you didn’t know that this was just a wrapper on an existing LLM which could be had for much cheaper. Government contracts may pay premium prices for what's essentially an open-source model in a nice interface. Understanding the supply chain helps evaluate appropriate pricing, assess actual capabilities and limitations, and maintain long-term flexibility. A vendor lock-in to a wrapper around an open-source Qwen model is very different from lock-in to a proprietary model.

#### Practical considerations

Model selection should match task complexity to model capability tier, latency requirements to model size (and reasoning vs. non-reasoning), expected query volume to cost implications, and domain specificity to general versus fine-tuned options. A chatbot handling simple FAQs doesn't need a frontier reasoning model; a system analyzing complex legal documents might.

Deployment architecture options:

- API-based: Simplest to implement, but data leaves your control and costs scale with usage. Best for: getting started quickly, variable workloads, when cutting-edge capabilities matter most.

- Self-hosted open model: Data stays internal, but requires higher upfront infrastructure investment and ML expertise. Best for: sensitive data, high volume, when you have technical staff.

- Hybrid: Use open models for sensitive or high-volume tasks, APIs for complex or rare tasks. Often the right balance for larger organizations.

Customization approaches range from prompting (cheapest, most flexible, limited specialization) to RAG (good for grounding in specific documents) to fine-tuning (deeper specialization, requires data and expertise) to distillation (create smaller task-specific models from larger ones). Most organizations should start with prompting and RAG before considering fine-tuning.

There are important data considerations to also evaluate when working with AI. What data will the system access? What data will be sent to external APIs? What are compliance, privacy, and security requirements? What retention and audit needs exist? These questions often determine deployment architecture more than capability requirements.

##### Evaluating AI claims and building AI media literacy

The following are red flags in any AI claims:

- "AI says X" without acknowledging prompt sensitivity and temperature

- Treating AI outputs as authoritative rather than probabilistic

- Assuming AI "evaluated" or "analyzed" when it may have pattern-matched

- Ignoring that the same question may give different answers on different runs

- Claims about AI capabilities without specifying which model or architecture

- Impressive demos that may reflect tool use (code execution) rather than model capability

These are questions to ask about any AI claim:

- What model was used? (Capabilities vary dramatically between models)

- What was the prompt? (Outputs depend heavily on input)

- Was this one run or multiple? (Temperature creates variance)

- Was the output verified against primary sources?

- Is this task suited to LLM architecture, or would another approach be better?

- Were tools (code execution, search) involved in producing this output?

Viral AI outputs are often cherry-picked from many runs – the impressive result that gets shared, not the ten mediocre ones before it. Screenshots can be fabricated. The same model can seem brilliant or stupid depending on the prompt. Capabilities change across model versions – old examples may not reflect current systems. Impressive calculation results may be from code execution tools, not the model itself.

##### Understanding benchmark claims

Benchmarks measure specific capabilities in specific conditions. High benchmark scores don't guarantee real-world performance. Models can be trained to perform well on specific benchmarks (a form of "teaching to the test"). "Human-level" on a test doesn't mean human-level at the job the test was designed to select for – a model matching human average on the bar exam doesn't mean it can practice law.

#### Practical summary of LLM usefulness

LLMs are well-suited for:

- Drafting and editing text

- Explaining concepts (with verification of specifics)

- Brainstorming and generating options

- Translation and summarization

- Code generation (with testing)

- Synthesizing information from provided documents

- Tasks where approximate answers or creative outputs are acceptable

LLMs are poorly-suited for:

- Definitive factual claims without verification

- Tasks requiring precise computation or simulation (unless using code tools)

- High-stakes decisions without human verification

- Tasks requiring guaranteed accuracy

- Novel reasoning far outside training distribution

- Games and activities requiring strategic search (chess, Go)

- Tasks requiring genuine comprehension versus pattern matching

When to use reasoning models vs non-reasoning models: Reasoning models are necessary for multi-step math or logic problems; complex analysis requiring step-by-step working; coding problems requiring planning; tasks where showing work matters for verification; when accuracy is worth extra time and cost. Many of these tasks just cannot be done correctly by a non-reasoning AI model (reasoning models are also sometimes called thinking models). Non-reasoning models will be sufficient for creative writing, conversation, simple Q&A; summarization and synthesis; tasks where speed matters more than depth; high-volume, lower-stakes applications.

Verification practices:

- Always check citations, statistics, quotes, dates against primary sources

- Be more sceptical for obscure topics

- For document analysis, confirm full processing occurred

- Use reasoning traces when available

- For critical applications, use multiple sources or human review

- When math is involved, check whether code execution was used

#### Summary of policy implications

For the past two decades, digital technology posed manageable, evolutionary challenges - privacy concerns, data storage, online fraud. These were extensions of existing problems. Artificial intelligence is different. It doesn't merely extend old problems; it creates entirely new categories of harm that our current laws cannot even describe right now, let alone protect us against.

The core problem is a reshaping in the dynamic between the power of enforcement and the power of carrying out behaviour worthy of enforcement, with a massive asymmetry toward the latter when backed by AI tools. A single individual with access to open-source generative AI tools can now inflict damage at a scale that previously required the resources of a state intelligence agency or a multinational corporation. One person can generate thousands of nonconsensual intimate images of their classmates or colleagues in minutes. A small team can flood a legal system with thousands of pages of plausible-looking but entirely fabricated legal briefs. An unscrupulous employer can screen ten thousand job applicants in an hour using a biased algorithm that operates as a black box, making discrimination not just efficient but invisible. Our legal system, built around human actors and human-scale actions, has no mechanism to assign responsibility when the harm flows from an automated system whose decisions even its creators cannot fully explain.

The damage is already here, both globally and almost certainly in the Maldives. Across the world, women are already facing harassment campaigns fuelled by AI-generated pornography. Job applicants are being filtered out by opaque systems that penalize them for gaps in their resumes or the wrong keywords. Courts are grappling with evidence that looks real but was never captured by a camera. The question is not whether these harms will appear in the Maldives – they almost certainly already have – but whether we will have a framework ready to meet them when they become visible. The traditional approach of waiting for problems to emerge and then drafting laws in response would be inadequate given the speed and massive scale at which AI lets even individuals carry out actions, since by the time we recognize a pattern of harm, thousands of citizens may have already suffered irreversible damage to their reputations, careers, or legal rights. Staying ahead of damage by establishing clear, enforceable rules that protect human dignity regardless of how the tools evolve is important in this context. Waiting is itself a choice with consequences, and those consequences fall most heavily on the people least able to defend themselves.

The OECD developed AI principles in 2019, but with the pace in development of AI in recent years, the era before ChatGPT might as well be a century ago. The technology landscape has shifted so much that while still useful, these principles are very incomplete That said, they can provide a starting point. The OECD’s 2019 principles on trustworthy AI stipulate that AI actors must respect the rule of law, human rights, diversity and fairness, including non‑discrimination and privacy. They call for human agency and oversight, meaning that people should be able to challenge AI‑generated decisions and systems should include mechanisms for human control. The principles also demand transparency and explainability – AI developers should disclose data sources, model logic and potential impacts to affected stakeholders – and ensure robustness, security and accountability[^25]. The EU AI Act, adopted in 2024, is the world’s first comprehensive AI regulatory framework. It applies a risk‑based approach: AI systems posing unacceptable risks, such as social scoring or manipulative behaviour, are banned entirely. High‑risk systems (e.g. in critical infrastructure, education, employment and law enforcement) must undergo risk assessment, use high‑quality datasets, provide transparency, and ensure human oversight and robustness[^26]. By establishing obligations and penalties, the Act aims to ensure safe, ethical, and trustworthy AI while supporting innovation. We can learn from this framework, though we will need to adapt it to our specific context and capacity constraints.

Some of the broader issues with AI Some key policy areas around AI in general (not just LLMs) are described below.

##### Misinformation and disinformation

AI can now generate convincing false articles, social media posts, and entire websites at essentially zero cost. Unlike human-written misinformation, AI can produce thousands of fake news stories, fake scientific studies, or fake personal testimonials in minutes, each tailored to different audiences. A single person can flood the information ecosystem with coordinated false narratives that look like they come from many different independent sources. This is not just about fooling individuals - it can manipulate public opinion on elections, public health, or policy issues before fact-checkers can even respond. The traditional model of moderating harmful content does not scale when AI can generate it faster than humans can review it. Someone could create an entirely fabricated health scare with dozens of fake news sites, fake expert quotes, and fake patient testimonials, causing real-world panic or dangerous behavior changes. Or a political campaign could deploy AI to generate thousands of fake opinion pieces supporting their position, making fringe views appear mainstream. This calls for platform obligations to detect and label AI-generated content at scale, mandatory disclosure when AI is used in political communications, transparency reports on AI-generated content volumes, and penalties for deliberately deploying AI systems to deceive the public.

We are now at the point where anyone can create video or audio of a real person saying or doing things they never did, and it looks and sounds completely real. This is no longer about making funny memes. People are already using deepfake audio to impersonate someone's family member in scam calls, creating fake pornography of real people (especially targeting women and minors) without consent, or fabricating video "evidence" of politicians saying things they never said right before elections. The technology is accessible to basically anyone now, not just experts with expensive equipment. A person could create a video of a public official taking a bribe, or audio of a CEO announcing false information that tanks a stock price, or intimate images of someone who rejected them. The victims often have no recourse, and by the time the content is proven fake, the damage is done. Courts are starting to see fabricated video or audio submitted as evidence, and there is no standardized way to verify authenticity. This needs clear legal duties for anyone creating or distributing synthetic media to label it as such, severe penalties specifically for using it in fraud, politics, or to create non-consensual sexual content, watermarking or provenance systems for any video or audio that might be used as evidence, and ongoing training for courts and law enforcement on how AI can be misused both as a weapon and to undermine the justice system.

##### Mass-scale spam, bots, and harassment

AI enables single individuals or small groups to operate thousands of fake accounts simultaneously, each with unique writing styles, profile pictures, and posting patterns that make them hard to detect. These can flood public discussions, manipulate trending topics, create false impressions of public opinion, or coordinate harassment campaigns against individuals. Traditional bot detection looks for repetitive patterns, but AI-generated bots can each behave uniquely. Someone who previously could harass a person from three or four accounts can now do so from hundreds, making it impossible for the target to block them all. This scales harassment from an annoyance to a weapon that can drive people out of public life entirely. We are also seeing AI bots used to manipulate online polls, flood comment sections to drown out real voices, or create fake grassroots movements. A single actor can make it appear that thousands of people support or oppose something, distorting democratic discourse and making it impossible to gauge real public opinion. This requires platform obligations for robust detection systems with independent audits and public reporting, rate limits and verification for account creation, severe penalties for operating bot networks, and legal protections for harassment targets.

##### Involuntary pornography and non-consensual intimate imagery

Generative AI has fundamentally changed the landscape of sexual violence and harassment. Tools that can create realistic pornographic images or videos of real people without their consent are now widely available. A person can take any photo of someone and use AI to generate pornographic images or videos of that person. This means that simply existing in public spaces, having photos online for professional purposes, or appearing in group photos now carries the risk of being turned into pornography against your will. European data suggests that 98% of deepfakes are pornographic, and the number of such videos was doubling every six months leading up to 2024[^27]. The victims are overwhelmingly women and girls, but anyone with a photo accessible online is vulnerable. The scale and speed of this harm is unprecedented. A school student can victimize dozens of female classmates in an afternoon, or ex-partner can generate and distribute hundreds of pornographic images to defame their ex in minutes. Current laws on harassment, defamation, and revenge pornography were built for a world where creating such content required actual photographs or videos - evidence that was scarce and hard to produce. Those frameworks are inadequate now that an abuser can generate unlimited, photorealistic "proof" of acts that never occurred. By the time anyone realizes what happened, the images are already circulating across platforms and communities. Victims can experience psychological terror knowing these images exist and are being viewed, profound violation of their bodily autonomy, and real-world consequences including damaged relationships, lost job opportunities, and being driven out of public life. For many victims, the images are impossible to fully remove once distributed - they get saved, re-shared, and archived. Schools are not prepared to handle situations where multiple students are simultaneously victimized. Police often lack the training or resources to respond effectively. The general public frequently does not understand that the images are fake, or blames victims for "putting photos online."

This is maybe one area of AI where even the current technical landscape makes it very clear what the legal framework to address it should be and that it should be done quickly with unambiguous and severe penalties. The creation, possession, or distribution of non-consensual intimate imagery - whether real or synthetic - should be a serious criminal offense with substantial prison time, not just fines. The penalties need to be severe enough to create real deterrence. The burden of proof should not fall on the victim to prove the image is synthetic, but on the accused to explain why they created or possessed such material without consent. This reversal is essential because victims often cannot access the original material or technical expertise needed to prove synthesis, and requiring them to do so adds further trauma. There should be an explicit national ban covering not just AI-generated pornography but any non-consensual AI-generated imagery of a person, treating these as severe violations of bodily autonomy. AI allows for mass reproduction and viral dissemination in hours, and a legal process that takes months is useless to a victim whose images are going viral today. This needs rapid takedown procedures with platforms required to act within hours of notification, civil penalties for platforms that fail to remove content promptly, and dedicated fast-track legal processes for victims to obtain emergency orders. Models like Australia's eSafety Commissioner, which has power to issue immediate removal notices to platforms and impose civil penalties on individuals who post non-consensual imagery, show what effective enforcement can look like[^28]. The message must be clear that your right to use AI ends where another person's dignity and bodily autonomy begins.

##### AI in decision-making

Government agencies and companies are increasingly using AI systems to make or heavily influence decisions about people's lives - whether someone gets a loan, qualifies for benefits, gets hired, receives parole, or gets flagged by child protective services. The problem is that when something goes wrong or the decision is discriminatory, it is nearly impossible to hold anyone accountable. In the US, the case of *Mobley v. Workday* (2024) highlighted how an AI hiring tool allegedly screened out applicants based on race, age, and disability, operating as a gatekeeper with no human oversight[^29]<sup>,</sup>[^30]<sup>,</sup>[^31]<sup>,</sup>[^32]. The system is a black box. People do not know AI was involved in the decision, cannot find out why they were rejected, and cannot identify who to appeal to. If a human caseworker denies your benefits, you can appeal and they have to justify their reasoning. If an AI system flags you as high-risk for some opaque reason buried in millions of calculations, there is often no explanation and no one who takes responsibility. Organizations like this because it diffuses accountability - "the algorithm decided, not us." But someone built that algorithm, someone chose to deploy it, and someone is benefiting from the decision. People's rights are being affected by systems they cannot understand, question, or appeal. This requires mandating human-readable explanations when AI is used in decisions affecting rights or entitlements, requiring a specific named person who remains accountable for final decisions, and establishing a right to appeal to an actual human reviewer who can override the AI.

##### Security and procurement

Public bodies are rushing to buy and deploy AI systems, often without understanding what they are purchasing or whether it actually works as advertised. The AI hype means vendors can charge enormous amounts for systems that are unreliable, biased, or essentially repackaged standard software with "AI" slapped on. Government agencies may not have the technical expertise to evaluate these systems, and there is often no verification that they meet basic standards of security, accuracy, or fairness before deployment on citizens. We are seeing governments spend massive sums on AI tools that do not deliver value, or worse, that expose sensitive data to security risks or make discriminatory decisions affecting public services. There is also a real risk that AI systems purchased without proper vetting contain vulnerabilities that hostile actors could exploit to access government data or disrupt services. This requires that public bodies only procure AI systems meeting basic standards of transparency, explainability, and security, with requirements for regular independent audits, clear performance benchmarks before purchase, and technical expertise in procurement decisions to prevent overpaying for ineffective systems.

##### Public trust in all information and evidence

When any image, video, or audio can be faked convincingly, and any document can be fabricated, we face a crisis where people can deny real evidence ("that’s just an AI fake") or present fake evidence that looks real. This is already happening - real footage of police misconduct dismissed as deepfakes, fake audio used in fraud, fabricated documents in legal cases. Courts, police, journalists, and the public have no reliable way to tell what is real anymore. This problem gets worse as AI improves. We are heading toward a world where "I’ll believe it when I see it" no longer works, and digital evidence becomes worthless unless we build new systems now. This affects everything from journalism to criminal justice to everyday trust. If people cannot trust any evidence, they either believe nothing or believe only what confirms their existing views, and bad actors can operate with impunity by claiming any evidence against them is fabricated. This needs development of content authentication standards with legal recognition, updated evidentiary standards in courts accounting for AI manipulation, public education on verification methods, and potentially licensing for forensic authentication experts.

This can further drive and facilitate conspiratorial thinking, and help boost individuals or organizations that prey on the paranoias of the general public or even of mentally vulnerable or socially isolated people to drive conspiracy-fuelled movements that can be used to financially exploit those people or utilize them to drive further social chaos and unrest. A world where the very concept of truth or reality breaks down invites chaos.

Digital watermarking technology does exist, but increasing the adoption of watermarking across all media creation is a policy decision, especially for key sources of evidence such as CCTV cameras and police body cams (or through regulations and building standards or other policy pushes to get even private CCTV camera networks for example to have digital watermarking, to increasingly ensure the presence of verifiable evidence for courts). The goal of digital watermarking is to create a "chain of trust" for digital media. Emerging global standards like the Coalition for Content Provenance and Authenticity (C2PA)[^33] provide an open technical standard for certifying the source and history of media content. Camera manufacturers like Leica and Sony are already integrating C2PA standards into their hardware, creating a verified trail from the moment of capture.

##### AI in education

Students are now using AI to complete homework, write essays, and do problem sets without learning the underlying skills. Unlike traditional cheating (copying a friend's work), AI makes it trivially easy - no social cost, no risk of getting caught, and the output is original so plagiarism detectors do not catch it. (It is important to note here that the websites that claim to detect AI writing are unreliable. They produce false positives in flagging human work as AI, and false negatives in missing work made by AI. False positives are to be expected – after all, LLMs were trained on human writing from the internet and the classic tics of AI writing are usually exaggerated versions of patterns that can be found in the kind of bad human writing that exists at volume online, a lot of which are also bad student essays. That, and as AI improves, it is being trained to avoid detection patterns. There is no technological solution equivalent to Turnitin for plagiarism).

Meanwhile, students may get through school without learning to write, analyse, or think critically - skills they will suddenly need in careers or higher education. Teachers are overwhelmed, and current grading models assume students did their own work. A student could complete an entire degree using AI for most written work and never develop the ability to construct an argument, analyse a text, or communicate complex ideas. This creates a generation that looks educated on paper but lacks fundamental capabilities. This needs clear policies distinguishing AI as learning aid versus completion tool, curriculum reform emphasizing skills AI cannot replace, teacher training on both using and teaching about AI, and ensuring equitable access so AI does not advantage wealthy students while harming educational outcomes overall.

##### Outsourcing thinking and cognitive atrophy

People are increasingly using AI to think for them - not just for routine tasks, but for analysis, problem-solving, and decision-making. A professional might use AI to draft an email, analyze data, or solve a technical problem without understanding the process or being able to verify the answer. Over time, they lose the ability to do these tasks themselves. Students who use AI for all their homework never develop the foundational knowledge needed for more complex work - they cannot adapt when faced with novel problems that do not fit the template of "enter question into ChatGPT." This is different from calculators or spell-check because AI can do the entire cognitive task, not just one component. If a generation relies on AI for thinking, they cannot function when systems fail, cannot catch AI errors, and cannot innovate beyond what AI already knows. Society becomes dependent on systems that can make mistakes, hallucinate information, or be manipulated. We are essentially training people to be managers of AI systems without understanding what those systems are doing, which means they cannot tell when the AI is wrong. This requires professional standards maintaining human expertise in critical fields even when AI assists, education systems that emphasize critical thinking over AI-tool proficiency, and monitoring of societal cognitive impacts.

##### Public credulity and lack of AI literacy

Most people do not understand what AI can and cannot do. They either over-trust it (believing ChatGPT is never wrong, using AI medical advice without verification) or under-trust it (rejecting all AI assistance even when helpful). Many do not know they are interacting with AI systems, or assume AI is infallible because it sounds confident. This creates vulnerability. People get tricked by AI-generated scam calls that mimic their grandchildren's voices, people make medical decisions based on AI "hallucinations" (confident-sounding but completely false information), or individuals share sensitive information with chatbots assuming confidentiality. We are moving into a world where phone scams use the cloned voice of a loved one to demand emergency funds, and "news" sites are populated by AI-generated outrage designed to drive engagement or cause societal chaos. The FTC's Voice Cloning Challenge in the US highlights the rapid sophistication of these scams, where a few seconds of audio is enough to clone a voice[^34]. The scam works because people trust their own judgment that they can surely tell the difference between their loved ones and a replica when they lack knowledge of just how sophisticated technology has gotten now, and the emotional manipulation from worrying that someone you love is in danger short-circuits critical thinking.

Companies exploit this ignorance, marketing unreliable AI systems with exaggerated claims that people cannot evaluate. Someone might trust AI financial advice that loses them money, or follow AI health recommendations that worsen their condition, because they do not know that AI makes things up when it does not know the answer. Without basic AI literacy, people cannot protect themselves or make informed choices about when to trust AI outputs. This needs mandatory public education campaigns about AI capabilities and limitations, clear disclosure when people interact with AI systems, consumer protection against deceptive AI marketing, and requirements for AI systems to communicate uncertainty or potential errors. This includes teaching people how to spot AI-generated photos and videos while keeping in mind that rapidly advancing technology may soon even lose those signs, to be sceptical of unexpected communications even if they appear to come from someone you know (establish verification procedures with family members, use code words, call back on a known number before acting), and how to verify information before sharing it (check multiple sources, look for original reporting, be suspicious of content designed to make you angry). When citizens understand how AI-generated content works and why it is created, to question the likely motives and incentives for a given piece of content to judge whether someone would have an incentive to generate it through AI for commercial manipulation or political influence.

Increased AI literacy within the public won’t solve everything. Catching 100% of cases may be unfeasible when a lot of the most advanced cases nowadays are highly sophisticated technology, but a massive share of AI-generated harmful content is likely to be created by people who are not the most technically skilled users with the most powerful technology. Catching that 70% or so at the bottom of the barrel still prevents a massive amount of harm. Similarly, reducing the rapid spread of harmful AI-generated content is also useful. In the same way that we teach children to look both ways before crossing the street, we need to teach everyone to verify before trusting as a heuristic for the digital age. Perfect immunity to AI manipulation is impossible, but raising the cost and difficulty of manipulation enough that most scams and disinformation campaigns fail to gain traction. If even 40% of people routinely verify surprising claims before believing or sharing them, that is enough to slow the spread of false information dramatically.

##### Embedded bias and hidden perspectives

AI systems learn from data that reflects existing biases. If trained on hiring decisions that historically favored men, the AI will favor men. If trained on loan approvals that discriminated against certain neighborhoods, it perpetuates that discrimination. More insidiously, AI can embed subtle perspectives that seem neutral but are not. For example, an AI trained primarily on Western sources may present Western viewpoints as universal truth, or an AI trained on historical legal decisions may embed outdated social assumptions. Because AI outputs look objective - no emotional language, systematic process - people trust them more than human judgment, even when they are equally or more biased. Organizations can also use AI to launder discriminatory decisions: "It was not bias, the algorithm decided." Victims of discrimination cannot identify or challenge bias they cannot see, especially when the AI's reasoning is opaque. An AI might reject qualified candidates from certain backgrounds for reasons buried in complex calculations that seem neutral but reflect historical discrimination in the training data. This requires mandatory bias testing and audits before deployment in sensitive domains with public reporting, diversity in AI development teams and training data, right to explanation of how decisions were reached, and prohibition on using AI to obscure discriminatory practices.

##### AI agent access and permissions

As AI becomes more capable, there is pressure to give AI agents direct access to computer systems, databases, financial accounts, or administrative controls to automate tasks. An AI agent with banking access could transfer money, one with database access could delete records, one with admin privileges could modify critical systems. The problem is that AI systems can make mistakes (hallucinate, misunderstand instructions), be manipulated through prompt injection (tricked by users or even by text on a webpage into doing something harmful), or potentially act in unintended ways as they become more powerful. If an AI agent has the same permissions as a trusted employee, a mistake or manipulation could cause immediate, irreversible harm - funds transferred incorrectly, sensitive data deleted, security systems disabled. This is especially critical for government systems where AI might access citizen data, critical infrastructure, or security systems. Someone could potentially trick an AI agent with carefully crafted text into revealing confidential information, making unauthorized changes, or executing commands it should not. We need to decide what level of autonomous access AI should have before widespread deployment. This requires strict limitations on autonomous AI access with human authorization for sensitive actions, security protocols treating AI as potential threats rather than trusted users, mandatory audit trails of all AI actions, air-gapping critical infrastructure from AI-accessible systems, and clear liability frameworks for unauthorized AI actions.

##### Private data in training models

AI companies train their models on massive amounts of data scraped from the internet, which increasingly includes private information - leaked databases, inadequately secured government records, medical information, private communications from platforms with permissive terms of service. There is likely some information about all of us out there that is baked into the parameters of models, including potentially incorrect or mistaken data which can’t be directly corrected once found the way a false website on a search result could be. Once private data is incorporated into a model's training, that information can emerge in responses to anyone who asks the right questions. For example, if a government database of citizen information was scraped (either through a breach or because it was insufficiently protected), an AI might reveal someone's address, medical history, or financial details when asked. Even if the original source is later secured, the information is now permanently embedded in the model. Once a model is trained on personal data, that data is often baked into its neural weights, impossible to extract without retraining the entire model, which is extremely expensive and technically complex – enough so that most major AI companies which have invested billions into training effective models would never do so. Individuals have no way to know if their data was used or to have it removed. This is especially concerning for government-held data (census, health records, tax information) or private platforms where people assumed privacy. As AI companies scrape more aggressively, any data not actively protected will likely be incorporated. Someone's private medical records, financial information, or personal communications could end up being something an AI can casually mention to anyone who asks about them. This requires regulations prohibiting training on private or personal data without explicit consent with severe penalties, government must secure all databases against scraping, explicit opt-in requirements for use of personal data, notification when data has been used, rights to removal from training sets, and restrictions on AI companies accessing government or health databases.

##### Labor and employment issues

AI is being deployed to screen job applicants, monitor worker productivity, schedule shifts, and even make firing decisions - often without workers knowing AI is involved. AI resume screeners may filter out qualified candidates based on subtle biases (penalizing employment gaps that disproportionately affect women, or patterns associated with disability accommodations). AI monitoring can penalize workers for bathroom breaks, flag "low productivity" without understanding context, or create impossible performance metrics. For gig workers, AI algorithms assign work, set pay rates, and deactivate accounts with no human review or explanation. This removes accountability - workers cannot appeal to a human decision-maker or understand why they were rejected. Beyond these immediate harms, AI also enables massive job displacement across white-collar work without a clear plan for affected workers. Someone who spent years developing expertise finds their skills obsolete with no retraining pathway. Meanwhile, workers subject to AI management have no recourse when the system makes mistakes or applies standards unfairly. This combines the problems of unemployment, biased hiring, and unaccountable management in one technology. This requires transparency when AI is used in employment decisions, right to human review and appeal, explainability requirements, anti-discrimination protections accounting for AI bias, job displacement support and retraining programs, and protections for workers subjected to AI monitoring.

##### Democratic integrity

AI enables micro-targeted political persuasion at unprecedented scale. Campaigns can generate thousands of personalized messages, each designed to manipulate a specific voter's fears or desires, delivered through fake grassroots accounts. Unlike traditional advertising, this is invisible - each voter sees different messages, making it impossible for opponents, media, or fact-checkers to scrutinize. AI can identify persuadable voters, test which emotional appeals work, and generate content automatically. This goes beyond deepfakes to include fake opinion polls showing momentum, fabricated endorsements, coordinated bot networks creating false impressions of support, or AI-generated calls targeting voters with voter suppression messaging (wrong voting date, fake poll closures). Voters cannot tell what is real, candidates can deny involvement, and by the time manipulation is detected, the election is over. A political campaign could use AI to send different contradictory messages to different voter groups, each tailored to what that group wants to hear, with no public record of what was promised. This undermines the foundation of democracy - informed voter choice based on what candidates actually stand for. This needs mandatory disclosure when AI is used in political advertising or campaigning, restrictions on AI-enabled micro-targeting, transparency in political AI tool use, penalties for AI-driven voter manipulation, and potentially rapid-response mechanisms for addressing AI-generated electoral interference.

##### Critical infrastructure

AI is being deployed in systems where failures cause immediate physical harm - power grids, water treatment, hospitals, transportation, emergency services. Unlike other applications where an AI error might mean a bad recommendation, here mistakes can kill people. An AI managing a power grid that makes a wrong prediction about demand could cause blackouts affecting hospitals. An AI-controlled traffic system that malfunctions could cause crashes. AI in water treatment that hallucinates safe chemical levels could poison a city. These systems also become targets - if adversaries can manipulate the AI (through data poisoning, adversarial inputs, or system compromise), they can cause catastrophic damage without physical access. The complexity of AI makes it hard to predict failures, and the speed of AI decision-making means humans may not have time to intervene before damage occurs. We are essentially deploying powerful but not fully reliable systems in contexts where we cannot afford mistakes. This requires extra restrictions and human oversight for AI in critical infrastructure, mandatory redundancies and fail-safes, rigorous testing and certification before deployment, regular independent audits, clear protocols for human override, and heightened security standards accounting for AI-specific vulnerabilities.

#### Glossary of key terms

- **Agent:** An LLM connected to tools (search, code execution, file systems) that can take actions beyond generating text.

- **API (Application Programming Interface):** A way for software to access AI model capabilities remotely, typically charged per use.

- **Benchmark:** A standardized test measuring specific AI capabilities under controlled conditions.

- **Chain of Thought (CoT):** A technique where models generate step-by-step reasoning before producing final answers.

- **Context Window:** The amount of text a model can process at once; typically measured in tokens.

- **Distillation:** Training a smaller model to mimic a larger model's outputs, transferring some capability into a more efficient package.

- **Fine-tuning:** Additional training on specific data to adapt a general model for specialized tasks.

- **Hallucination:** When a model generates plausible-sounding but fabricated information.

- **Inference:** Running a trained model to generate outputs (as opposed to training it).

- **Knowledge Graph:** A structured database of facts and relationships that can be queried precisely.

- **Multimodal:** AI systems that process multiple types of input (text, images, audio, video).

- **Open Weights:** Models whose parameters are publicly available for download and self-hosting.

- **Parameters:** The numerical weights encoding everything a model has learned; more parameters generally means more capability.

- **RAG (Retrieval-Augmented Generation):** A technique that retrieves relevant documents and includes them in context to ground model responses.

- **Reasoning Model:** An LLM trained to generate extended internal thinking before producing answers, enabling multi-step problem-solving.

- **RLHF (Reinforcement Learning from Human Feedback):** Training models on human preferences to make them more helpful and aligned with user expectations.

- **Sycophancy:** The tendency for models to tell users what they want to hear rather than what is accurate.

- **Temperature:** A parameter controlling randomness in model outputs; low temperature is more deterministic, high temperature more variable.

- **Token:** The basic unit of text that models process – roughly a word or word fragment.

- **Training:** The process of teaching a model by exposing it to data and adjusting its parameters.

- **Wrapper:** Software providing an interface around an existing AI model, potentially adding features but not building the core AI.

[^25]: [www.oecd.org/en/topics/sub-issues/ai-principles.html](https://www.oecd.org/en/topics/sub-issues/ai-principles.html)
[^26]: [digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
[^27]: "The State of Deepfakes" report [sensity.ai/reports](https://sensity.ai/reports)
[^28]: Australian eSafety Commissioner powers and reports [www.esafety.gov.au](https://www.esafety.gov.au)
[^29]: Mobley v. Workday class action www.eeoc.gov/litigation/briefs/mobley-v-workday-inc
[^30]: [www.lawandtheworkplace.com/2025/06/ai-bias-lawsuit-against-workday-reaches-next-stage-as-court-grants-conditional-certification-of-adea-claim](https://www.lawandtheworkplace.com/2025/06/ai-bias-lawsuit-against-workday-reaches-next-stage-as-court-grants-conditional-certification-of-adea-claim)
[^31]: [www.lexology.com/library/detail.aspx?g=46029a5e-74be-461a-8f1c-5a34409af9bd](https://www.lexology.com/library/detail.aspx?g=46029a5e-74be-461a-8f1c-5a34409af9bd)
[^32]: EEOC guidelines on AI in employment [www.eeoc.gov/ai](https://www.eeoc.gov/ai)
[^33]: Coalition for Content Provenance and Authenticity technical specifications [c2pa.org](https://c2pa.org)
[^34]: FTC (Federal Trade Commission) reports on voice cloning fraud [www.ftc.gov/news-events/contests/voice-cloning-challenge](https://www.ftc.gov/news-events/contests/voice-cloning-challenge)