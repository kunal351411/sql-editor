import { useState, useEffect } from "react";
import { FaAngleUp, FaAngleDown} from 'react-icons/fa';
import TableForm from "../table-form/TableForm";
import "./AddTable.css";

const AddTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(window.innerWidth < 768) 
      setIsOpen(true);
  }, []);

  return (
    <div className="accordion">
      <div className="accordion-title">
        <div className={`accordion-text ${isOpen ? "open" : null}`}>
          <h3>Add Table</h3>
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
              <TableForm openForm={setIsOpen} />
      </div>
    </div>
  );
};

export default AddTable;
