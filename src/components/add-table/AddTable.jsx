import { useState, useEffect, lazy, Suspense } from "react";
import { FaAngleUp, FaAngleDown} from 'react-icons/fa';
import Loader from "../loader/Loader";
import "./AddTable.css";

const TableForm = lazy(() => import("../table-form/TableForm"));

const AddTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(window.innerWidth < 768) {
      setIsOpen(true)
    }
  }, []);

  return (
    <div className="accordion">
      <div className="accordion-title">
        <div className={`accordion-text ${isOpen ? "open" : null}`}>
          <h4>Add Table</h4>
        </div>
        <div
          className="accordion-icon"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <FaAngleUp/> : <FaAngleDown/>}
        </div>
      </div>
      <div className={`accordion-content ${!isOpen ? "no-form" : ""}`}>
        {
          isOpen && (
            <Suspense fallback={<Loader/>}>
              <TableForm openForm={setIsOpen} />
            </Suspense>
          )
        }
      </div>
    </div>
  );
};

export default AddTable;
