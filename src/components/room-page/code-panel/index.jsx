import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Button } from "../../button";
import { IconTidyUp, IconCopy, IconChevronDown } from "../../icon";
import axios from "axios";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-django";
import "ace-builds/src-noconflict/mode-typescript";

import firebaseConfig from "../databaseReads";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import styles from "./style.module.scss";

export const CodePanel = () => {
  const [codeContent, setCodeContent] = useState(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio</title>
      </head>

      <body>
        <main>
          <h1>StormHacks 2023</h>
          <p>Welcome to Sidecar.dev</p>  
        </main>
      </body>
    </html>
  `);
  const [language, setLanguage] = useState("javascript");

  // const [messageListener, setMessageListener] = useState("");

  // This sets the initial listener for the database code
  useEffect(() => {
    console.log(firebaseConfig);

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const lobbyID = "12345";
    const date = "2023-05-21";

    const refDB = ref(db, date + "/" + lobbyID + "/");

    return onValue(refDB, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        console.log(data);
        setCodeContent(data.code);
      }
    });

    // dbListenerGet();
  }, []);

  const onChangeCodeContent = async (ev) => {
    setCodeContent(ev);

    axios
      .post(
        `https://stormhacks2023-backend.onrender.com/firebase/databasePost?username=Kiaan&lobbyID=12345&postType=code`,
        { data: ev },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res));

    // const response = await fetch(
    //   `http://https://stormhacks2023-backend.onrender.com/firebase/databasePost?username=Kiaan&message=${codeContent}`
    // );
    // const jsonData = await response.json();
    // console.log(jsonData);
  };

  return (
    <div className={styles.codePanel}>
      <header className={styles.header}>
        <LanguageSelect setLanguage={setLanguage} />
        <div className={styles.actions}>
          <Button variant="tetriary">
            <IconCopy />
            Copy
          </Button>
          <Button variant="tetriary">
            <IconTidyUp />
            Tidy Up
          </Button>
        </div>
      </header>
      <AceEditor
        className={styles.editor}
        mode={language}
        theme="chaos"
        name="editor"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={codeContent}
        onChange={onChangeCodeContent}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

const LanguageSelect = ({ setLanguage }) => {
  return (
    <div className={styles.languageSelect}>
      <select
        onChange={(ev) => {
          ev.preventDefault();
          console.log(ev.target.value);
          setLanguage(ev.target.value);
        }}
      >
        <option value="html">HTML</option>
        <option value="xml">XML</option>
        <option value="css">CSS</option>
        <option value="sass">Sass</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="django">Django</option>
        <option value="java">Java</option>
        <option value="kotlin">Kotlin</option>
        <option value="c_cpp">C/C++</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
      </select>
      <IconChevronDown />
    </div>
  );
};
