import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { ModalWrapper } from './Styles';
import { Context as TodosContext, Provider as TodosProvider } from '../../context/todosContext';

const CreateTodoModal = (props) => {
  const { createTodo } = useContext(TodosContext);
  const [todo, settodo] = useState('');
  let myRef;
  useEffect(() => {
    document.addEventListener('click', closeTodoModal);
    return () => {
      document.removeEventListener('click', closeTodoModal);
    }
  }, []);

  const closeTodoModal = (e) => {
    if (myRef && !myRef.contains(e.target)) {
      props.closeModal();
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    settodo(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todo)
    if (todo) {
      await createTodo({ title: todo }, Cookies);
      props.closeModal();
    }
  }
  
  return (
    <ModalWrapper>
      <form ref={(node) => (myRef = node)}>
        <h4 className="text-center">Create Todo</h4>
        <div className="form-group">
          <input
            type="text"
            name="todo"
            className="form-control"
            placeholder="Enter new Todo"
            onChange={handleChange}
          />      
        </div>
        <button
          className="btn btn-primary float-right"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className="btn btn-danger float-right mr-1"
          onClick={closeTodoModal}
        >
          Cancel
        </button>
      </form>
    </ModalWrapper>
  );
};

export default CreateTodoModal;
