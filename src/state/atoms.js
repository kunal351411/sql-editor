import { atom } from "recoil";

export const savedTablesState = atom({
  key: "savedTablesState",
  default: [],
});

export const savedQueriesState = atom({
  key: "savedQueriesState",
  default: [],
});

export const queryHistoryState = atom({
  key: "queryHistoryState",
  default: [],
});

export const selectedQueryState = atom({
  key: "selectedQueryState",
  default: "",
});

export const queryResultState = atom({
  key: "queryResultState",
  default: [],
});
