import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'; //uuid generates cryptographically unique id's

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const addBtnClicked = (e) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, { id: uuidv4(), todo, isCompleted: false }]
      saveToLS(updatedTodos);
      return updatedTodos;
    });
    setTodo("");

  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let newtodos = [...todos];
    let index = newtodos.findIndex((item) => { return item.id == id })
    let val = newtodos[index].isCompleted;
    newtodos[index].isCompleted = !val;
    setTodos(newtodos);
    saveToLS(newtodos);
  }

  const handleDelete = (e, id) => {
    // Create a new array by filtering out the item with the specified id
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newtodos);
    saveToLS(newtodos);
  };

  const handleEdit = (e, id) => {

    let temp = todos.filter((i) => { return i.id == id })
    setTodo(temp[0].todo)
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newtodos);
    saveToLS(newtodos);
  }

  const handleCompleted = (e) => {
    setshowFinished(!showFinished);
  }

  return (
    <>
    <div className='w-full h-screen overflow-hidden flex items-center text-sm lg:text-lg'>

      <div className="container max-w-[90%] h-[50%] lg:max-w-[55%] lg:h-[70%] my-10 mx-auto p-5 overflow-y-scroll text-md bg-white border-4 border-blue-900 ">
        <h1 className='font-bold text-center text-2xl'>Your ToDo List</h1>

        <div className='flex flex-col flex-wrap justify-center'>
          <div className=' flex justify-center my-10'>
            <input type="text" name="todo" value={todo} onChange={handleChange} className=' w-[70%] lg:w-[60%] p-2 m-3 border-2 border-blue-900 ' />
            <button onClick={addBtnClicked} disabled={todo.length <= 2} className='bg-blue-900 px-4 py-1 m-3 rounded-2xl text-white cursor-pointer '>Add</button>
          </div>
          <div className='ml-[5%] lg:ml-[15%]'> <input type="checkbox" value={showFinished} onClick={handleCompleted} />  Show Completed Tasks </div>
        </div>


        <div className='flex flex-wrap justify-center my-[3%]'>

          {todos.length === 0 && <div className='my-[5%]'> You have nothing to do. Chillax! </div>}
          {todos.map((item) => {
            return (!showFinished || item.isCompleted) &&
              <div key={item.id} className='flex flex-wrap justify-between w-[90%] p-2 m-2 lg:w-[60%] lg:p-3 lg:m-3 border-2 border-black bg-white'>
                <div className='flex lg:max-w-[80%] max-w-[70%] truncate items-center gap-3 lg:gap-5'>
                  <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleCheckbox} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="icons cursor-pointer">
                  <span onClick={(e) => { handleEdit(e, item.id) }} className="material-symbols-outlined m-1">edit</span>
                  <span onClick={(e) => { handleDelete(e, item.id) }} className="material-symbols-outlined m-1">delete</span>
                </div>
              </div>
          })}

        </div>

      </div> </div>
    </>
  )
}

export default App