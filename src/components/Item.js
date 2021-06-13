import React from 'react'

function Item ({todo, updateItem, deleteItem}){
  
  function onChangeDone(){
    todo.done = !todo.done;
    updateItem(todo);    
    
  }

  function onClickDel(){
    deleteItem(todo);
  }

  return (
      <li className={`${todo.done ? "completed": ""}`}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={onChangeDone}
          autoFocus={true}
          checked={todo.done}
        />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onClickDel} />
      </div>
      </li>
  )
}

export default Item
