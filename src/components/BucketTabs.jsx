const BucketTabs = ({ activeTab, onTabChange }) => {
    const tabs = [
      {
        id: 'ongoing',
        label: 'Ongoing',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'indigo',
      },
      {
        id: 'success',
        label: 'Completed',
        icon: 'M5 13l4 4L19 7',
        color: 'green',
      },
      {
        id: 'failure',
        label: 'Overdue',
        icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'red',
      },
    ];
  
    const handleKeyDown = (e, tabId) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTabChange(tabId);
      }
    };
  
    return (
      <div className="mb-6">
        <div className="sm:hidden">
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value)}
            className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white transition-all"
            aria-label="Select task category"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
  
        <div className="hidden sm:block">
          <div
            className="bg-white rounded-lg shadow-sm p-1 flex space-x-1"
            role="tablist"
            aria-label="Task category tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={`
                  flex items-center justify-center py-2.5 px-4 rounded-md text-sm font-medium flex-1
                  transition-all duration-200
                  ${activeTab === tab.id ? `bg-${tab.color}-100 text-${tab.color}-700 shadow-sm` : 'bg-white text-gray-500 hover:bg-gray-50'}
                `}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                <svg
                  className={`h-5 w-5 mr-1.5 ${activeTab === tab.id ? `text-${tab.color}-500` : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default BucketTabs;