import { HeaderNav } from "./header-nav";
import { CodePanel } from "./code-panel";
import { ChatPanel } from "./chat-panel";

import styles from "./style.module.scss";

export const RoomPage = () => {
  return (
    <div className={styles.roomPage}>
      <HeaderNav />
      <main>
        <ChatPanel />
        <CodePanel />
      </main>
    </div>
  );
};
