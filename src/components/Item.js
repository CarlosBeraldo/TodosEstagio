import {useState} from 'react'

//Recebe como props o todo, updateItem e o deleteItem. Passados pelo componente List.js
function Item ({todo, updateItem, deleteItem}){

  //Criação das constantes com estados para que seja feita a alteração. utilizando o hook useState

  //Reponsavel por retornar se a opção de editar está ativa
  const [edit, setEdit] = useState(false)
  //Responsavel por receber o valor que foi digitado
  const [label, setLabel] = useState('')

  //Função responsavel por alterar o atributo done do item ToDo
  function onChangeDone(){
    todo.done = !todo.done;
    updateItem(todo);       
  }

  //Função responsavel por alterar o estado da Label com o texto que foi digitado
  function onChangeText(e){
    setLabel(e.target.value);
  }

  //Função responsavel por deletar o item
  function onClickDel(){
    deleteItem(todo);
  }

  /*Função responsavel por mudar o estado do edit para o estado oposto
  * e setar o valor inicial da label de acordo com o valor contido na label do item*/
  function onDoubleClick(){
    setEdit(!edit);
    setLabel(todo.label);
  }

  //Função responsavel por identificar qual botão foi pressionado Enter ou Escape
  function  useEnterEscape(e){
    /*Se a tecla enter for pressionado verifica se o texto é nulo
    * caso verdade: apaga o item e cancela a edição mudando o valor para false 
    * 
    * caso falso: se nao for nulo altera o valor da propriedade label do item pela label atual(digitada)
    *             chama a função de atualizar o objeto e por fim torna falso a opção de editar
    */
    if(e.key === "Enter"){  
      e.preventDefault();
      if(e.target.value === ''){
        deleteItem(todo);
        setEdit(false);
      }
      else{
        todo.label = label;      
        updateItem(todo);
        setEdit(false);
      }
    }
    /*Verifica se o ESC foi pressionado se caso pressionado cancela a edição e 
    * modifica o valor da label para o que esta contido no item
    */
    if(e.key === "Escape"){
      e.preventDefault();
      setEdit(false);
      setLabel(todo.label);
    }
  }

  /*Na classe de li é feita 2 verificações para renomear a class 
  * primeira se o item está concluido muda o nome da classe para completed
  * segunda se a opção de editar está ativa muda o nome da classe para editing
  */
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
    {//onKeyPress nao identifica a tecla Escape(Esc) por conta disso foi utilizado onKeyDown
    }
    <input className='edit' onKeyDown={useEnterEscape} value={label} onChange={onChangeText}/>
    </li>
  )
}

export default Item
