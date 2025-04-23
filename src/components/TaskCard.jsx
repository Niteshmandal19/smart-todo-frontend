import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import { formatCountdown, formatDate, formatRelativeTime } from '../utils/dateUtils';
import toast from 'react-hot-toast';

const TaskCard = ({ task, onUpdate }) => {
  const [countdown, setCountdown] = useState(formatCountdown(task.deadline));
  const [loading, setLoading] = useState(false);
  const [relativeTime, setRelativeTime] = useState(
    task.createdAt ? formatRelativeTime(task.createdAt) : ''
  );

  useEffect(() => {
    setCountdown(formatCountdown(task.deadline));
    const interval = setInterval(() => {
      setCountdown(formatCountdown(task.deadline));
      if (task.createdAt) {
        setRelativeTime(formatRelativeTime(task.createdAt));
      }
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [task.deadline, task.createdAt]);

  const handleComplete = async () => {
    if (!task.id) return;
    setLoading(true);
    try {
      const newStatus = task.status === 'success' ? 'ongoing' : 'success';
      await taskService.updateTaskStatus(task.id, newStatus);
      await onUpdate(task.id, newStatus);
      toast.success(newStatus === 'success' ? 'Task marked as complete!' : 'Task marked as ongoing!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task.id) return;
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setLoading(true);
    try {
      await taskService.deleteTask(task.id);
      await onUpdate();
      toast.success('Task deleted successfully');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = task.status === 'success';
  const isDeadlinePassed = countdown === 'Deadline passed';

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${
        isSuccess ? 'border-l-green-500' : isDeadlinePassed ? 'border-l-red-500' : 'border-l-indigo-500'
      } p-5 hover:shadow-md transition-all duration-200 group`}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start">
            <h3
              className={`text-lg font-medium ${isSuccess ? 'text-gray-500 line-through' : 'text-gray-800'}`}
              aria-label={isSuccess ? `${task.title} (completed)` : task.title}
            >
              {task.title}
            </h3>
            {isSuccess && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
          </div>

          {task.description && (
            <p className={`text-gray-600 mt-2 ${isSuccess ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>
          )}

          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Due: {formatDate(task.deadline)}</span>
            </div>

            {task.createdAt && (
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>Created: {relativeTime} ({formatDate(task.createdAt)})</span>
              </div>
            )}

            <div
              className={`flex items-center text-sm ${
                isDeadlinePassed ? 'text-red-500' : isSuccess ? 'text-green-500' : 'text-indigo-500'
              }`}
            >
              <svg
                className="w-4 h-4 mr-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{isSuccess ? 'Task completed' : countdown}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={handleComplete}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isSuccess
                ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 ring-1 ring-gray-200'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 ring-1 ring-indigo-600/20'
            } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSuccess ? 'focus:ring-gray-500' : 'focus:ring-indigo-500'
            }`}
            aria-label={isSuccess ? 'Mark task as incomplete' : 'Mark task as complete'}
          >
            {isSuccess ? 'Mark Incomplete' : 'Mark Completed'}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-500 hover:bg-red-50 hover:text-red-700 transition-all ring-1 ring-gray-200 hover:ring-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 opacity-70 group-hover:opacity-100"
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;