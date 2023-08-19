import { memo, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { FaBan } from "react-icons/fa";
import ListItem from "../list-item/ListItem";
import {
  savedTablesState,
  savedQueriesState,
  queryHistoryState,
} from "../../state/atoms";

const List = ({ type }) => {
  let savedState;
  if (type === "table") savedState = savedTablesState;
  else if (type === "query") savedState = savedQueriesState;
  else savedState = queryHistoryState;

  const savedList = useRecoilValue(savedState);

  const renderedList = useMemo(() => {
    return savedList.map((entity, index) => (
      <ListItem
        key={index}
        text={entity.name}
        link={type === 'table' && entity.link}
        id={index}
        type={type}
      />
    ));
  }, [savedList, type]);

  return (
    <>
      <div>
        {savedList.length > 0 ? (
          renderedList  
            ) : (
          <div className="no-result">
            <h3>
              <FaBan/>&emsp;
              {`No ${type[0].toUpperCase() + type.slice(1)} Available`}
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(List);
