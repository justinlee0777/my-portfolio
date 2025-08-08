import styles from './chatbot-ideas-page.module.scss';

import { JSX } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import Slide from '../components/slide/slide';
import { ChatbotExample } from './chatbot-example/chatbot-example';
import { FormChatbotExample } from './form-chatbot-example/form-chatbot-example';
import { JournalChatbotExample } from './journal-chatbot-example/journal-chatbot-example';
import { TreeChatbotExample } from './tree-chatbot-example/tree-chatbot-example';

export function ChatbotIdeasPage(): JSX.Element {
  return (
    <Slide className={styles.slide}>
      <div className={styles.chatbotIdeasPageContainer}>
        <h2>Chatbot UI ideas</h2>
        <p>
          Everyone and their mother has opinions about chatbots. I don't see
          them as being much different from search engines, except, whereas a
          search engine will present to you an impartial set of links that 1.
          contradict one another and 2. contain your query and a whole bunch of
          other information, the chatbot will make some attempt to resolve the
          contradictions (maybe arbitrarily, but the internet has always been
          somewhat arbitrary) and provide you the direct response to your query.
          Ergo, I don't have to spend all my time parsing through information
          and spend more of my time intaking information; I can resolve the
          chatbot's BS on my own time. Technology!
        </p>
        <p>
          In the course of using chatbots I found the vertical design to
          frustrate any kind of complex thinking. And so, I drafted these
          designs not to be the end of the conversation but as ideas of how to
          shape information going forward.
        </p>

        <h3>Tree</h3>
        <p>
          Very quickly I found the chatbot's vertical design to be limiting for
          any technical interrogation. Sometimes the response to a question
          inspired more questions, and in the course of asking questions the bot
          would make assumptions about my queries when, in fact, I am just
          asking questions and putting out hypothetical scenarios.
        </p>
        <p>I developed the Tree for just this purpose: interrogation.</p>
        <Tabs className={styles.tabs}>
          <TabList className={styles.tabList}>
            <Tab>Example</Tab>
            <Tab>Try it out</Tab>
          </TabList>

          <TabPanel>
            <TreeChatbotExample useInitial />
          </TabPanel>
          <TabPanel>
            <TreeChatbotExample />
          </TabPanel>
        </Tabs>

        <h3>Journal</h3>
        <p>
          In developing the ideas of psychotherapy, Freud demonstrates very
          early that the patient's cognitive distress is not like a disease,
          which can be palliated with medicine. A patient has to "cure"
          themselves - they must have a revelation concerning their own
          thoughts; the therapist is merely an aide to help the patient look at
          their own way of thinking in an external sense.
        </p>
        <p>
          I began recording a dream journal and found a chatbot was quite useful
          in discovering dream interpretations, because there is no such thing
          as <i>correctness</i> when it comes to dream interpretation, unless
          the patient deems it to be correct. As a result, I developed this kind
          of bot.
        </p>
        <p>Click on the edges of the component to flip pages.</p>
        <Tabs className={styles.tabs}>
          <TabList className={styles.tabList}>
            <Tab>Example</Tab>
            <Tab>Try it out</Tab>
          </TabList>

          <TabPanel>
            <JournalChatbotExample useInitial />
          </TabPanel>
          <TabPanel>
            <JournalChatbotExample />
          </TabPanel>
        </Tabs>

        <h3>Form</h3>
        <p>
          This is an odd one: a friend of mine wanted to build a New Year's
          Resolution app. While brainstorming for ways to make it work, I
          developed this prototype to simplify the user shaping their needs into
          a prompt.
        </p>
        <p>
          This would work just as well for a study plan or reading goal or
          whatever.
        </p>
        <p>
          Honestly, I don't know if this is actually useful, but this is within
          the lens of myself.
        </p>
        <FormChatbotExample />

        <h3>Basic chatbot</h3>
        <p>
          Finally, if we must live with the vertical chatbot, there might as
          well be a table-of-contents so I can easily get back to old queries.
        </p>

        <Tabs className={styles.tabs}>
          <TabList className={styles.tabList}>
            <Tab>Example</Tab>
            <Tab>Try it out</Tab>
          </TabList>

          <TabPanel>
            <ChatbotExample useInitial />
          </TabPanel>
          <TabPanel>
            <ChatbotExample />
          </TabPanel>
        </Tabs>
      </div>
    </Slide>
  );
}
