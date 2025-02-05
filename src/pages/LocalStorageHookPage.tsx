import React, { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export type Todo = {
    id: string;
    text: string;
    done: boolean;
};

// Got from React Practice Github
const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useLocalStorage("todolist", []);

    const handleAddNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodos([...todos, { id: uuidv4(), text: newTodo, done: false }]);
        setNewTodo("");
    };

    const handleToggleTodo = (todoToToggle: Todo) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === todoToToggle.id) {
                    return {
                        ...todoToToggle,
                        done: !todoToToggle.done,
                    };
                }
                return todo;
            })
        );
    };
    return (
        <div>
            <form onSubmit={handleAddNewTodo} className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Add a new todo"
                    className="border border-gray-300 p-2 rounded-lg mr-5"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button className="bg-blue-600 rounded-lg text-white p-2" type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.done}
                            className='mr-2'
                            onChange={() => handleToggleTodo(todo)}
                        />
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const LocalStorageHookPage: React.FC = () => {

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Persisted Todo list with custom hook</h1>
                    <div className="space-y-4">
                        <TodoList />
                    </div>
                </div>
            </div>
        </div>
    );
};

