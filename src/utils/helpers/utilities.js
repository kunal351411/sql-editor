import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";


/** Function that adds line numbers to the editor before highlighting it with sql syntax
 * 
 * @param {*} input - the text to be highlighted 
 * @returns highlighted code according to sql syntax
 */
export const hightlightWithLineNumbers = (input) =>
  highlight(input, languages.sql)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");


/** Function to capitalize first letter of string
 * 
 * @param {*} str - the string to capitalize
 * @returns capitalized string
 */    
export const capitalizeString = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};


/** Function that gives column from the json data provided
 * 
 * @param {*} outputEntry - a json object
 * @returns - columns based on json data passed
 */
export const fetchOutputColumns = (outputEntry) => {
  return Object.keys(outputEntry);
};    
