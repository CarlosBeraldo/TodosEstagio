import React, {useState, useEffect} from "react";
import Item from './Item';
import {v4 as uuidv4} from 'uuid';

function List(){
  
  const [itemList, setItemList] = useState(JSON.parse(localStorage.getItem('todosCarlos')) || []);

  const [label, setlabel] = useState('');

  const [count, setcount] = useState(0);

  const [check, setcheck] = useState(false);

  const [itemListDone, setitemListDone] = useState([]);

  const [itemListActive, setitemListActive] = useState([]);

  const [state, setState] = useState(1);

  function setStateOne(){
    setState(1);
  }

  function createListDone(){
    setitemListDone(itemList.filter((itemtodo) => 
      itemtodo.done && {...itemtodo}
    ));
    setState(2);
  }

  function createListActive(){
    setitemListActive(itemList.filter((itemtodo) => 
      !itemtodo.done && {...itemtodo}
    ));

    setState(3);
  }


  useEffect(() => {
    setcount(itemList.reduce((result,itemTodo) => {
      return result + (itemTodo.done ? 0 : 1);
    }, 0))
  }, [itemList])

  function addItem(text){
    const id = uuidv4();
    if(text !== ''){
      const newItem = {id,done:false,label:text.trim()};
      const newList = [...itemList,newItem];
      updateLocalStore(newList);
      setitemListActive([...itemListActive,newItem]);
    }
    
  }

  function updateItem(item){
    const id = item.id ;
    const newList = itemList.map((itemtodo) => 
      itemtodo.id === id ? {...item} : itemtodo
    );

    const newListDone = newList.filter((itemtodo) => 
    itemtodo.done && {...itemtodo}
    );

    const newListActive = newList.filter((itemtodo) => 
    !itemtodo.done && {...itemtodo}
    );

    setitemListActive(newListActive);
    setitemListDone(newListDone);
    updateLocalStore(newList);
  }

  function deleteItem(item){
    const id = item.id
    const newList = itemList.filter((itemtodo) =>
        itemtodo.id !==  id
    )
    updateLocalStore(newList);
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
    setlabel(e.target.value);
  }

  function updateLocalStore(newlist){
    setItemList(newlist);
    localStorage.setItem('todosCarlos',JSON.stringify(newlist));
  }

  function doneAll(){
    
    const newList = itemList.map((itemtodo) => {
      
      itemtodo.done = check ? false : true;
      return {...itemtodo}
    }      
    );

    const newListDone = newList.filter((itemtodo) => 
    itemtodo.done && {...itemtodo}
    );

    const newListActive = newList.filter((itemtodo) => 
    !itemtodo.done && {...itemtodo}
    );

    setitemListActive(newListActive);
    setitemListDone(newListDone);

    setcheck(!check);
    updateLocalStore(newList);
  }
  
  function clearCompleted(){
    const newList = itemList.filter((itemtodo) => 
      itemtodo.done === false && {...itemtodo} 
    );
    updateLocalStore(newList);
  }

  return(
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={useEnter}
          value={label}
          onChange={useOnChange}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          onChange={doneAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {
          state === 1 ? itemList.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          )) : state === 2 ? itemListDone.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          )) : itemListActive.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <p onClick={setStateOne}>All</p>              
          </li>
          <li>
            <p onClick={createListActive}>Active</p>
          </li>
          <li>
            <p onClick={createListDone}>Completed</p>
          </li>
        </ul>
          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
      </footer>
    </React.Fragment>
  )
}


export default List;