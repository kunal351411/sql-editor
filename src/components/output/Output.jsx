import { lazy, Suspense, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { FaDownload, FaThumbtack } from "react-icons/fa";
import toast from "react-hot-toast";
import { queryResultState } from "../../state/atoms";
import { rowsCountState } from "../../state/selectors";
import {
  capitalizeString,
  fetchOutputColumns,
} from "../../utils/helpers/utilities";
import Loader from "../loader/Loader";
import "./Output.css";

const Table = lazy(() => import("../table/Table"));
const CSVLink = lazy(() =>
  import("react-csv").then((module) => {
    return { default: module.CSVLink };
  })
);

const Output = () => {
  const resultData = useRecoilValue(queryResultState);
  const rowsCount = useRecoilValue(rowsCountState);

  const getHeaders = useMemo(() => {
    if (resultData.length) {
      return fetchOutputColumns(resultData[0]).map((column) => ({
        label: capitalizeString(column),
        key: column,
      }));
    }
    return [];
  }, [resultData]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="output-header">
          <div className="section-header">
            <h2>Output</h2>
          </div>

          {resultData.length > 0 && (
            <div className="btn-container">
              <div className="row-count">
                <h5>{`Fetched ${rowsCount} records in 0.3 s`}</h5>
              </div>
              <CSVLink
                data={resultData}
                filename={"result.csv"}
                headers={getHeaders}
                onClick={() => toast.success("CSV exported successfully")}
              >
                <div className="btn">
                  <button type="button" className="export">
                    Export&emsp;
                    <FaDownload />
                  </button>
                </div>
              </CSVLink>
            </div>
          )}
        </div>
        <div className="table-container">
          {!resultData.length ? (
            <div style={{color: '#475460', fontWeight: 600}} className="no-result">
              <h3>
                <FaThumbtack />
                &emsp;
                Output will be displayed here!!!
              </h3>
            </div>
          ) : (
            <Table />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default Output;
