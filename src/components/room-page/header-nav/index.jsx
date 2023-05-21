import { Logo } from "./Logo";
import { Button } from "../../button";
import { IconLink, IconQRCode } from "../../icon";

import styles from "./styles.module.scss";

export const HeaderNav = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <UserAvatarList users={["Monica", "Ross", "Joey"]} />
      <div className={styles.actions}>
        <Button variant="secondary">
          <IconQRCode />
          Show QR Code
        </Button>
        <Button>
          <IconLink />
          Copy Link
        </Button>
      </div>
    </header>
  );
};

const UserAvatarList = ({ users = [] }) => {
  return (
    <div className={styles.userAvatarList}>
      {users.map((name, index) => (
        <div className={styles.avatar} key={index}>
          {name[0]}
        </div>
      ))}
    </div>
  );
};
