
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";

import { useAppDispatch } from "../app/hooks";
import { taskDeleted } from "../features/tasks/tasksSlice";

export default function TaskActions ({ projectId, taskId }: { projectId: string | undefined, taskId: string}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onEditTask = () => {
        navigate(`/tasks/${projectId}/${taskId}/edit`);
    }

    const onDeleteTask = () => {
        dispatch(taskDeleted(taskId));
        navigate(`/tasks/${projectId}`);
    }
    return <div className='actions'>
                <PencilIcon width={16} height={16} color='#665' onClick={onEditTask} />
                <TrashIcon width={16} height={16} color='#665' onClick={onDeleteTask} />
            </div>;
};
