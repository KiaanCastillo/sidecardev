import { useState, useEffect } from "react";
import { Button } from "../../button";
import { IconSparkle, IconCheck } from "../../icon";
import { ref, onValue, push } from "firebase/database";

import styles from "./style.module.scss";

export const ChatPanel = ({ database, id, date, username }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState();

  const onType = (ev) => {
    setInputValue(ev.target.value);
  };

  const onClickSendToChat = (ev) => {
    // Try to update if there is text there. If it doesn't work, replace
    const message = {'message' : inputValue, 'username' : username};
    push(ref(database, date + "/" + id + "/messages/"), message);
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

      let messages = [];        
      snapshot.forEach(snap => {
          const messageContent = snap.val().message;
          const messageAuthor = snap.val().username;

          if (username == messageAuthor){
            messages.push({content : messageContent, from : "me"})
          } else if (messageAuthor == "ChatGPT"){
            messages.push({content : messageContent, author : messageAuthor, from : "ai"})
          } else {
            messages.push({content : messageContent, author : messageAuthor, from : "other"})
          }
        
      });

      setMessages(messages);

      // setMessages(messages.reverse()); 

    });
  }, []);

  return (
    <div className={styles.chatPanel}>
      <div className={styles.messageContainer}>
        {console.log(messages)}
        {messages.length > 0 &&
          messages.map((message, index) => {
            console.log(message)
            return <MessageItem key={index} {...message} />
          })
        }
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
  console.log({author})
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
