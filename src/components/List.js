import React, {useState, useEffect} from "react";
import Item from './Item';
//Importação do UUID para gerar um ID Diferente em cada item adicionado
import {v4 as uuidv4} from 'uuid';

function List(){
  //Criação das constantes com estados para que seja feita a alteração. utilizando o hook useState

  /*Lista principal onde será armazenada o que estiver no localStorage
   *Se nada estiver adicionado inicia uma lista vazia
  */
  const [itemList, setItemList] = useState(JSON.parse(localStorage.getItem('todosCarlos')) || []);
  
  //Constante de label utilizada para saber se usuario ja digitou algo
  //Caso nulo é exibido o placeholder
  const [label, setLabel] = useState('');
  
  //Constante para verificar a quantidade de items ativos
  const [count, setCount] = useState(0);
  
  //Identifica se o botao de marcar ToDos como done foi precionado
  const [check, setCheck] = useState(false);
  
  //Listas auxiliares para exibir e alterar as listas de ToDo concluido ou ativos
  const [itemListDone, setItemListDone] = useState([]);
  const [itemListActive, setItemListActive] = useState([]);
  
  //Identifica qual lista será exibida
  //1 para exibir ToDos dones e actives
  //2 para exibir apenas os concluidos
  //3 para exibir apenas os ativos
  const [state, setState] = useState(1);

  const [checkAllDone, setCheckAllDone] = useState(false);

  //Função responsavel para tornar o STATE como 1 
  //É acionada quando clique em "All"
  function setStateOne(){
    setState(1);
  }

  /*Função responsavel para tornar o STATE como 2 e criar/atualizar lista de concluidos
  * É acionada quando clique em "Completed"
  */
  function createListDone(){
    //filta a lista principal armazenando apenas items concluidos
    setItemListDone(itemList.filter((itemtodo) => 
      itemtodo.done && {...itemtodo}
    ));
    //torna STATE para 2
    setState(2);
  }

  /*Função responsavel para tornar o STATE como 3 e criar/atualizar lista de ativos
  * É acionada quando clique em "Active"
  */
  function createListActive(){
    //filta a lista principal armazenando apenas items ativos
    setItemListActive(itemList.filter((itemtodo) => 
      !itemtodo.done && {...itemtodo}
    ));
    //torna STATE para 3
    setState(3);
  }

  /*Utilização do hook useEffect onde ele executa a função do primeiro parametro
  * apenas quando o segundo parametro é alterado

  * Primeiro parametro: uma função que altera a constante "count" 
  * reduce na lista principal. reduce((valorInicial,itemDaLista),0) valor inicial é iniciada em 0 pela passagem de parametro
  * 
  * Segundo parametro: lista de item principal "itemList"
  */

  useEffect(() => {
    /*aplicando o reduce na lista principal e atualiza o contador "count". 
    * reduce(função,0) 
    * valor inicial é iniciada em 0 pela passagem de parametro 
    */
    setCount(itemList.reduce((result,itemTodo) => {
      return result + (itemTodo.done ? 0 : 1);
    }, 0))

    //cria uma nova lista de concluidos filtrando a nova lista criada, filtrando o done do item se verdadeiro
    const newListDone = itemList.filter((itemtodo) => 
    itemtodo.done
    );

    //cria uma nova lista de activos filtrando a nova lista criada, filtrando o done do item se falso
    const newListActive = itemList.filter((itemtodo) => 
    !itemtodo.done
    );

    //Atualiza a lista de ativos com a nova lista de ativos
    setItemListActive(newListActive);
    //Atualiza a lista de concluidos a nova lista de concluidos
    setItemListDone(newListDone);

    const allDone = itemList.filter((itemtodo) => !itemtodo.done );
    if(allDone > [] ){
      setCheckAllDone(false);
      setCheck(false);
    }else{
      setCheckAllDone(true);
      setCheck(true);
    }

  }, [itemList])

  //Função responsavel por adicionar um novo item na lista principal e ativas
  function addItem(text){
    //realiza if apenas se o texto passado no parametro nao for nulo

    if(text !== ''){
      const id = uuidv4();
      /*Cria um novo item que recebe um objeto com os seguintes atributos
      * id: é aplicado automaticamente pela função da biblioteca importada
      * done: é inicial como false que indica que o item está ativo
      * label: recebe o valor do texto que foi passado no parametro
      * a função trim é para corta caso haja espaço em branco no final do texto
      */
      const newItem = {id,done:false,label:text.trim()};
      //cria uma nova lista adicionando tudo o que tem na lista principal mais o novo item no final
      const newList = [...itemList,newItem];
      //Atualiza o local storage com a nova lista criada
      updadeLocalStorage(newList);
      //Atualiza de ativos copiando a lista de ativos atual e adicionando o novo item no final
      setItemListActive([...itemListActive,newItem]);
    }
    
  }

  /*Função responsavel por atualizar um item nas listas
  * Recebe um item como parametro
  */
  function updateItem(item){
    const id = item.id ;
    
    //Cria uma nova lista através da função map (aplica a função em todos os items da lista)
    const newList = itemList.map(
    /*Caso o id do item da lista seja igual do item passado como parametro
    * o item é substituido pelo passado no parametro, se não mantem o item que tem na lista
    */
      (itemtodo) => itemtodo.id === id ? {...item} : itemtodo
    );

    //Atualiza o local storage com a nova lista principal
    updadeLocalStorage(newList);
  }


  /*Função responsavel por deletar um item nas listas
  * Recebe um item como parametro
  */
  function deleteItem(item){
    const id = item.id

    //Cria uma nova lista através da função filter aplicada na lista principal (retorna apenas os valores que passaram pelo filtro)
    const newList = itemList.filter((itemtodo) =>
    //se o item passado no parametro por diferente do item da lista, é retornado o item para nova lista
        itemtodo.id !==  id
    )
    //Atualiza o local storage com a nova lista principal
    updadeLocalStorage(newList);
  }

  //Função responsavel por identificar se enter foi pressionado
  function useEnter(e){
    //Caso enter for pressionado chama função de adicionar item e passa o valor do evento e retorna a label para vazio
    if(e.key === "Enter")
    {
      e.preventDefault();
      addItem(label);
      setLabel('');
    }
  }
  //Função para atualizar o valor da label é chamada sempre que ocorreu uma alteração no input
  function useOnChange(e){
    setLabel(e.target.value);
  }

  //Função de atualizar o local storage e a lista lista principal
  function updadeLocalStorage(newlist){
    setItemList(newlist);
    localStorage.setItem('todosCarlos',JSON.stringify(newlist));
  }

  //Função que muda todos os valores de done de cada item da lista para verdadeiro ou falso
  function doneAll(){
    //Cria uma nova lista mapeando a lista principal
    const newList = itemList.map((itemtodo) => {
      //se check for true muda todos os done para false e vise versa 
      itemtodo.done = check ? false : true;
      return {...itemtodo}
    } 
    );

    //Atualiza o check pelo valor inverso dele
    setCheck(!check);
    //Atualiza o local storage com a nova lista principal
    updadeLocalStorage(newList);
  }
  
  function clearCompleted(){

    //Cria uma nova lista através da função filter aplicada na lista principal (retorna apenas os valores que passaram pelo filtro)
    const newList = itemList.filter((itemtodo) => 
    //Caso o atributo done da lista for false ele retorna o item
      itemtodo.done === false 
    );

    //Atualiza o local storage com a nova lista principal
    updadeLocalStorage(newList);
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
      {itemList > [] && (
      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={checkAllDone}
          onChange={doneAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {
          /*Dois ternários juntos que verificam o state
          * caso state === 1 mapea a lista principal e cria o componente Item com os objetos da lista e suas propriedades
          * caso state === 2 mapea a lista de concluidos e cria o componente Item com os objetos da lista e suas propriedades
          * caso state === 3 mapea a lista de ativos e cria o componente Item com os objetos da lista e suas propriedades
          */
          state === 1 ? itemList.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          )) : state === 2 ? itemListDone.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          )) : itemListActive.map((itemTodo) => (
            <Item key = {itemTodo.id} todo={itemTodo} updateItem={updateItem} deleteItem={deleteItem}/>
          ))}
        </ul>
      </section>
      )}
      {itemList > [] && (
      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <p onClick={setStateOne} className={`${state === 1 ?"selected" :"" }`}>All</p>              
          </li>
          <li>
            <p onClick={createListActive} className={`${state === 3 ?"selected" :"" }`}>Active</p>
          </li>
          <li>
            <p onClick={createListDone} className={`${state === 2 ?"selected" :"" }`}>Completed</p>
          </li>
        </ul>
          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
      </footer>
      )}
    </React.Fragment>
  )
}


export default List;