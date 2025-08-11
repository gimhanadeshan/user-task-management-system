import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { showToast } from "../../utils/toast";

const TaskItem = ({ task, isToday, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    await updateTask(task.id, { ...task, completed: !task.completed });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      showToast("Task deleted successfully", "success");
    } catch (error) {
      showToast("Failed to delete task", "error");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md cursor-pointer"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

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
              onClick={() => setShowDeleteModal(true)}
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
