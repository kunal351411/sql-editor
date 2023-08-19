import { useRecoilValue } from "recoil";
import { queryResultState } from "../../state/atoms";
import {
  getTableHeadFromOutput,
  getTableRowsFromOutput,
} from "../../utils/helpers/outputTableFunctions";
import "./Table.css";

const Table = () => {
  const queryResult = useRecoilValue(queryResultState);

  return (
    <div className="output-table">
      {queryResult.length > 0 && (
        <table>
          <thead className="header">
            {getTableHeadFromOutput(queryResult)}
          </thead>
          <tbody className="row">{getTableRowsFromOutput(queryResult)}</tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
