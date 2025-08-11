import { useTasks } from "../../hooks/useTasks";

const TaskItem = ({ task, isToday, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleToggleComplete = async () => {
    await updateTask(task.id, { ...task, completed: !task.completed });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPastDue = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < now && !task.completed;
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
          task.completed
            ? "border-green-400 bg-green-50"
            : isPastDue()
              ? "border-red-400 bg-red-50"
              : isToday
                ? "border-yellow-400 bg-yellow-50"
                : "border-blue-400"
        } transition-all duration-200 hover:shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
            />
            <div className="flex-1">
              <h4
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h4>
              {task.description && (
                <p
                  className={`text-sm mt-1 ${
                    task.completed ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
              )}
              <div className="flex items-center mt-2 text-xs space-x-2">
                <span className="text-gray-500">
                  Due: {formatDate(task.dueDate)}
                </span>
                {isToday && (
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full">
                    Due Today
                  </span>
                )}
                {isPastDue() && (
                  <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full">
                    Overdue
                  </span>
                )}
                {task.completed && (
                  <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
