import { HeaderNav } from "./header-nav";
import { CodePanel } from "./code-panel";
import { ChatPanel } from "./chat-panel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createDatabase, getDate, generateName } from "./databaseSetup";
import styles from "./style.module.scss";

const getIsMobileViewport = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return width <= 1156;
};

export const RoomPage = () => {
  // Initialize firebase objects here
  const [database, setDatabase] = useState();
  const { id } = useParams();
  const [date, setDate] = useState();
  const [username, setUsername] = useState();
  const [codeContent, setCodeContent] = useState("");
  // Default option is HTML before it loads. TODO change to find better option to do this
  const [language, setLanguage] = useState("HTML");
  const [showChat, setShowChat] = useState(true);
  const isMobileViewport = getIsMobileViewport();

  useEffect(() => {
    setDatabase(createDatabase());
    setDate(getDate());
    setUsername(generateName());
  }, []);

  return (
    database && (
      <div className={styles.roomPage}>
        <HeaderNav showChat={showChat} setShowChat={setShowChat} />
        <main>
          {showChat && (
            <ChatPanel
              database={database}
              id={id}
              date={date}
              username={username}
              codeContent={codeContent}
              setCodeContent={setCodeContent}
              language={language}
              setLanguage={setLanguage}
            />
          )}
          {(!isMobileViewport || (isMobileViewport && !showChat)) && (
            <CodePanel
              database={database}
              id={id}
              date={date}
              codeContent={codeContent}
              setCodeContent={setCodeContent}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </main>
      </div>
    )
  );
};
