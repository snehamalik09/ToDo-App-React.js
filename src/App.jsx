import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  const saveToLS = (todos) => localStorage.setItem("todos", JSON.stringify(todos));

  const handleChange = (e) => setTodo(e.target.value);

  const addBtnClicked = () => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, { id: uuidv4(), todo, isCompleted: false }];
      saveToLS(updatedTodos);
      return updatedTodos;
    });
    setTodo("");
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (id) => {
    const temp = todos.find((i) => i.id === id);
    setTodo(temp.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleCompleted = () => setshowFinished(!showFinished);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-pink-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">My To-Do List</h1>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              className="flex-1 p-3 rounded-xl border-2 border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new task..."
            />
            <button
              onClick={addBtnClicked}
              disabled={todo.length <= 2}
              className="bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              Add
            </button>
          </div>

          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={handleCompleted}
              className="w-5 h-5 accent-blue-600"
            />
            Show Completed Tasks
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-4 max-h-96 overflow-y-auto">
          {todos.length === 0 && (
            <div className="text-center text-gray-500">You have nothing to do. Relax! 🛌</div>
          )}

          {todos.map((item) => {
            if (!showFinished || item.isCompleted)
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-blue-50 rounded-xl shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 max-w-[70%] truncate">
                    <input
                      type="checkbox"
                      name={item.id}
                      checked={item.isCompleted}
                      onChange={handleCheckbox}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className={item.isCompleted ? "line-through text-gray-400" : "truncate"}>
                      {item.todo}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span
                      onClick={() => handleEdit(item.id)}
                      className="material-symbols-outlined cursor-pointer text-blue-700 hover:text-blue-900 transition"
                    >
                      edit
                    </span>
                    <span
                      onClick={() => handleDelete(item.id)}
                      className="material-symbols-outlined cursor-pointer text-red-600 hover:text-red-800 transition"
                    >
                      delete
                    </span>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

