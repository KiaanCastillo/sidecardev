import { useState, useEffect } from "react";
import { Button } from "../../button";
import { IconSparkle, IconCheck } from "../../icon";
import { ref, onValue, set, update } from "firebase/database";

import styles from "./style.module.scss";

export const ChatPanel = ({ database, id, date, username }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState();

  const onType = (ev) => {
    setInputValue(ev.target.value);
  };

  const onClickSendToChat = async (ev) => {
    // Try to update if there is text there. If it doesn't work, replace
    console.log(ev.target.value);
    try {
      update(ref(database, date + "/" + id + "/messages/"), ev.target.value);
    } catch (error) {
      set(ref(database, date + "/" + id + "/messages/"), ev.target.value);
    }

    setInputValue("");
  };

  const onClickSendToChatGPT = (ev) => {
    console.log(inputValue);
  };

  // This sets the initial listener for the database code
  useEffect(() => {
    const databaseCodePath = ref(database, date + "/" + id + "/messages/");

    // attach listener to the database path
    onValue(databaseCodePath, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      // if (data.child){
      //   setCodeContent(data.code);
      // } else {
      //   setCodeContent("");
      // }
    });
  }, []);

  return (
    <div className={styles.chatPanel}>
      <div className={styles.messageContainer}>
        {console.log(messages)}
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
            Send Chat
          </Button>
          <Button onClick={onClickSendToChatGPT}>
            <IconSparkle />
            Ask ChatGPT
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
