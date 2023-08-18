import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import{ FaEraser, FaRocket} from 'react-icons/fa';
import {
  savedQueriesState,
  queryHistoryState,
  selectedQueryState,
  savedTablesState,
  queryResultState,
} from "../../state/atoms";
import {
  fetchTable,
  getCsvData,
  compileQueryOutput,
} from "../../utils/helpers/helpers";
import EditorBody from "../editor-body/EditorBody";
import "./Editor.css";

const Editor = () => {
  const [selectedQuery, setSelectedQuery] = useRecoilState(selectedQueryState);
  const setSavedQueriesState = useSetRecoilState(savedQueriesState);
  const setQueryHistoryState = useSetRecoilState(queryHistoryState);
  const setQueryResult = useSetRecoilState(queryResultState);
  const savedTables = useRecoilValue(savedTablesState);

  const saveQuery = (newQuery) => {
    setSavedQueriesState((prevState) => {
      const isQueryAlreadyPresent = prevState.some(
        (query) => query.name === selectedQuery,
      );
      if (isQueryAlreadyPresent) {
        toast.error("Query already exists");
        return [...prevState];
      } else {
        toast.success("Query saved successfully");
        return [...prevState, newQuery];
      }
    });
  };

  const runQuery = async (save = false) => {
    const newQuery = {
      name: selectedQuery.trim(),
    };
    if(!(newQuery.name.toLowerCase().includes("from"))) {
      toast.error("Invalid query");
      return;
    }
    if (save) {
      saveQuery(newQuery);
    }
    const table = fetchTable(newQuery.name, savedTables);
    if (table) {
      const csvData = await getCsvData(table);
      if (csvData) {
        console.log(csvData);
        const outputData = await compileQueryOutput(
          newQuery.name.replace(
            table.name,
            `CSV("${csvData}", {header: true, separator:','})`,
          ),
        );
        if (outputData) {
          console.log(outputData);
          toast.success("Query ran successfully");
          setQueryResult(outputData);
        } else {
          toast.error("Your query is invalid");
          setQueryResult([]);
        }
      } else {
        toast.error("CSV Link not working");
        setQueryResult([]);
      }
    } else {
      toast.error("Table mentioned in query not available");
      setQueryResult([]);
    }

    setQueryHistoryState((prevState) => [...prevState, newQuery]);
  };

  return (
    <>
      <div className="editor-header">
        <label for="codeArea">
          <div className="section-header">
            <h3>Editor</h3>
          </div>
        </label>
        <div className="btn-container">
          <div className="btn">
            <button
              type="button"
              className="save-run"
              disabled={selectedQuery === ""}
              onClick={() => runQuery(true)}
            >
              Save & Run
            </button>
          </div>
          <div className="btn">
            <button
              type="button"
              className="run"
              disabled={selectedQuery === ""}
              onClick={() => runQuery(false)}
            >
              Run&emsp;<FaRocket/>
            </button>
          </div>
          <div className="btn">
            <button
              type="button"
              className="clear"
              disabled={selectedQuery === ""}
              onClick={() => setSelectedQuery("")}
            >
              <FaEraser/>&emsp;Clear
            </button>
          </div>
        </div>
      </div>
      <div className="editor-body">
        <EditorBody />
      </div>
    </>
  );
};

export default Editor;
