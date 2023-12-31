import { memo, useMemo } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import "./ListItem.css";
import {
  savedTablesState,
  savedQueriesState,
  queryHistoryState,
  selectedQueryState,
} from "../../state/atoms";
import { capitalizeString } from "../../utils/helpers/utilities";

const ListItem = ({ type, text, id, link = "" }) => {
  let savedState;
  if (type === "table") savedState = savedTablesState;
  else if (type === "query") savedState = savedQueriesState;
  else savedState = queryHistoryState;

  const setState = useSetRecoilState(savedState);
  const [selectedQuery, setSelectedQuery] = useRecoilState(selectedQueryState);

  const deleteItem = () => {
    setState((prevState) => {
      return prevState.filter((_, index) => {
        return index !== id;
      });
    });
    toast.success(`${capitalizeString(type)} deleted successfully!!`);
  }

  const selectQuery = () => {
    setSelectedQuery(text);
    toast.success(`Query copied to editor`);
  }

  const renderedListItem = useMemo(() => (
    <div className="container">
      <div
        className="list-text"
        onClick={
          type !== 'table' && selectedQuery !== text ? selectQuery : null
        }
      >
        {type === 'table' ? (
          <a href={link} target="_blank" rel="noreferrer">
            {text}
          </a>
        ) : (
          text
        )}
      </div>
      <div className="delete-icon" onClick={deleteItem}>
        <FaTrash/>
      </div>
    </div>
  ), [type, text, id, link, selectedQuery]);

  return renderedListItem;
};

export default memo(ListItem);
