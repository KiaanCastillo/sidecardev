import { LogoBig } from "./logo-big";
import { IconSparkle, IconCheck } from "../icon";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.scss";
import { useState } from "react";

export const LandingPage = () => {
  const [codeInput, setCodeInput] = useState("");
  const navigate = useNavigate();

  const generateRandomNumber = () => {
    const min = 1000;
    const max = 9999;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onClickCreateRoom = () => {
    navigate(`/room/${generateRandomNumber()}`);
  };

  const onClickJoinRoom = () => {
    if (codeInput.trim() === "") {
      return;
    }
    navigate(`/room/${codeInput}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickJoinRoom();
    }
  };

  return (
    <div className={styles.landingPage}>
      <header>
        <LogoBig />
        <p>Code alongside friends, colleagues, and ChatGPT</p>
      </header>
      <div className={styles.actions}>
        <Button size="big" onClick={onClickCreateRoom}>
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
            onKeyDown={handleKeyDown}
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
