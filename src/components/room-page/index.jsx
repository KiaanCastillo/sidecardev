import { HeaderNav } from "./header-nav";
import { CodePanel } from "./code-panel";
import { ChatPanel } from "./chat-panel";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createDatabase, getDate, generateName } from "./databaseSetup"
import styles from "./style.module.scss";

export const RoomPage = () => {

  // Initialize firebase objects here
  const [database, setDatabase] = useState();
  const { id } = useParams();
  const [date, setDate] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    setDatabase(createDatabase());
    setDate(getDate());
    setUsername(generateName());
  }, [])

  return (database &&
    <div className={styles.roomPage}>
      <HeaderNav />
      <main>
        <ChatPanel database={database} id={id} date={date} username={username}/>
        <CodePanel database={database} id={id} date={date}/>
      </main>
    </div>
  );
};
