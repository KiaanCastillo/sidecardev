import { useState, useEffect } from "react";
import { Button } from "../../button";
import { IconSparkle, IconCheck } from "../../icon";
import { ref, onValue, push } from "firebase/database";
import { getGPTResponse } from "./chatgptSetup";

import styles from "./style.module.scss";

const getIsMobileViewport = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return width <= 1156;
};

export const ChatPanel = ({
  database,
  id,
  date,
  username,
  codeContent,
  language,
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [chatGPTResponse, setChatGPTResponse] = useState();
  const isMobileViewport = getIsMobileViewport();

  const onType = (ev) => {
    setInputValue(ev.target.value);
  };

  const onClickSendToChat = () => {
    if (inputValue === "") {
      return;
    }

    // Try to update if there is text there. If it doesn't work, replace
    const message = { message: inputValue, username };
    push(ref(database, date + "/" + id + "/messages/"), message);
    setInputValue("");
  };

  const onClickSendToChatGPT = async () => {
    const response = await getGPTResponse(
      inputValue,
      codeContent,
      language,
      setChatGPTResponse
    );

    push(ref(database, date + "/" + id + "/messages/"), {
      message: inputValue,
      username,
    });
    push(ref(database, date + "/" + id + "/messages/"), {
      message: response,
      username: "ChatGPT",
      from: "ai",
    });
    setInputValue("");
  };

  // This sets the initial listener for the database code
  useEffect(() => {
    const databaseCodePath = ref(database, date + "/" + id + "/messages/");

    // attach listener to the database path
    onValue(databaseCodePath, (snapshot) => {
      const data = snapshot.val();

      let messages = [];
      snapshot.forEach((snap) => {
        const messageContent = snap.val().message;
        const messageAuthor = snap.val().username;

        if (username == messageAuthor) {
          messages.push({ content: messageContent, from: "me" });
        } else if (messageAuthor == "ChatGPT") {
          messages.push({
            content: messageContent,
            author: messageAuthor,
            from: "ai",
          });
        } else {
          messages.push({
            content: messageContent,
            author: messageAuthor,
            from: "other",
          });
        }
      });

      setMessages(messages);
    });
  }, []);

  return (
    <div className={styles.chatPanel}>
      <div className={styles.messageContainer}>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <MessageItem key={index} {...message} />
          ))}
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={inputValue}
          placeholder="Help me write a function to..."
          onChange={onType}
        />
        <div className={styles.sendActions}>
          <Button variant="secondary" onClick={onClickSendToChat}>
            <IconCheck />
            {!isMobileViewport && "Send Chat"}
          </Button>
          <Button onClick={onClickSendToChatGPT}>
            <IconSparkle />
            {!isMobileViewport && "Ask ChatGPT"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const MessageItem = ({ content, author, from }) => {
  return (
    <div className={`${styles.messageItem} ${styles[from]}`}>
      {author && <p className={styles.author}>{author}</p>}
      <div className={styles.content}>
        {from === "ai" && <IconSparkle />}
        <p className={styles.text}>{content}</p>
      </div>
    </div>
  );
};
