import {useState} from 'react'
import './App.css'

function App() {
    const [todos, setTodos] = useState([
        {title: 'Todo 1', description: 'Description 1'},
        {title: 'Todo 2', description: 'Description 2'},
        {title: 'Todo 3', description: 'Description 3'},
    ])

    const addTodo = () => {
        const newTodo = {
            title: `Todo ${todos.length + 1}`,
            description: `Description ${todos.length + 1}`
        }
        setTodos([...todos, newTodo])
    }

    return (
        <>
            <button style={{marginLeft: '20px'}} onClick={addTodo}>Add TODO</button>
            {todos.map((todo, index) => <CardWrapper children={<Todo key={index} title={todo.title} description={todo.description} />} />)}
        </>
    )
}

function Todo({title, description}) {
    return (
        <div className="todo">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

function CardWrapper({children}) {
    return (
        <div style={{border: '2px solid black', margin: '20px'}} className="card">
            {children}
        </div>
    )
}

export default App
