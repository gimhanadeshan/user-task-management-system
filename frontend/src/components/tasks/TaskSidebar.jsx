import { useTasks } from "../../contexts/TaskContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskSidebar = ({ isOpen, onClose, editingTask = null }) => {
  const { addTask, updateTask, isLoading } = useTasks();
  const isEditing = !!editingTask;

  const initialValues = {
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    dueDate: editingTask?.dueDate
      ? new Date(editingTask.dueDate).toISOString().slice(0, 16)
      : "",
    completed: editingTask?.completed || false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.date().required("Due date is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const taskData = {
        ...values,
        dueDate: new Date(values.dueDate).toISOString(),
      };

      if (isEditing) {
        await updateTask(editingTask.id, { ...editingTask, ...taskData });
      } else {
        await addTask(taskData);
        resetForm();
      }

      onClose();
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} task:`, error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-transparent bg-opacity-50 transition-opacity z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {isEditing ? "Edit Task" : "New Task"}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {isEditing
                  ? "Update task details"
                  : "Create a new task to stay organized"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Task Title *
                    </label>
                    <Field
                      name="title"
                      type="text"
                      className="input-field"
                      placeholder="Enter task title..."
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="input-field"
                      rows={4}
                      placeholder="Add task description..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Due Date *
                    </label>
                    <Field
                      name="dueDate"
                      type="datetime-local"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="dueDate"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label
                          htmlFor="completed"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Task Status
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Mark as completed if this task is already finished
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Field
                          name="completed"
                          type="checkbox"
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label
                          htmlFor="completed"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Completed
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Quick Date Buttons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quick Due Date Options
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const today = new Date();
                          today.setHours(today.getHours() + 2);
                          setFieldValue(
                            "dueDate",
                            today.toISOString().slice(0, 16)
                          );
                        }}
                        className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        In 2 Hours
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          tomorrow.setHours(9, 0, 0, 0);
                          setFieldValue(
                            "dueDate",
                            tomorrow.toISOString().slice(0, 16)
                          );
                        }}
                        className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Tomorrow 9AM
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextWeek = new Date();
                          nextWeek.setDate(nextWeek.getDate() + 7);
                          nextWeek.setHours(9, 0, 0, 0);
                          setFieldValue(
                            "dueDate",
                            nextWeek.toISOString().slice(0, 16)
                          );
                        }}
                        className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        Next Week
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextMonth = new Date();
                          nextMonth.setMonth(nextMonth.getMonth() + 1);
                          nextMonth.setHours(9, 0, 0, 0);
                          setFieldValue(
                            "dueDate",
                            nextMonth.toISOString().slice(0, 16)
                          );
                        }}
                        className="px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                      >
                        Next Month
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200 -mx-6 px-6 pb-6">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed  ${
                          isEditing
                            ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                            : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {isEditing ? "Updating..." : "Creating..."}
                          </div>
                        ) : isEditing ? (
                          "Update Task"
                        ) : (
                          "Create Task"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskSidebar;
