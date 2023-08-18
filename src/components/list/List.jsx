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

  return (
    <>
      <div>
        {savedList.length > 0 ? (
          savedList.map((entity, index) => {
            return (
              <ListItem
                key={index}
                text={entity.name}
                link={type === "table" && entity.link}
                id={index}
                type={type}
              />
            );
          })
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

export default List;
