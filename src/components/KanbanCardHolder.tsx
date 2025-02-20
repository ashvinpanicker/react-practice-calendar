import { useDroppable } from '@dnd-kit/core';
import { Task, TaskStatus } from '../pages/TodoListPage';
import KanbanCard from './KanbanCard';

const KanbanCardHolder = ({ title, status, todos }: { title: string, status: TaskStatus, todos: Task[] }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: status,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <div ref={setNodeRef} style={style} className="bg-slate-200 h-96 rounded-lg">
            <h3 className="font-thin text-lg m-3">{title}</h3>
                {todos
                    .filter((todo) => todo.status === status)
                    .map((todo) => (
                        <KanbanCard key={todo.id} todo={todo} />
                    ))
                }
        </div>
    );
};

export default KanbanCardHolder;