import { capitalizeString, fetchOutputColumns } from "./utilities";

/** Function that creates table rows based on the json data
 * 
 * @param {*} output - json data to be displayed as table
 * @returns - table row
 */
export const getTableRowsFromOutput = (output) => {
  const columns = fetchOutputColumns(output[0]);

  return output.map((row, i) => {
    return (
      <tr key={i}>
        {columns.map((column, i) => {
          return <td key={i}>{row[column]}</td>;
        })}
      </tr>
    );
  });
};


/** Function that gives table head columns from json data
 * 
 * @param {*} output - json data to be displayed as table
 * @returns - table head column
 */
export const getTableHeadFromOutput = (output) => {
  const columns = fetchOutputColumns(output[0]);
  return (
    <tr>
      {columns.map((column, i) => {
        return <th key={i}>{capitalizeString(column)}</th>;
      })}
    </tr>
  );
};
