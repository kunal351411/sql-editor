import { useState } from "react";
import TableForm from "../table-form/TableForm";
import './AddTable.css';

const AddTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-title">
        <div className={`accordion-text ${isOpen ? "open" : null}`}><h4>Add Table</h4></div>
        <div className="accordion-icon" 
            onClick={() => {
                setIsOpen(!isOpen);
        }}>
            <i className={`fa fa-angle-${isOpen ? "up" : "down"}`}></i>
        </div>
      </div>
      <div className={`accordion-content ${!isOpen ? 'no-form' : '' }`} >
        <TableForm openForm={setIsOpen} />
      </div>
    </div>
  )
}

export default AddTable
