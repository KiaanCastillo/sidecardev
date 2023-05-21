import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Button } from "../../button";
import { IconTidyUp, IconCopy, IconChevronDown } from "../../icon";
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

import { ref, onValue, set, update } from "firebase/database";

import styles from "./style.module.scss";

export const CodePanel = ({
  codeContent,
  setCodeContent,
  language,
  setLanguage,
  database,
  id,
  date,
}) => {
  // This sets the initial listener for the database code
  useEffect(() => {
    const databaseCodePath = ref(database, date + "/" + id + "/code/");
    // attach listener to the database path
    onValue(databaseCodePath, (snapshot) => {
      const data = snapshot.val();
      setCodeContent(data);
    });
  }, [database, date, id]);

  const onChangeCodeContent = async (ev) => {
    setCodeContent(ev);

    // Try to update if there is text there. If it doesn't work, replace
    try {
      update(ref(database, date + "/" + id + "/code/"), ev);
    } catch (error) {
      set(ref(database, date + "/" + id + "/code/"), ev);
    }
  };

  return (
    <div className={styles.codePanel}>
      <header className={styles.header}>
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
