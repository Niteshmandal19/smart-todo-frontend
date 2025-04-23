import TaskCard from './TaskCard';

const TaskList = ({ tasks = [], activeTab, onTaskUpdate }) => {
  const filteredTasks = tasks.filter((task) => {
    if (!task || typeof task !== 'object') return false;

    const now = new Date();
    const deadline = new Date(task.deadline);

    if (activeTab === 'ongoing') {
      return task.status === 'ongoing' && deadline > now;
    } else if (activeTab === 'success') {
      return task.status === 'success';
    } else if (activeTab === 'failure') {
      return task.status === 'failure' || (task.status === 'ongoing' && deadline <= now);
    }
    return false;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    return activeTab === 'success' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-4 min-h-[300px] p-5 rounded-lg bg-gray-50/80 transition-all">
      {sortedTasks.length > 0 ? (
        <div className="space-y-4">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={onTaskUpdate} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-500 font-medium">No tasks in this category</p>
          {activeTab === 'ongoing' && (
            <p className="text-gray-400 text-sm mt-2">Create a new task to get started</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;