import { useDraggable } from '@dnd-kit/core';
import { Task } from '../pages/TodoListPage';

const KanbanCard = ({ todo }: { todo: Task }) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: todo.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;



    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='bg-white rounded-md p-4 mb-2 ml-2 mr-2 mt-2'>
            {todo.text}
        </div>
    );
};

export default KanbanCard;