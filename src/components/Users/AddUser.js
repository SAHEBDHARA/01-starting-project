import React, { useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {

  const enteredNameInput =  useRef()
  const enteredAgeInpute =  useRef()
  const enteredCallageInpute =  useRef()


  const [error, setError] = useState();

  const addUserHandler = (event) => {
    const enteredName = enteredNameInput.current.value;
    const enteredUserAge = enteredAgeInpute.current.value;
    const enteredCollageName = enteredCallageInpute.current.value

    event.preventDefault();
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge, enteredCollageName);
    enteredNameInput.current.value = ''
    enteredAgeInpute.current.value = ''
    enteredCallageInpute.current.value = ''
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            
            ref={enteredNameInput}
          />
          <label htmlFor="callagename">Callage Name</label>
          <input
            id="callagename"
            type="text"
            
            ref={enteredCallageInpute}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
           
            ref={enteredAgeInpute}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
