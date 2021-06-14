import React,{useState} from 'react'

function Item ({todo, updateItem, deleteItem}){

  const [edit, setEdit] = useState(false)
  const [label, setLabel] = useState('')

  function onChangeDone(){
    todo.done = !todo.done;
    updateItem(todo);       
  }

  function onChangeText(e){
    setLabel(e.target.value);
  }

  function onClickDel(){
    deleteItem(todo);
  }

  function onDoubleClick(){
    setEdit(!edit);
  }

  function  useEnter(e){
    
    if(e.key === "Enter"){  
      e.preventDefault();
      if(e.target.value !== ''){
        todo.label = label;      
        updateItem(todo);
        setEdit(false);
        setLabel('');
      }
      else{ 
        deleteItem(todo);
        setEdit(false);
      }
    }
    if(e.key ==="Escape"){
      e.preventDefault();
      setEdit(false);
      setLabel('');
    }
  }

  return (
      <li className={`${todo.done ? "completed": ""} ${edit ? "editing" :""}`}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={onChangeDone}
          autoFocus={true}
          checked={todo.done}          
        />
        <label onDoubleClick={onDoubleClick}>{todo.label}</label>
        <button className="destroy" onClick={onClickDel} />
      </div>
      <input className='edit' onKeyDown={useEnter} defaultValue={todo.label} onChange={onChangeText}/>
      </li>
  )
}

export default Item
