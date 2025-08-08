import './tree-chatbot-example.globals.scss';
import styles from './tree-chatbot-example.module.scss';

import { MessageTreeNode, TreeChatbot } from 'ai-ui-components/TreeChatbot';
import cloneDeep from 'lodash-es/cloneDeep';
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources';
import { JSX, useState } from 'react';
import { treeChatbotInitial } from './initial';

interface Props {
  useInitial?: boolean;
}

export function TreeChatbotExample({ useInitial }: Props): JSX.Element {
  const [tree, setTree] = useState<MessageTreeNode | undefined>(() => {
    if (useInitial) {
      return treeChatbotInitial;
    }
  });

  const [activatedNode, setActivatedNode] = useState<
    MessageTreeNode | undefined
  >();

  return (
    <div className={styles.treeChatbotExample}>
      <div className={styles.treeChatbotContainer}>
        <TreeChatbot
          appearance="query-only"
          root={tree}
          expandMessageNode={setActivatedNode}
          sendMessage={async (nodes, userInput, nodeId) => {
            const messages = nodes
              .filter((node) => Boolean(node.message))
              .flatMap((node) => {
                return [
                  {
                    role: 'user',
                    content: node.message!.query,
                  } as ChatCompletionUserMessageParam,
                  {
                    role: 'system',
                    content: node.message!.answer,
                  } as ChatCompletionSystemMessageParam,
                ];
              })
              .concat({
                role: 'user',
                content: userInput,
              });

            const apiResponse = await fetch('/api/chatbot-ideas/chat', {
              method: 'POST',
              body: JSON.stringify({ messages }),
            });

            const stream = apiResponse.body!.getReader();

            let finalMessage = '';
            let streamDone = false;

            while (!streamDone) {
              const { done, value } = await stream.read();

              const decodedValue = new TextDecoder().decode(value);
              finalMessage += decodedValue;

              let treeVar = tree;

              const newNode: MessageTreeNode = {
                message: {
                  query: userInput,
                  answer: finalMessage,
                },
              };

              if (tree) {
                let searchNodes = [tree],
                  foundNode = tree;

                nodeId.forEach(({ position }) => {
                  foundNode = searchNodes[position]!;

                  searchNodes = foundNode.children!;
                });

                foundNode.children![foundNode.children!.length - 1] = newNode;
              } else {
                treeVar = newNode;
              }

              setActivatedNode(newNode);
              setTree(cloneDeep(treeVar));

              streamDone = done;
            }
          }}
        />
      </div>
      <div className={styles.treeChatbotAnswer}>
        {activatedNode && (
          <>
            <p>{activatedNode.message!.answer}</p>
          </>
        )}
      </div>
    </div>
  );
}
