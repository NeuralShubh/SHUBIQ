export type BlogBlock =
  | { type: "h2" | "h3" | "p" | "blockquote" | "pullquote"; content: string }
  | { type: "ul" | "ol"; content: string[] }

export interface BlogPostBase {
  slug: string
  title: string
  excerpt?: string
  category: "Productivity" | "Focus" | "AI Systems"
  date: string
  author?: string
  tags?: string[]
  content: BlogBlock[]
}

export interface BlogPost extends BlogPostBase {
  excerpt: string
  readingTime: number
}

const BLOG_POSTS: BlogPostBase[] = [
  {
    slug: "productivity-system-2026",
    title: "How to Build a Productivity System in 2026",
    category: "Productivity",
    date: "March 2026",
    author: "Shubham",
    tags: ["systems", "execution", "habits"],
    content: [
      {
        type: "p",
        content:
          "A real productivity system is not a list of hacks. It is an operating system you trust when life gets loud. In 2026, the difference between shipping consistently and drowning in noise is your system's ability to capture decisions, protect focus, and keep energy sustainable over months, not just one week.",
      },
      {
        type: "p",
        content:
          "Most people collect tools. Few build a workflow. This guide is a blueprint for a durable system built around tasks, habits, and focus. The outcome is not just doing more, but doing the right work on repeat with less friction.",
      },
      { type: "h2", content: "Why Most Productivity Systems Fail" },
      {
        type: "p",
        content:
          "Systems fail because they are designed for motivation, not reality. They assume perfect energy, perfect time, and perfect discipline. The moment life adds friction, the system collapses. A reliable system is resilient to chaos. It is built to be used on bad days, not just good ones.",
      },
      {
        type: "p",
        content:
          "The most common failure points are: too many tools, no clear ritual for capture, and no protected focus window. Without a stable capture ritual, tasks leak. Without a focus ritual, tasks accumulate. Without habits, the system loses momentum.",
      },
      {
        type: "p",
        content:
          "Another hidden failure is lack of definition. If the system is not explicit about what qualifies as a task, the inbox becomes a dumping ground. Clarity reduces the volume. Only capture work you intend to execute or decide on in a review.",
      },
      {
        type: "pullquote",
        content: "A productivity system should reduce decisions, not add them.",
      },
      { type: "h2", content: "The Three Pillars: Tasks, Habits, Focus" },
      {
        type: "p",
        content:
          "Every execution system needs three layers. The task layer holds commitments. The habit layer builds consistency. The focus layer creates deep work bandwidth. If any layer is missing, you will feel busy but not progress.",
      },
      {
        type: "ul",
        content: [
          "Tasks: the single source of truth for what needs to ship.",
          "Habits: the repeatable actions that make progress automatic.",
          "Focus: protected blocks that allow real work to happen.",
        ],
      },
      {
        type: "p",
        content:
          "Tasks without habits become wish lists. Habits without focus become busywork. Focus without tasks becomes randomness. The system only works when all three are coordinated.",
      },
      {
        type: "p",
        content:
          "The fastest way to build alignment across the layers is to connect them. A daily focus block should always pull from the same task list. Habits should begin or end the focus block. That connection makes execution feel effortless instead of forced.",
      },
      { type: "h2", content: "Building Your System Step by Step" },
      {
        type: "p",
        content:
          "Step one is capture. Create a daily capture ritual that happens at the same time every day. It can be a 10-minute morning sweep or an end-of-day shutdown, but it must be consistent. Everything gets captured before you trust the system.",
      },
      {
        type: "p",
        content:
          "Step two is consolidation. Weekly, you review the task list and clear noise. Archive, defer, or delete anything that does not align with current priorities. The weekly review is the backbone of long-term consistency.",
      },
      {
        type: "p",
        content:
          "Step three is focus scheduling. Assign at least one deep-focus block per day. These are protected appointments, not optional suggestions. A simple rule: if you miss the focus block, reschedule it that day before anything else.",
      },
      {
        type: "p",
        content:
          "Step four is feedback. At the end of each day, capture what moved the needle and what did not. This keeps the system adaptive and prevents you from repeating low-impact work.",
      },
      {
        type: "ol",
        content: [
          "Daily capture ritual (10 minutes).",
          "Weekly review (30-45 minutes).",
          "Daily focus block (60-120 minutes).",
          "Habit triggers tied to the focus block.",
        ],
      },
      { type: "h2", content: "Tools That Actually Help" },
      {
        type: "p",
        content:
          "Tools should not be your system; they should support it. Choose tools that reduce friction, not add features. The best tools are minimal, fast, and designed for repeated use.",
      },
      {
        type: "p",
        content:
          "A good rule: if a tool forces you to manage the tool itself, it is a distraction. Favor tools that provide one clear action: capture, review, or focus, without asking you to configure every step.",
      },
      {
        type: "p",
        content:
          "SHUBIQ Flow was designed to align tasks, habits, and focus in a single ritual-driven workspace. The system keeps your daily execution in one place so you are not switching between apps to stay on track.",
      },
      { type: "h2", content: "Maintaining the System Long-Term" },
      {
        type: "p",
        content:
          "Sustainability is the real test. A system is only successful if you can use it for six months without burnout. The best way to do this is to keep it simple and predictable. One capture ritual, one weekly review, one daily focus block.",
      },
      {
        type: "p",
        content:
          "If your system fails during travel, high-stress weeks, or unexpected life events, simplify the rules. A minimal version of the system should still function. That is the difference between a fragile system and a resilient one.",
      },
      {
        type: "p",
        content:
          "When the system feels heavy, reduce inputs. Fewer tasks, fewer habits, fewer tools. The aim is to protect clarity. The system is not a cage, it is a structure that gives you control when pressure rises.",
      },
      {
        type: "blockquote",
        content:
          "A system that survives pressure is better than a system that looks perfect on paper.",
      },
      { type: "h2", content: "Summary: Your 2026 System" },
      {
        type: "ul",
        content: [
          "One task inbox, reviewed weekly.",
          "One daily focus block protected by default.",
          "Habits that reinforce the work, not distract from it.",
          "Tools that remove friction instead of adding more decisions.",
        ],
      },
      {
        type: "p",
        content:
          "Build the system once, then keep it stable. Execution is less about willpower and more about having the right architecture ready when the week gets heavy.",
      },
    ],
  },
  {
    slug: "deep-focus-stack",
    title: "The Deep Focus Stack: Rituals That Actually Work",
    category: "Focus",
    date: "February 2026",
    author: "Shubham",
    tags: ["focus", "rituals", "deep work"],
    content: [
      {
        type: "p",
        content:
          "Focus is not a personality trait. It is a system that can be engineered. In an age of constant interruption, the ability to enter deep work is your most valuable competitive edge.",
      },
      {
        type: "p",
        content:
          "The deep focus stack is a set of rituals that make focus predictable. It is not about forcing discipline. It is about designing your environment and routines so focus becomes the default state.",
      },
      { type: "h2", content: "The Problem With Modern Focus" },
      {
        type: "p",
        content:
          "Modern work rewards responsiveness, not depth. Notifications create reactive loops. Context switching breaks momentum. The result is a day that feels busy but produces little meaningful output.",
      },
      {
        type: "p",
        content:
          "The cost is invisible until you measure it. A single interruption can create a 15-minute recovery cycle. Multiply that across a day and the time lost dwarfs the time spent on actual work.",
      },
      {
        type: "p",
        content:
          "To fix this, we need to treat focus as an engineered system. You do not fight distractions; you remove their power to derail you.",
      },
      {
        type: "pullquote",
        content: "Focus isn't about willpower. It's about architecture.",
      },
      { type: "h2", content: "Environment Design: Your First Lever" },
      {
        type: "p",
        content:
          "Your environment is a silent instruction set. If your desk signals distraction, your brain will follow. Remove visual clutter. Silence notifications. Keep only the work surface you need.",
      },
      {
        type: "p",
        content:
          "If you work remotely, define a focus zone. Even a small ritual like turning on one lamp, closing one door, or starting a specific playlist can act as a trigger for deep focus.",
      },
      {
        type: "ul",
        content: [
          "One device for deep work.",
          "No open messaging apps during focus blocks.",
          "Physical cues that signal focus (headphones, lighting, posture).",
        ],
      },
      {
        type: "p",
        content:
          "When the environment is clean, focus becomes less about resisting and more about flowing into the task.",
      },
      { type: "h2", content: "The Focus Block Method" },
      {
        type: "p",
        content:
          "A focus block is a protected time window where you work on one meaningful task without interruption. The goal is not to do everything, but to make real progress on one thing that matters.",
      },
      {
        type: "p",
        content:
          "Start with 60-90 minutes. Use a pre-defined input list. When the block starts, you already know what you are doing. The mental overhead is removed.",
      },
      {
        type: "p",
        content:
          "If 90 minutes feels impossible, begin with 45. The goal is to build the ritual, not to prove your endurance. Consistency beats intensity.",
      },
      {
        type: "ol",
        content: [
          "Choose one priority before the block.",
          "Clear your environment.",
          "Set a timer and protect the block.",
          "End with a quick review.",
        ],
      },
      { type: "h2", content: "Rituals Before and After Deep Work" },
      {
        type: "p",
        content:
          "Rituals create consistency. A 3-minute pre-focus ritual signals the brain that the block has begun. A 5-minute post-focus ritual captures output and clears mental residue.",
      },
      {
        type: "p",
        content:
          "The post-focus ritual matters more than most people think. It is where you capture insights, clean the task list, and decide the next focus target. This is how momentum carries into the next day.",
      },
      {
        type: "p",
        content:
          "Examples: write the task in one sentence, close all other tabs, and take three deep breaths. After the block, document progress, capture next steps, and reset your environment.",
      },
      { type: "h2", content: "Measuring Focus Quality" },
      {
        type: "p",
        content:
          "Focus quality is not hours worked. It is the ratio of time spent on the task versus time lost to drift. Track it weekly. If your focus blocks are failing, adjust your environment, not your willpower.",
      },
      {
        type: "p",
        content:
          "A simple metric: count how many times you leave the task during a block. If the count is high, reduce the block length or tighten the environment until focus stabilizes.",
      },
      {
        type: "blockquote",
        content:
          "The goal of a focus ritual is to make deep work repeatable, not heroic.",
      },
      { type: "h2", content: "Summary: The Focus Stack" },
      {
        type: "ul",
        content: [
          "Engineer the environment to reduce temptation.",
          "Run one focus block daily.",
          "Use pre- and post-rituals for consistency.",
          "Measure focus quality weekly and refine.",
        ],
      },
      {
        type: "p",
        content:
          "The stack is simple. The power comes from repetition. When these rituals become automatic, focus stops being a struggle and becomes your baseline.",
      },
    ],
  },
  {
    slug: "ai-workflows-for-teams",
    title: "AI Workflows for Small Teams",
    category: "AI Systems",
    date: "January 2026",
    author: "Shubham",
    tags: ["ai", "automation", "teams"],
    content: [
      {
        type: "p",
        content:
          "Small teams win by speed and clarity. AI can amplify both, but only if it is applied in the right places. The goal is not to replace judgment. The goal is to remove the noise around it.",
      },
      {
        type: "p",
        content:
          "This guide outlines where AI actually helps, what to automate first, and how to avoid the trap of over-automation that creates more overhead than value.",
      },
      { type: "h2", content: "Where AI Actually Helps Small Teams" },
      {
        type: "p",
        content:
          "AI is best when it accelerates repeatable tasks: summarization, drafting, categorization, and pattern discovery. It should not be placed in mission-critical decisions without human review.",
      },
      {
        type: "p",
        content:
          "For small teams, the highest ROI comes from reclaiming time. If a workflow saves two hours a week, that time compounds over months. Start with low-risk wins.",
      },
      {
        type: "ul",
        content: [
          "Summarize long research or meeting notes.",
          "Draft first versions of content or documentation.",
          "Classify incoming support tickets or feedback.",
        ],
      },
      {
        type: "p",
        content:
          "These are the areas where speed matters and errors are easy to catch. AI saves time without risking trust.",
      },
      {
        type: "pullquote",
        content: "The goal isn't to replace human judgment. It's to remove the noise around it.",
      },
      { type: "h2", content: "Three AI Workflows You Can Deploy This Week" },
      {
        type: "p",
        content:
          "Start with the workflows that reduce immediate drag. The faster you see results, the easier it is to build trust in the system.",
      },
      {
        type: "p",
        content:
          "Each workflow should have a clear owner and a simple feedback loop. If the outputs are not reviewed, quality will drift and trust will drop.",
      },
      {
        type: "ol",
        content: [
          "Daily summary bot: compile updates from project tools into a single digest.",
          "First-draft assistant: generate outlines for content, docs, or proposals.",
          "Feedback classifier: tag user feedback by theme and urgency.",
        ],
      },
      { type: "h2", content: "Common Mistakes: Overautomating Too Early" },
      {
        type: "p",
        content:
          "The fastest way to fail is to automate chaotic processes. If the underlying workflow is broken, AI will only make it faster, and more confusing. Fix the workflow first, then automate.",
      },
      {
        type: "p",
        content:
          "Another mistake is chasing every new model without clear ROI. Stability matters. Choose a model that fits the job and stick to it until the process is refined.",
      },
      {
        type: "p",
        content:
          "Also avoid giving AI full control of user-facing decisions. Keep a human in the loop for anything that impacts trust or reputation.",
      },
      { type: "h2", content: "Choosing the Right Tools" },
      {
        type: "p",
        content:
          "Choose tools based on integration and cost control. Most small teams need flexible APIs, clear pricing, and the ability to audit outputs. Do not chase the newest model if it does not fit your workflow.",
      },
      {
        type: "p",
        content:
          "SHUBIQ Studio builds AI workflows around existing tooling, so teams do not need to rebuild their entire stack. The best AI implementation is often invisible, just a smoother day.",
      },
      { type: "h2", content: "Building an AI-First Team Culture" },
      {
        type: "p",
        content:
          "AI is most effective when the team understands its role. Train everyone to see AI as an assistant, not a judge. Build habits around checking and refining outputs. Celebrate time saved, not just tasks completed.",
      },
      {
        type: "p",
        content:
          "The best teams build documentation around AI usage. Clear prompts, expected output formats, and review checklists keep the system predictable and scalable.",
      },
      {
        type: "blockquote",
        content:
          "Treat AI as a colleague who drafts quickly and needs review, not as an oracle.",
      },
      { type: "h2", content: "Summary: Keep It Simple" },
      {
        type: "ul",
        content: [
          "Automate repeatable tasks first.",
          "Keep humans in control of decisions.",
          "Choose tools that integrate cleanly.",
          "Measure impact in time saved and clarity gained.",
        ],
      },
      {
        type: "p",
        content:
          "AI workflows should reduce overhead, not increase it. Start small, measure quickly, and scale only what proves useful.",
      },
    ],
  },
]

function extractText(blocks: BlogBlock[]): string {
  return blocks
    .map((block) => {
      if (Array.isArray(block.content)) return block.content.join(" ")
      return block.content
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

function getWordCount(text: string) {
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS.map((post) => {
    const fullText = extractText(post.content)
    const readingTime = Math.max(1, Math.ceil(getWordCount(fullText) / 200))
    const excerpt =
      post.excerpt ??
      `${fullText.slice(0, 180).trim().replace(/[.,;:]?$/, "")}...`
    return { ...post, excerpt, readingTime }
  })
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug)
}
