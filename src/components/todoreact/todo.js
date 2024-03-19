import React, { useState ,useEffect} from 'react';
import "./style.css";

// getting local storage data back
const getLocalData = ()=>{
  const lists = localStorage.getItem("mytodoelementkey");
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}

const Todo = () => {
  const [inputdata ,setInputData] = useState("");
  const[items , setItems] = useState(getLocalData()) ;
  const [isEditItem,setIsEditItem] = useState("");
  const[toggleButton,setToggleButton] = useState(false);
  // adding Items 
  const addItem = ()=>{
    if(!inputdata){
      alert("kindly fill the item then add it ");
    }
    else if(inputdata && toggleButton){
      setItems(items.map((currElem)=>{
        if(currElem.id === isEditItem){
          return {...currElem , name:inputdata};
      }
      return currElem;
    })
    );
    setInputData([]);
    setIsEditItem(null);
    setToggleButton(false);
  }
    else{
      const mynewInputData = {
        id:new Date().getTime().toString(),
        name:inputdata,
      };
      setItems([...items , mynewInputData]);
      setInputData("");
    }
  };
  //edit items here 
  const editItem = (index) =>{
    const item_todo_edit = items.find((currElem)=>{
      return  currElem.id === index;
    });
    setInputData(item_todo_edit.name);
    setIsEditItem(index);
    setToggleButton(true);
  }
  // deleting items 
  const deleteItem = (index) =>{
   const updatedItems = items.filter((currElem) =>{
    return currElem.id !== index;
   }) 
   setItems(updatedItems);
  }
  // remove all
  const removeAll = () =>{
    setItems([]);
  };
 //Adding local storage to the project ...
 useEffect(()=>{
   localStorage.setItem("mytodoelementkey",JSON.stringify(items))
 },[items]);
  return (
    <>
      <div className='main-div'>
      <div className='child-div'>
        <figure>
          <img src='./images/todo.svg' alt='todologo'></img>
          <figcaption>Add your list Here ✔ </figcaption>
        </figure>
        <div className='addItems'>
          <input type='text' className='form-control' placeholder='Add Your Items Here ✍' value={inputdata} onChange={(event)=> setInputData(event.target.value)}/>
          {toggleButton?<i className="far fa-edit add-btn" onClick={addItem}></i>
          :<i className="fa fa-plus add-btn" onClick={addItem}></i>}
          
        </div>
         {/* show our items */}
          <div className='showItems'>
            {items.map((currElem)=>{
              return(
                <div className='eachItem' key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className='todo-btn'>
                <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(currElem.id)}></i>
                </div>
              </div>
              )
            })}
            
          </div>
        <div className='showItems'>
          <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
      </div>
    </>
  )
}
export default Todo;
