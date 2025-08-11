/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "./TaskItem";
import TaskSidebar from "./TaskSidebar";
import { isToday } from "../../utils/helpers";

const TaskList = () => {
  const { tasks, isLoading, error, fetchTasks } = useTasks();
  const [sortBy, setSortBy] = useState("dueDate"); // dueDate, title, completed
  const [sortOrder, setSortOrder] = useState("asc"); // asc, desc
  const [filterBy, setFilterBy] = useState("all"); // all, completed, pending, overdue, today
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTask = () => {
    setEditingTask(null);
    setIsSidebarOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setEditingTask(null);
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "dueDate":
          valueA = new Date(a.dueDate);
          valueB = new Date(b.dueDate);
          break;
        case "title":
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case "completed":
          valueA = a.completed;
          valueB = b.completed;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const filterTasks = (tasksToFilter) => {
    const now = new Date();

    switch (filterBy) {
      case "completed":
        return tasksToFilter.filter((task) => task.completed);
      case "pending":
        return tasksToFilter.filter((task) => !task.completed);
      case "overdue":
        return tasksToFilter.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate < now && !task.completed;
        });
      case "today":
        return tasksToFilter.filter((task) => isToday(task.dueDate));
      default:
        return tasksToFilter;
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const now = new Date();
      return dueDate < now && !task.completed;
    }).length;
    const todayTasks = tasks.filter((task) => isToday(task.dueDate)).length;

    return { total, completed, pending, overdue, today: todayTasks };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
        <div className="text-sm text-red-800">Error: {error}</div>
      </div>
    );
  }

  const filteredAndSortedTasks = sortTasks(filterTasks(tasks));
  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Your Tasks</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNewTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New Task</span>
            </button>
            <button
              onClick={fetchTasks}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.overdue}
            </div>
            <div className="text-sm text-gray-500">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.today}
            </div>
            <div className="text-sm text-gray-500">Due Today</div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Tasks", count: stats.total },
              { key: "pending", label: "Pending", count: stats.pending },
              { key: "completed", label: "Completed", count: stats.completed },
              { key: "overdue", label: "Overdue", count: stats.overdue },
              { key: "today", label: "Due Today", count: stats.today },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterBy(filter.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer  ${
                  filterBy === filter.key
                    ? "bg-blue-100 text-blue-800 border-2 border-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-3 py-1 text-sm border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm cursor-pointer"
            >
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
              <option value="completed">Status</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      {filteredAndSortedTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-gray-400 text-6xl mb-4">
            {filterBy === "all"
              ? "📝"
              : filterBy === "completed"
                ? "✅"
                : filterBy === "overdue"
                  ? "⏰"
                  : "🔍"}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filterBy === "all" ? "No tasks yet" : `No ${filterBy} tasks`}
          </h3>
          <p className="text-gray-600">
            {filterBy === "all"
              ? "Create your first task to get started!"
              : `You don't have any ${filterBy} tasks right now.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isToday={isToday(task.dueDate)}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      {/* Task Sidebar */}
      <TaskSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        editingTask={editingTask}
      />
    </div>
  );
};

export default TaskList;
