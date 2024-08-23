---
slug: ai-form
title: Implementation of a form using an LLM
description: 'I visit the concept of the HTML questionnaire with a twist: I use an LLM to process the responses.'
seoTitle: AI Form
seoDescription: 'I visit the concept of the HTML questionnaire with a twist: I use an LLM to process the responses.'
timestamp: 2024-08-23T16:05:16+0000
---

I had recently been given the opportunity to puzzle on a form whose inputs and outputs were AI-generated. Yes, yes, this goes into the joke that AI is replacing software with something worse, but there are advantages to creating such a form:

1. The LLM can convert prose to other metrics. For example, if I want a number, the LLM knows "thirty" is 30. If I want a boolean, "yeah", "yes", "yup" are true. I could look for these specific words in code, which would be faster, but it wouldn't guarantee I am preserving the original sentiment of the sentence. (Not that an LLM guarantees that either, but let's move on.)

2. The bot can answer other questions the user has. For example, if a question is unclear, the bot can clarify it.

So it's not a _terrible_ idea.

The idea was to represent the form as a JSON object and go through the object iteratively. This allowed the form to change if we needed it to.

I decided that the questions should be written by me and not presented by the LLM, as I'll explain later.

For "age", try "30", "thirty", or "fifteen times two". Just works.

For the personal preference questions i.e. "Do you like pineapple on pizza?" a "yeah", "yup", "yes" suffices to record a boolean value.

For these same questions, asking "What is coffee?" or "What is pineapple?" coerces the bot to search through the internet for answers. So this type of form can be useful for clarifying questions.

The response from the LLM was formatted in this way:

```
interface StringResponse {
    value?: string | null;
    answer?: string;
}

interface NumberResponse {
    value?: number | null;
    answer?: string;
}

interface BooleanResponse {
    value?: boolean | null;
    answer?: string;
}

type Response = StringResponse | NumberResponse | BooleanResponse;
```

Paired with the prompt:

> Extract the {string|number|boolean} value from the user's response. This is the question the answer belongs to: {question}. If, instead of answering, the user asks any questions, answer to the best of your ability.

This is a bit clunky and something I hacked together for interest of time i.e. my boredom. What I really want is a definitive answer from the user, converted to JSON, **or** a reply that not related to the answer. Of course, with the latter, I give the LLM the tools to misunderstand the user's query, but I'm fairly certain it'll be accurate in most cases.

The ideal place for this code to live is in the server - a session should be created for the user, and the data of that session should be manipulated entirely in the backend. All the server has to do is provide the program's responses, whether informed from the bot or by the programming logic; the client renders the responses and sends the user's answers to the server. A very simple and effective design that does not burden the client. I did not implement the code in this way as I didn't want to mess around with sessions.

The fundamental issue I have with "AI" is that it's really an LLM, a Large Language Model. It works really well for language. It does not understand, unfortunately, any other type of human communication, such as mathematics or logic; these have to be supplemented with external code. This becomes confusing when you realize that the purpose of language is to convey logic. It's a reminder that the LLM knows how to generate words by statistical analysis. Ironically, the LLM itself does not understand the statistics (though, as I read through Carl Sagan's "Dragons of Eden", humanity doesn't really understand the neural networks that comprise our own knowledge).

Thus, people, namely, an audience, or a client, get confused and expect a level of autonomy behind the bot. This is far from the truth. A programmer has to wire the bot's thinking into actual actions. So, really, the bot is just an interface using sentiment analysis. This is hardly the future everyone imagines AI to trumpet forward, but it's certainly an interesting future.

So, no matter how you look at it, you still need the programmer. You still need to break algorithms into clear, explainable pieces of code that represent the domain logic. You could ask the bot to generate code, but it'll use code samples from the internet, which is not vast and computionally expensive at all. In fact, the most common sense thing to do, until the technology is solidified anyway, is to rely on regular ol' user interface technology. A regular HTML form is a happy replacement for our bot, because we have been testing and assuring HTML forms for decades.

As for examples on what I coded specifically, I knew what questions I wanted to ask the client, so I did not allow the bot to innovate. I wrote the code to iterate through the form, again not allowing the bot to figure out where it should go. The bot was only responsible for converting the user's responses to JSON-valid values, and this it was very good at. In fact, while it's typical to pass onto the LLM the context of the entire conversation, I decided to only present the current question being asked as context. Does it need the entire conversation to answer certain questions? Maybe in a different sort of form, where questions are not atomic. But if I needed the bot to make a decision and to use prior language, I could implement this as a conditional statement in the code, choosing to remove now-unnecessary questions from the form, or asking new questions instead, which is the first thing you learn in programming, which is thus the easiest thing for me to do rather than trust the LLM, which means I have talked myself out of this bad decision.

Programming, after all, is to write in logic, and this language is as precise as it can be at the moment, regardless of whether you write in Java or Python or JavaScript. A program is an expression of logic, whether it's an HTML form or a cron job or a sorting algorithm, and so why write a bot to do what a program does in more steps and more labor? But, because logic is so sparse, it hardly captures the richness of life. We must then figure out how to translate the various languages of life, as color, as mathematics, as the English language, into the language of logic. That is what the role of the LLM should be, and that's what special about this technology. Perhaps computer scientists already understand this and I'm preaching to the choir.
