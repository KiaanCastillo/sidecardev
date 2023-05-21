import { LogoBig } from "./logo-big";
import { IconSparkle, IconCheck } from "../icon";
import { Button } from "../button";

import styles from "./style.module.scss";
import { useState } from "react";

export const LandingPage = () => {
  const [codeInput, setCodeInput] = useState("");

  const onClickJoinRoom = () => {
    // Navigate to the room with this code
  };

  return (
    <div className={styles.landingPage}>
      <header>
        <LogoBig />
        <p>Code alongside friends, colleagues, and ChatGPT</p>
      </header>
      <div className={styles.actions}>
        <Button size="big">
          <IconSparkle />
          Create Room
        </Button>
        <p>or</p>
        <div className={styles.joinRoomCodeInput}>
          <input
            type="text"
            placeholder="Enter code"
            value={codeInput}
            onChange={(ev) => setCodeInput(ev.target.value)}
          />
          <Button variant="secondary" onClick={onClickJoinRoom}>
            <IconCheck />
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};
