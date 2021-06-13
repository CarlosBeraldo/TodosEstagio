import React, {useState, useEffect} from "react";
import Item from './Item';
import {v4 as uuidv4} from 'uuid';

function List(){
  
  const [itemList, setItemList] = useState(JSON.parse(localStorage.getItem('todosCarlos')) || []);

  const [label, setlabel] = useState('');

  const [count, setcount] = useState(0);

  useEffect(() => {
    setcount(itemList.reduce((result,itemTodo) => {
      return result + (itemTodo.done ? 0 : 1);
    }, 0))
  }, [itemList])
    
  //Function to add a item 
  function addItem(text){
    const id = uuidv4();
    const newItem = {id,done:false,label:text};
    const newList = [...itemList,newItem];
    setItemList(newList);
    localStorage.setItem('todosCarlos',JSON.stringify(newList));
  }

  function updateItem(item){
    const id = item.id ;
    const newList = itemList.map((itemtodo) => 
      itemtodo.id === id ? {...item} : itemtodo
    );
    setItemList(newList);
    localStorage.setItem('todosCarlos',JSON.stringify(newList));
  }
  function deleteItem(item){
    const id = item.id
    const newList = itemList.filter((itemtodo) =>
        itemtodo.id !==  id
    )
    setItemList(newList);
    localStorage.setItem('todosCarlos',JSON.stringify(newList));
  }

  function useEnter(e){
    if(e.key === "Enter")
    {
      e.preventDefault();
      addItem(e.target.value);
      setlabel('');
    }
  }
  function useOnChange(e){
    setlabel(e.target.value)
  }
  
  return(
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={useEnter}
          value={label}
          onChange={useOnChange}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {itemList.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          ))
            
          }
            
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a href='/'>All</a>
              
          </li>
          <li>
            <a href='/'>Active</a>
          </li>
          <li>
            <a href='/'>Completed</a>
          </li>
        </ul>
          <button className="clear-completed">
            Clear completed
          </button>
      </footer>
    </React.Fragment>
  )
}


export default List;