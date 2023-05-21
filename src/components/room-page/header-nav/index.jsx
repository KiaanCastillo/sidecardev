import { Logo } from "./Logo";
import { Button } from "../../button";
import { IconLink } from "../../icon";

import styles from "./styles.module.scss";
console.log(styles);

export const HeaderNav = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <UserAvatarList users={["Monica", "Ross", "Joey"]} />
      <Button>
        <IconLink />
        Copy Link
      </Button>
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
