import { selector } from "recoil";
import { queryResultState } from "./atoms";

export const rowsCountState = selector({
  key: "rowsCountState",
  get: ({ get }) => {
    const queryResult = get(queryResultState);
    return queryResult.length;
  },
});
