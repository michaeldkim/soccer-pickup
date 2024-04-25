import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';

const DashboardNavBar: React.FC = () => {
  const [openLeagues, setOpenLeagues] = useState(false);

  const leaguesSubTabs = [
    { name: 'League Schedule', to: '/dashboard/league/schedule/' },
    { name: 'League Standings', to: '/dashboard/league/standings/' },
    { name: 'Create a League', to: '/dashboard/leagues/create/'},
    { name: 'Edit a League', to: '/dashboard/leagues/edit/'},
  ];

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 h-screen dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="ml-3">Home</span>
            </a>
          </li>
          <li>
            <button className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpenLeagues(!openLeagues)}>
              <span className="flex-1 ml-3 text-left">Leagues</span>
              <ChevronDownIcon className={`w-5 h-5 mr-2 ${openLeagues ? 'transform rotate-180' : ''}`} />
            </button>
            <Transition
              show={openLeagues}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <ul className="mt-2 space-y-2 pl-7">
                {leaguesSubTabs.map((subTab) => (
                  <li key={subTab.name}>
                    <a href={subTab.to} className="block p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{subTab.name}</a>
                  </li>
                ))}
              </ul>
            </Transition>
          </li>
          {/* Add other primary tabs as needed */}
        </ul>
      </div>
    </aside>
  );
};

export default DashboardNavBar;
