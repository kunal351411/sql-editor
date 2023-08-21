import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { savedTablesState } from '../../state/atoms';
import toast from 'react-hot-toast';
import './TableForm.css';

const TableForm = ({openForm}) => {
    const [ formData, setFormData ] = useState({
        name: '',
        link: ''
    });
    const [ isLinkCorrect, setIsLinkCorrect ] = useState(null);

    const setSavedTablesState = useSetRecoilState(savedTablesState);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(name === 'link')
        {
            if(/^(https?:\/\/)?api\.github\.com\/.*$/.test(value))
                setIsLinkCorrect(true);
            else
                setIsLinkCorrect(false);
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTable = {
            name: formData.name.trim().toUpperCase(),
            link: formData.link.trim()
        }
        
        setSavedTablesState((prevState) => {
            const alreadyExists = prevState.some(table => table.name === newTable.name);

            if(alreadyExists) {
                toast.error(`Table ${newTable.name} already exists`);
                return [...prevState];
            }
            else {      
                setFormData({
                    name: '',
                    link: ''
                });
                setIsLinkCorrect(null);
                if(window.innerWidth > 768)
                    openForm(false);
                toast.success(`Table created`);
                return [...prevState, newTable];
            }
        })
    }

  return (
    <div className='form-container' onSubmit={handleSubmit}>
      <form>
        <div className='form-group'>
            <label className='required'>Table Name</label>
            <input name="name" value={formData.name} onChange={handleInputChange} type='text' className='form-control' placeholder='Table Name' required/>
        </div>
        <div className='form-group'>
            <label className='required'>CSV Link</label>
            <input name="link" value={formData.link} onChange={handleInputChange} type='text' className='form-control'  placeholder='CSV Link' required/>
            <span className={isLinkCorrect !== null ? (isLinkCorrect ? 'correct' : 'incorrect') : null}>{isLinkCorrect !== null && (isLinkCorrect ? 'o.k.' : 'x')}</span>
        </div>
        <div className='btn'>
            <button disabled={formData.name === '' || !isLinkCorrect} className='submit' type='submit'>Add&emsp;+</button>
        </div>
      </form>
    </div>
  )
}

export default TableForm
