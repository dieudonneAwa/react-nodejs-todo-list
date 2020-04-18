import React from 'react'

const CreateTask = ({ handleSubmit, handleChange }) => {
  return (
    <form>
      <div className="create-task justify-content-center">
        <input onChange={handleChange} type="text" name="task" placeholder="Enter new task" />
        <button onClick={handleSubmit}>Add</button>
      </div>
    </form>
  )
}

export default CreateTask
