import { Research } from "./types";

export const researchPosts: Research[] = [
  {
    title: "Making ur own GPT",
    description:
      "Building a small GPT from scratch using transformers, training on personal data, and optimizing it step by step.",
    date: "2026-05-21T12:00:00.000Z",
    slug: { current: "making-ur-own-gpt" },
    tags: [{ name: "AI", slug: { current: "ai" } }],
    markdown: `# How did it start?

my aim was to try recreating a simple GPT model without any API calls or anything, of course the latest models are insanely good they can search web, reason with themselves, we are gonna try creating a simple transformer on which models like openai, claude are based

I didn't have that much time / compute to do something that crazy so whatever you'll see is like a small miniature version I tried replicating on my small macbook (M2 Air 8gb variant)

alright I started by watching Andrej Karpathy's this video https://youtu.be/kCc8FmEb1nY and to be frank this article won't be possible without this video, half of the things i'll talk about are things i learned from this video or the research papers he mentioned

I'm gonna tell main crux of the video and how i enhanced it, if you want a full video watch Karapathy's video, he has explained very nicely there

ShritGPT Github Repo: https://github.com/Shrit1401/ShritGPT

# Data Collection

anyways before we begin i scraped all of my https://shrit.substack.com/ substack posts which I have been for two years and anything else I had on the internet, in the initial attempt when I fully trained the model the responses were something like

\`\`\`text
Me: who is shrit
ShritGPT: is study newsletter building so for properly not insane more study ships so intell and easy something cooking and hard problem. is hard problem. good problem dumb. one outreach is
\`\`\`

which if u think is pretty cool that it can form words which are actually not in the training data, but it's really really wrong so I had go and add small section such as dm answers for tokens to more about me more easily

![Screenshot 2026-05-20 at 12.50.09 PM](/research/making-ur-own-gpt/Screenshot_2026-05-20_at_12.50.09_PM.png)

i personally don't like to use much filler words when talking to someone on text, if u want u can add filler words

I had roughly \`1000029\` characters in my data, i recommend something around 1-1.2million characters to have as a data

# Interpreting the data

we can't really put so much text data files in the model and be like predict next token, we have to encode strings to make it into simple numbers so it's easy to read

## Encoding / Decoding

we need method to encode and decode our data, openai using https://github.com/openai/tiktoken this library to encode & decode, for us simply doing this will work since we have very small data

![Screenshot 2026-05-20 at 1.56.27 PM](/research/making-ur-own-gpt/Screenshot_2026-05-20_at_1.56.27_PM.png)

## Data Loading

After splitting 90% of data for training we want our model to predict the next character, in the world of transformers we call them **token,** we wanted something to test and train our data so we try to train the model with the possible targets of the token

![Screenshot 2026-05-20 at 2.01.23 PM](/research/making-ur-own-gpt/Screenshot_2026-05-20_at_2.01.23_PM.png)

# Training The Model (Bigram Language Model)

In order to train our data we want model to look at previous values as well, in most simplest form Bigram Language Model, it looks at the previous token and try to generate the next token

it takes input in something known as BTC - **Batch, Time, Channel,** and output in logits(raw scores from neural network) and loss(deviation with mode prediction and value, it updates model weights)

this model is actually logic for how character sequences are predicted

\`\`\`python
self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)
\`\`\`

We are using \`AdamW\` as training loop for the model, calculating train loss and val loss, more closer these both values more better

**Note:** with Bigram model even though we take all the previous tokens to in our memory, only the last token is used to predict the next, this is inefficient

this is our basic and simplest way to make a transformer, however if u run this you'll be nowhere close to the output, you'll still get some gibberish

we're on theory done with the model, but the model isn't that powerful to produce some nice output, so we're gonna try making it more optimized so as to see some results

# Self Attention

we want our model to utilize our memory of tokens, with our model we will want to use all our tokens to give as much information as possible, so self attention allows us to talk to diffrent tokens

**so how do we do it?**

we want tokens to prevent looking at the future so we usually use a triangular mask to hide any future data

1. Every token at every position produces two vectors, key and pair
2. we dot product of one query and key of all others
3. By Applying softmax function we calculate the weighted sum which is much better than just finding the average

then we divide it by root of head size (dk), this is called **scaled attention** it's a important normalization which has to be done

$$
\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\left(\\frac{QK^{T}}{\\sqrt{d_k}}\\right)V
$$

these values are known as weights, one of another crucial aspects of our model. we calculate attention in our \`Head\` class (forward function)

you'll see train loss an value loss to be more less, that's an imporvement there.

# Multi Head Attention

mutlihead attention is basically multiple self attention working in parallel to provide more compute and better results we it in \`MultiHeadAttention\`

after implementing this, you'll again see train value and loss value reducing

# Feed Forward

$$
\\mathrm{FFN}(x) = \\mathrm{ReLU}(xW_1 + b_1)W_2 + b_2
$$

from experiment we usually find x to be in mutlitple of 4

in simple words we have given data to a token, we want to give time for every token to think, we're giving enough compute to each token so they have enough time to interact with each other

\`\`\`python
self.net = nn.Sequential(
    nn.Linear(n_embd, 4 * n_embd),
    nn.ReLU(),
    nn.Linear(4 * n_embd, n_embd),
    nn.Dropout(dropout),
)
\`\`\`

# Residual Dropout

It's a regularization technique where model shuts off a subset of neurons, the model is prevented from relying too heavily on any specific path, which helps to mitigate **overfitting** when the model is scaled up

Awesome our basic system to make a basic system optimized pipelin for the is done, it looks something like this

![Architecture diagram](/research/making-ur-own-gpt/image.png)

# Scaling Up

up until now you'll be probably be working with very small set of data, now let's train the full data I had macbook air m2 8gb so my settings were

\`\`\`python
batch_size = 6
grad_accum_steps = 2
block_size = 384
max_iters = 25000
finetune_iters = 8000
eval_interval = 250
learning_rate = 3e-4
finetune_lr = 8e-5
eval_iters = 50
n_embd = 384
n_head = 6
n_layer = 6
dropout = 0.1
max_new_tokens = 200
temperature = 0.5
top_k = 25
\`\`\`

it took roughly 30 minute and the output was pretty good there were lot of discrepancies but i could see the things being worked on.

# Optimizing the model

it works well but we can optimize and show the text more nicely

## Fine Tuning

I am basically trying to polish the mode, I tried to decay learning rate to slowly, instead of going straight zero like main model

![Fine tuning learning rate decay](/research/making-ur-own-gpt/image-1.png)

## Temperature & K

After training, the model does not output one fixed next character. It outputs **logits** — raw scores for every character in the vocab. on a conversational model it often feels **too random** (weird jumps) or **too repetitive** (same phrases looping).

I added two knobs on top of that: **temperature** and **top-k**.

### Temperature

Temperature scales logits before softmax:

\`\`\`python
logits = logits / max(temperature, 1e-8)
probs = F.softmax(logits, dim=-1)
idx_next = torch.multinomial(probs, num_samples=1)
\`\`\`

- **Lower temperature** (e.g. \`0.5\`) → sharper distribution → model sticks to high-probability chars → more **focused / conservative** replies.
- **Higher temperature** (e.g. \`1.0+\`) → flatter distribution → more **creative / chaotic** text.

### Top k

Even after temperature, the tail of the distribution can still contain thousands of low-probability characters (typos, random symbols). **Top-k** fixes that by only keeping the **k highest logits** and zeroing everything else before softmax:

\`\`\`python
v, _ = torch.topk(logits, k)
logits = logits.masked_fill(logits < v[-1], float("-inf"))
\`\`\`

So you only sample from the **top 25** (my default) most likely next characters. That cuts a lot of garbage without killing variety completely.

## Checkpoint & Point Loss

![Screenshot 2026-05-21 at 11.28.24 AM](/research/making-ur-own-gpt/Screenshot_2026-05-21_at_11.28.24_AM.png)

The Final model took ~270 minutes to train & finetune, it was really hard for me, plus if i wanted to keep talking to model with this model i have to wait for another 270min, instead of that I added checkpoints which will save the weights, and started logging the loss with time to generate graphs

## Web UI

Training in the terminal is fine, but i wanted to make the user experience much better, so a simple api endpoint and a html file by claude made this

![Screenshot 2026-05-21 at 11.46.24 AM](/research/making-ur-own-gpt/Screenshot_2026-05-21_at_11.46.24_AM.png)

### API Endpoints

Request Body

\`\`\`json
{
  "message": "who is shrit",
  "history": [{ "role": "user", "content": "hey" }, { "role": "assistant", "content": "yo" }],
  "temperature": 0.5,
  "top_k": 25,
  "max_tokens": 180
}
\`\`\`

I added \`generate_stream()\` so each new character is **yielded** as it is sampled. Flask wraps that in **Server-Sent Events (SSE)**:

\`\`\`text
data: {"text": "i'm"}
data: {"text": " shrit"}
data: {"done": true}
\`\`\`

The frontend uses \`fetch\` + \`ReadableStream\`, parses \`data: {...}\` lines, and appends text to the bubble every few characters. If streaming 404s, it falls back to \`/api/chat\`.

After doing this changes, it took a whooping ~270 minutes for a full dataset compute in detail, but the results are still better.

# Conclusion

We tried creating a small GPT, if u want the full code go to this repo: https://github.com/Shrit1401/ShritGPT, ofcourse even though I smashed everything about myself as data it's still not upto the mark of a proper llm like OpenAI's GPT 3, bcz we had restrain the compute and data, the model base will stay the same, to scale we might add more Notes to compute

![Screenshot 2026-05-21 at 11.53.01 AM](/research/making-ur-own-gpt/Screenshot_2026-05-21_at_11.53.01_AM.png)

The text is producing is not propr he doesn't know anything apart from me and all my details, not even proper english. It was really fun project honestly, a very nice way to know how llms respond

# Sources

Attention is All u Need: [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)

Language Models are Few-Shot Learners: [https://arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)

Deep Residual Learning for Image Recognition: [https://arxiv.org/abs/1512.03385](https://arxiv.org/abs/1512.03385)

YT Video: [https://youtu.be/kCc8FmEb1nY](https://youtu.be/kCc8FmEb1nY)
`,
  },
  {
    title: "Homeschooling",
    description: "What If You Didn’t Have to Go to School?",
    date: "2025-07-23T18:21:42.540Z",
    slug: { current: "homeschooling" },
    tags: [{ name: "Research", slug: { current: "research" } }],
    markdown: `# Tl;dr (too long didn’t read)

- Homeschooling is growing in India but still rare and under the radar.
- No clear laws — you’re free till class 8, and NIOS works for 9–12.
- Most follow CBSE without questioning it, but it’s not the only way.
- With focus, you can finish school syllabus fast and learn way more.
- Best for parents who are hands-on and want their kid to explore beyond textbooks.

# Introduction

Homeschooling is still a new concept, especially in places like Asia where it’s not very common. I got interested in it because sometimes I feel that if school never had deadlines and COVID had lasted forever, my life would have taken a very different path.

if you want to know more about me [click here](https://x.com/Shrit1401/status/1931028826064089443)

Homeschooling simply means skipping traditional school and learning from home instead.

Parents usually homeschool their kids because of things like illness, AIDS, bullying, or safety issues like crime and theft.

But here, I want to look at homeschooling from a different point of view.

# Why Homeschooling is cool

Imagine what happened to education during COVID — almost everything went online. I was in 8th grade back then, and instead of studying, I used to spend my time making games that no one ever played. I’m here today mostly because one random day, I just thought it would be fun to try building things.

What if I had that kind of freedom every single day, all year long? That would’ve been so fun. But instead, I had to keep studying like always.

What if I could just stay at home and learn things like coding, finance, and how to talk to people, instead of the usual subjects like physics, chemistry, and maths?

# why homeschooling helps? in india

### then shrit if you won’t study, how will you get into college?

This is the kind of question a typical Indian parent might ask.

In the end, it mostly depends on what the parents want for their child. Do they want their kid to explore, build things, and learn about what’s really happening in the world right now? Or do they just want to follow the traditional CBSE path? Honestly, if you just sit and focus, you can finish that whole syllabus till 11th in around 4 to 6 months.

If we look a bit into the history of schooling, we’ll see that the current system comes from the colonial era. It was mainly designed to produce clerks and middlemen, not creative thinkers or innovators.

[source](https://nishani.in/the-indian-education-system-a-colonial-relic-in-need-of-urgent-reform/?utm_source=chatgpt.com)

You can change all of this by simply taking charge and choosing homeschooling.

You don’t need to fix the whole system, you can just do it for yourself, and that’s such a cool idea.

## surveys?

I got into many homeschool groups in facebook

![Screenshot 2025-07-22 at 1.14.30 PM.png](https://i.postimg.cc/gkrnV0CM/Screenshot-2025-07-22-at-1-14-30-PM.png)

I have been active in these groups more than 6 months, and have conducted many experiments

somethings I got to know

![image.png](https://i.postimg.cc/dQ5hZCxk/image.png)

Many students from classes 8 to 12 are currently homeschooling, which means their middle and high school years are happening outside traditional schools.

- August and March are the most active months for homeschooling, as shown by Google Trends
- December usually has the least activity
- Homeschooling is still seen as something fancy, and most people don’t talk about it much

# How To Set Homeschooling In India?

India doesn’t have a clear law that says homeschooling is allowed or banned — so it’s not really a yes or a no.

From what I’ve found in my research:

**For classes 1 to 8,** you can pretty much do your own thing. Kids can self-learn at home, and you don’t need to report to any official board.

Still, I’d suggest keeping some kind of report card or basic record of what your child is learning. No one usually asks for it, but if I were homeschooling my own child, I’d definitely keep one just in case.

**From class 9 to 12,** there’s a government body called **NIOS (National Institute of Open Schooling)**.

You can check out their website [here](https://nios.ac.in/).

_Some of my friends who didn’t score well in their CBSE 12th boards took the NIOS route and ended up doing much better._

With NIOS, you’ll have to do a few extra things like show up for practicals and exams. So yeah, you’ll need to study those specific chapters too.

And if my kid follows my subjects, I’ll probably be able to guide him easily through all of it.

# Problems someone can solve

While I was doing my research, I came across a bunch of problems that could actually turn into really good startup ideas. If you’re into building something, feel free to take any of these and run with them.

- parents trying to look for books or raw materials

![image.png](https://i.postimg.cc/1X34YRf3/image-1.png)

- A study buddy for each kid, so learning feels less boring and more fun. Could also include games and silly activities to keep them excited.
- some initatives for
- Choosing a good curriculum is hard, there are too many options, and most of them feel dull. Parents often don’t know which one to pick.
- A lot of people want to start homeschooling but don’t really know how to set it up or where to begin. It all feels a bit confusing.

this is something i noticed you can find many more problems try to find more of them, problems surely do exist in here

FYI

Parents aren’t always open to talking, so reaching out and having proper conversations with them can be pretty hard.

# Conclusion

Homeschooling feels like something that works best for parents who are a bit bold and really know what they are doing. Maybe parents who are teachers or principals themselves can handle it more smoothly.

But if you are someone who barely has time, especially with a full-time 9 to 5 job and maybe extra work too, it is probably better to let a school take care of your child’s education.

Also, teaching kids is not easy, it takes a lot of patience.

If you know you get angry or frustrated quickly, it’s probably better not to homeschool your kids yourself.
`,
  },
];

export function getAllResearch(): Research[] {
  return researchPosts;
}

export function getResearchBySlug(slug: string): Research | undefined {
  return researchPosts.find((r) => r.slug.current === slug);
}

export function getAdjacentResearchBySlug(slug: string): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const index = researchPosts.findIndex((r) => r.slug.current === slug);
  if (index === -1) return { previous: null, next: null };

  const previous =
    index < researchPosts.length - 1
      ? { slug: researchPosts[index + 1].slug.current, title: researchPosts[index + 1].title }
      : null;
  const next =
    index > 0
      ? { slug: researchPosts[index - 1].slug.current, title: researchPosts[index - 1].title }
      : null;

  return { previous, next };
}

export function getResearchByTag(tagSlug: string): {
  research: Research[];
  tagName: string | null;
} {
  const matching = researchPosts.filter((r) =>
    r.tags?.some((t) => t.slug.current === tagSlug),
  );
  const tagName = matching.length > 0
    ? matching[0].tags?.find((t) => t.slug.current === tagSlug)?.name ?? null
    : null;
  return { research: matching, tagName };
}
