import { useDroppable } from '@dnd-kit/core';

const KanbanTrash = () => {
    const { isOver, setNodeRef } = useDroppable({
        id: "trash",
    });
    
    return (
        <div
            ref={setNodeRef}
            id="trash"
            className={`p-4 mt-4 text-white text-center rounded transition-colors ${isOver ? "bg-red-700" : "bg-red-500"}`}
        >
            Drag here to delete
        </div>
    );
};

export default KanbanTrash;