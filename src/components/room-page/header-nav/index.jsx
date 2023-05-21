import { Logo } from "./Logo";
import { Button } from "../../button";
import { IconLink, IconQRCode, IconMenu, IconSparkle } from "../../icon";
import { ChatGPTUserIcon } from "./chat-gpt-user-icon";
import { useParams, Link } from "react-router-dom";
import { QRCodeExample } from "./qr-code-example";

import styles from "./styles.module.scss";
import { useState } from "react";

export const HeaderNav = ({ showChat, setShowChat }) => {
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const { id } = useParams();

  const onClickCopyCode = () => navigator.clipboard.writeText(id);

  const onClickToggleChat = () => setShowChat(!showChat);

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <Logo />
        </Link>
        <label className={styles.menuIcon} htmlFor="menuIconCheckbox">
          <IconMenu />
        </label>
        <input type="checkbox" id="menuIconCheckbox" />
        <div className={styles.actions}>
          <UserAvatarList users={["Frodo", "Sam"]} />
          <Button variant="tetriary" onClick={() => setShowQRCodeModal(true)}>
            <IconQRCode />
            Show QR Code
          </Button>
          <Button variant="tetriary" onClick={onClickCopyCode}>
            <IconLink />
            Copy Room Code
          </Button>
          <Button onClick={onClickToggleChat} className={styles.toggleChatBtn}>
            <IconSparkle />
            Toggle Chat
          </Button>
        </div>
      </header>
      {showQRCodeModal && (
        <QRCodeModal setShowQRCodeModal={setShowQRCodeModal} />
      )}
    </>
  );
};

const UserAvatarList = ({ users = [] }) => {
  const [currentUserToolTip, setCurrentUserToolTip] = useState("");

  return (
    <div className={styles.userAvatarList}>
      {users.map((name, index) => (
        <div
          className={styles.avatarContainer}
          key={index}
          onMouseEnter={() => setCurrentUserToolTip(name)}
          onMouseLeave={() => setCurrentUserToolTip("")}
        >
          <div className={styles.avatar}>{name[0]}</div>
          <span
            className={`${styles.toolTip} ${
              currentUserToolTip === name ? styles.showToolTip : ""
            }`}
          >
            {name}
          </span>
        </div>
      ))}
      <ChatGPTUserAvatar />
    </div>
  );
};

const ChatGPTUserAvatar = () => {
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div
      className={styles.avatarContainer}
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <div className={styles.chatGptUserAvatar}>
        <ChatGPTUserIcon />
        <span
          className={`${styles.toolTip} ${
            showToolTip ? styles.showToolTip : ""
          }`}
        >
          ChatGPT
        </span>
      </div>
    </div>
  );
};

const QRCodeModal = ({ setShowQRCodeModal }) => {
  return (
    <div
      className={styles.qrCodeModal}
      onClick={() => setShowQRCodeModal(false)}
    >
      <div className={styles.content}>
        <h1>Scan the QR code to join the room</h1>
        <QRCodeExample />
      </div>
    </div>
  );
};
