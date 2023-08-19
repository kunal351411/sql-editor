import toast from "react-hot-toast";

/**Function that fetches the table name from the query written by user
 *
 * @param query - The query written by user
 * @param savedTables - The tables available in the application
 * @returns - table that matches the query
 */
export const fetchTable = (query, savedTables) => {
  const tableName =
    query.split(" ")[
      query.split(" ").indexOf("FROM") + 1 ||
        query.split(" ").indexOf("from") + 1
    ];

  const [table] = savedTables.filter((table) => table.name === tableName);

  return table;
};

/** Function that saves the CSV data fetched from the table link to the local storage
 *
 * @param tableName - Name of the table whose csv data is fetched
 * @param csvData - CSV data to be saved
 */
const saveCsvInLocalStorage = (tableName, csvData) => {
  localStorage.setItem(tableName, csvData);
};

/** Function that gets CSV data from local storage based on the table name given
 *
 * @param tableName - table whose csv data is to be fetched
 * @returns - CSV data corresponding to the table
 */
const getCsvFromLocalStorage = (tableName) => {
  return localStorage.getItem(tableName);
};

/** Function to get CSV data either from local storage or the link provided
 *
 * @param table - table details
 * @returns CSV data corresponding to passed table
 */
export const getCsvData = async (table) => {
  if (table.name in localStorage) {
    console.log("Getting Data from Local storage");
    return getCsvFromLocalStorage(table.name);
  } else {
    try {
      const response = await fetch(table.link, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Couldn't fetch data");
      }

      const data = await response.json();
      const decodedData = decodeURIComponent(
        atob(data.content.replace("\n", ""))
      );
      saveCsvInLocalStorage(table.name, decodedData);
      console.log("Data stored in local storage");
      return decodedData;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  }
};

/** Function that uses alasql to run the user provided query
 *
 * @param query - query to be run
 * @returns - output of the query
 */
export const compileQueryOutput = async (query) => {
  try {
    const alasqlModule = await import("alasql");
    const outputData = await alasqlModule.default.promise(query);
    return outputData;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};