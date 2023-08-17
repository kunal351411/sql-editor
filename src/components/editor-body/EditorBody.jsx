import { useRecoilState } from "recoil";
import { selectedQueryState } from "../../state/atoms";
import Editor from "react-simple-code-editor";
import { hightlightWithLineNumbers } from "../../utils/helpers/helpers";
import "./EditorBody.css";

const EditorBody = () => {
  const [selectedQuery, setSelectedQuery] = useRecoilState(selectedQueryState);

  return (
    <Editor
      value={selectedQuery}
      onValueChange={(query) => setSelectedQuery(query)}
      highlight={(query) => hightlightWithLineNumbers(query)}
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 18,
        outline: 0,
      }}
    />
  );
};

export default EditorBody;
