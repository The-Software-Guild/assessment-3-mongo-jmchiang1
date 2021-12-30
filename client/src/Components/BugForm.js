import React, { useState, useContext, useEffect } from 'react';
import BugContext from '../context/bug/bugContext';
import './CSS Styling/BugForm.css'

const BugForm = () => {
  const bugContext = useContext(BugContext);
  const { addBug, current, updateBug } = bugContext;

  useEffect(() => {
    if (current !== null) { //if current has no data, set bug to new data
      setBug(current);
    } else {  //else clear bug data back to empty string
      setBug({
        name: '',
        description: '',
      });
    }
  }, [bugContext, current]);  //fire everytime bugContext and curent changes state

  const [bug, setBug] = useState({  //initialize bug object to empty strings
    name: '',
    description: '',
  });

  const { name, description } = bug;

  const onChange = (e) => setBug({ ...bug, [e.target.name]: e.target.value });
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) { //if form has no data inside, add bug
      addBug(bug);
    } else {  //else update it and clear bug state
      updateBug(bug)
      setBug({
        name: "",
        description: ""
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="bug-form">
      {/* if current is not empty, means there is bug data inside */}
      <h2>{current ? 'Edit Bug' : 'Add New Bug'}</h2>

      {/* Name */}
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      {/* Description */}
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      ></input>
      {/* Submit Button */}
      <div>
        <button
          type='submit'
          // {current ? 'Update Bug' : 'Add Bug'}
        >{current ? 'Update Bug' : 'Add Bug'}</button>
      </div>
    </form>
  );
};

export default BugForm;
