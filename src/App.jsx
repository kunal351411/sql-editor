import React, { useEffect, lazy, Suspense } from "react";
import { useSetRecoilState } from "recoil";
import Header from "./components/header/Header";
import List from "./components/list/List";
import AddTable from "./components/add-table/AddTable";
import Editor from "./components/editor/Editor";
import Output from "./components/output/Output";
import Loader from "./components/loader/Loader";
import { savedQueriesState, savedTablesState } from "./state/atoms";
import { savedQueries, savedTables } from "./utils/constants/constants";
import "./App.css";

const ToastNotification = lazy(() => import('./components/toast-notification/ToastNotification'))

export const App = () => {
  const setSavedTablesState = useSetRecoilState(savedTablesState);
  const setSavedQueriesState = useSetRecoilState(savedQueriesState);

  useEffect(() => {
    setSavedTablesState(savedTables);
    setSavedQueriesState(savedQueries);
  }, [setSavedQueriesState, setSavedTablesState]);

  return (
    <>
      <Suspense fallback={<Loader/>}>
        <ToastNotification />
      </Suspense>
      <Header />
      <div className="main-container">
        <div className="section left">
        <div className="saved-tables">
          <div className="section-header">
            <h3>Saved Tables</h3>
          </div>
          <div className="list">
            <List type="table" />
          </div>
        </div>
        <div className="add-table">
          <AddTable />
        </div>
      </div>
      <div className="section middle">
        <div className="editor-container">
          <Editor />
        </div>
        <div className="output-container">
          <Output />
        </div>
      </div>
      <div className="section right">
        <div className="query">
          <div className="section-header">
            <h3>Saved Queries</h3>
          </div>
          <div className="list">
            <List type="query" />
          </div>
        </div>
        <div className="history">
          <div className="section-header">
            <h3>History</h3>
          </div>
          <div className="list">
            <List type="history" />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
