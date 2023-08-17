import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { queryResultState } from "../../state/atoms";
import { rowsCountState } from "../../state/selectors";
import { CSVLink } from "react-csv";
import {
  capitalizeString,
  fetchOutputColumns,
} from "../../utils/helpers/helpers";
import Table from "../table/Table";
import "./Output.css";

const Output = () => {
  const resultData = useRecoilValue(queryResultState);
  const rowsCount = useRecoilValue(rowsCountState);

  const getHeaders = () => {
    if (resultData.length)
      return fetchOutputColumns(resultData[0]).map((column) => ({
        label: capitalizeString(column),
        key: column,
      }));
  };

  return (
    <>
      <div className="output-header">
        <div className="section-header">
          <h3>Output</h3>
        </div>
        {resultData.length > 0 && (
          <div className="btn-container">
            <div className="row-count">
              <h5>{`Fetched ${rowsCount} records in 0.3 s`}</h5>
            </div>
            <CSVLink
              data={resultData}
              filename={"result.csv"}
              headers={getHeaders()}
              onClick={() => toast.success("CSV exported successfully")}
            >
              <div className="btn">
                <button type="button" className="export">
                  Export&emsp;<i className="fa fa-download"></i>
                </button>
              </div>
            </CSVLink>
          </div>
        )}
      </div>
      <div className="table-container">
        {!resultData.length ? (
          <div className="no-result">
            <h3>
              <i className="fa fa-warning"></i>&emsp;
              {`Run Some Query to See Output !!!`}
            </h3>
          </div>
        ) : (
          <Table />
        )}
      </div>
    </>
  );
};

export default Output;
