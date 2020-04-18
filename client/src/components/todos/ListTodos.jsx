import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import Layout from '../layouts/Layout';
import { TodoList } from './Styles';
import CreateTodoModal from './CreateTodoModal';
import { Context as TodosContext, Provider as TodosProvider } from '../../context/todosContext';
import RenderTodos from './RenderTodos';


const ListTodos = () => {
  const { state, fetchTodos } = useContext(TodosContext);
  const [showModal, setshowModal] = useState(false);
  const [todoId, setTodoId] = useState(null)

  useEffect(() => {
    (async () => {
      await fetchTodos(Cookies);
    })();
  }, []);

  const handleShowModal = () => {
    setshowModal(true);
  }

  const handleCloseModal = () => {
    setshowModal(false);
  }

  const handleAddTask = (todo) => {
    // setshowAddTaskInput(true);
    setTodoId(todo.id);
  }
  
  return (
    <Layout>
      <TodoList>
        {showModal && <CreateTodoModal closeModal={handleCloseModal} />}
        <div className="container">
          <div className="row">
            <div className="col-md-12 header text-center mt-3">
              <h1>My Todos</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-primary float-right" onClick={handleShowModal}>New</button>
            </div>
          </div>
          <RenderTodos
            handleAddTask={handleAddTask}
            todoId={todoId}
          />
        </div>
      </TodoList>
    </Layout>
  )
}

export default () => {
  return (
    <TodosProvider>
      <ListTodos />
    </TodosProvider>
  )
};
