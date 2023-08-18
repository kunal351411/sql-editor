import alasql from 'alasql';
import toast from 'react-hot-toast';
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";

export const hightlightWithLineNumbers = (input) =>
  highlight(input, languages.sql)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");


export const fetchTable = (query, savedTables) => {
  const tableName =
    query.split(" ")[
      query.split(" ").indexOf("FROM") + 1 ||
        query.split(" ").indexOf("from") + 1
    ];

  const [table] = savedTables.filter((table) => table.name === tableName);

  return table;
};

const saveCsvInLocalStorage = (tableName, csvData) => {
  localStorage.setItem(tableName, csvData);
}

const getCsvFromLocalStorage = (tableName) => {
  return localStorage.getItem(tableName)
}

export const getCsvData = (table) => {

  if(table.name in localStorage) {
    console.log("Getting Data from Local storage");
    return getCsvFromLocalStorage(table.name);
  }

  else {
    const csvData = fetch(table.link, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Couldn't fetch data");
        }
      })
      .then((data) => {
        const decodedData = decodeURIComponent(atob(data.content.replace("\n", "")));
        saveCsvInLocalStorage(table.name, decodedData);
        console.log("Data stored in local storage");
        return decodedData;
      })
      .catch((e) => {
        toast.error(e.message);
        return null;
      });
      return csvData;
  }
}

export const compileQueryOutput = (query) => {
  
  const outputData = alasql
    .promise(query)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      toast.error(e.message);
      return null;
    });
  return outputData;
}

export const capitalizeString = (str) => {
  return str[0].toUpperCase() + str.slice(1);
}

export const fetchOutputColumns = (outputEntry) => {
  return Object.keys(outputEntry);
}

export const getTableRowsFromOutput = (output) => {
  const columns = fetchOutputColumns(output[0]);

  return output.map((row, i) => {
    return (
      <tr key={i}>
        {columns.map((column, i) => {
          return <td key={i} >{row[column]}</td>;
        })}
      </tr>
    );
  });
};

export const getTableHeadFromOutput = (output) => {
  const columns = fetchOutputColumns(output[0]);
  return (
    <tr>
      {columns.map((column, i) => {
        return <th key={i} >{capitalizeString(column)}</th>;
      })}
    </tr>
  );
};