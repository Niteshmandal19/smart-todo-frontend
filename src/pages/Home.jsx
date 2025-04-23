import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import BucketTabs from '../components/BucketTabs';
import { useTasks } from '../hooks/useTasks';

function Home() {
  const { tasks, activeTab, setActiveTab, loading, error, fetchTasks, handleTaskUpdate } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Todo List</h1>
          <p className="text-gray-600">Stay organized and never miss a deadline</p>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <TaskForm onTaskCreated={fetchTasks} />

        <div className="mt-6">
          <BucketTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {loading && tasks.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <TaskList tasks={tasks} activeTab={activeTab} onTaskUpdate={handleTaskUpdate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home; 