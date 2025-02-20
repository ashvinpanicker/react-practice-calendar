import { FC, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import KanbanCardHolder from '../components/KanbanCardHolder';
import KanbanTrash from '../components/KanbanTrash';

export type TaskStatus = "to-do" | "in-progress" | "done";

export type Task = {
    id: number;
    text: string;
    status: TaskStatus;
}

const todos: Task[] = [
    { id: 1, text: "buy milk", status: "to-do" },
    { id: 2, text: "wash bike", status: "in-progress" },
    { id: 3, text: "do the budget", status: "done" },
    { id: 4, text: "call jane", status: "to-do" },
];

export const TodoListPage: FC = () => {
    const [tasks, setTasks] = useState<Task[]>(todos);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (over.id === "trash") {
            setTasks((prev) => prev.filter((todo) => todo.id !== active.id));
            return;
        }

        setTasks((prev) =>
            prev.map((todo) => (todo.id === active.id ? { ...todo, status: over.id as TaskStatus } : todo))
        );
    };

    const handleAddTask = (text: string) => {
        const newTask: Task = {
            id: Date.now(),
            text,
            status: "to-do",
        };
        setTasks((prev) => [...prev, newTask]);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Todo Kanban</h1>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="Add a task..."
                            className="w-full p-2 border rounded"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
                                    handleAddTask((e.target as HTMLInputElement).value);
                                    (e.target as HTMLInputElement).value = "";
                                }
                            }}
                        />
                    </div>
                    <DndContext onDragEnd={handleDragEnd}>
                        <div className="grid grid-cols-3 gap-8">
                            {["to-do", "in-progress", "done"].map((status) => (
                                <KanbanCardHolder
                                    key={status}
                                    title={status.replace("-", " ").toUpperCase()}
                                    status={status as TaskStatus}
                                    todos={tasks}
                                />
                            ))}
                        </div>
                        <KanbanTrash />
                    </DndContext>
                </div>
            </div>
        </div>
    );
};