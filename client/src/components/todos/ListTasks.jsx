import React from 'react';
import { Tick } from './Styles';

const ListTasks = ({ handleDone, todo }) => {
  if (todo?.todoItems) {
    return (
      <>
        {todo.todoItems.map((task) => (
          <li className="list-group-item">
            {task.text}
            {task.isCompleted ? <div className="float-right">
              <Tick />
            </div> : (
              <div className="float-right">
                <button onClick={() => handleDone(task)}>Done</button>
              </div>
            )}
          </li>
        ))}
      </>
    )
  }
  return null;
}

export default ListTasks;
