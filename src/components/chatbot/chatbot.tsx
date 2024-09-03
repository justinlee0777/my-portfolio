import { ChatCompletionMessageParam } from 'openai/resources';
import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { MdOutlineClose } from 'react-icons/md';
import styles from './chatbot.module.scss';

interface Props {
  messages: Array<ChatCompletionMessageParam>;

  disabled?: boolean;
  headerContent?: ReactNode;
  messageActions?: Array<
    (message: ChatCompletionMessageParam, index: number) => ReactNode
  >;
  hideInput?: boolean;

  onSubmit?: (query: string) => void;
}

interface SidebarConfig {
  header: string;
  content: ReactNode;
}

export interface ChatbotRef {
  scrollDown: () => void;
  openSidebar: (sidebarConfig: SidebarConfig) => void;
}

export default forwardRef(function Chatbot(
  {
    messages,
    disabled,
    headerContent,
    messageActions,
    hideInput,
    onSubmit,
  }: Props,
  ref: ForwardedRef<ChatbotRef>
): JSX.Element {
  const messagesRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');

  const [sidebarConfig, setSidebarConfig] = useState<SidebarConfig | null>(
    null
  );

  useImperativeHandle(ref, () => ({
    scrollDown: () =>
      messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight),
    openSidebar: (config) => {
      setSidebarConfig(config);
    },
  }));

  return (
    <div className={styles.chatbot}>
      {sidebarConfig && (
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>{sidebarConfig.header}</h3>
            <button
              className={styles.closeSidebar}
              onClick={() => setSidebarConfig(null)}
            >
              <MdOutlineClose />
            </button>
          </div>
          <div className={styles.sidebarContent}>{sidebarConfig.content}</div>
        </div>
      )}
      <div className={styles.formContent}>
        {headerContent}
        <div className={styles.messages} ref={messagesRef}>
          {messages.map((message, i) => (
            <div key={i} className={styles[`message_${message.role}`]}>
              {message.content as string}
              <div className={styles['message_actions']}>
                {messageActions?.map((renderer) => renderer(message, i))}
              </div>
            </div>
          ))}
        </div>
        {!hideInput && (
          <form
            className={styles.inputRow}
            onSubmit={async (event) => {
              event.preventDefault();

              onSubmit?.(inputValue);

              setInputValue('');
            }}
          >
            <input
              className={styles.input}
              value={inputValue}
              disabled={disabled}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit" disabled={disabled}>
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
});
