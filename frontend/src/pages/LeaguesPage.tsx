import React, { Fragment, useState} from 'react';
import { Listbox, Transition, Tab } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import './LeaguesPage.css'

interface League {
    id: number;
    name: string;
}

const leagues: League[] = [
    { id: 1, name: 'McCarren Park 7v7 (Tues) @ 7:50 PM' },
    { id: 2, name: 'McCarren Park 7v7 (Tues) @ 8:50 PM' },
    { id: 3, name: 'McCarren Park 7v7 (Tues) @ 9:50 PM' },
    { id: 4, name: 'McCarren Park 7v7 (Thurs) @ 7:50 PM' },
    { id: 5, name: 'McCarren Park 7v7 (Thurs) @ 8:50 PM' },
    { id: 6, name: 'McCarren Park 7v7 (Thurs) @ 9:50 PM' },
]

const LeaguesPage: React.FC = () => {
    const [selectedLeague, setSelectedLeague] = useState<League>(leagues[0]);


    return (
        <div className='m-10'>
            <h1 className="text-2xl font-bold">Leagues</h1>
            <p>Welcome to the Leagues page. Here you can find information about different leagues, team standings, and upcoming matches.</p>
            <div className='top-16 w-72'>
                <Listbox value={selectedLeague} onChange={setSelectedLeague}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selectedLeague.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {leagues.map((league, leagueIdx) => (
                                    <Listbox.Option
                                        key={league.id}
                                        value={league}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {league.name}
                                                </span>
                                                {selected && (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-amber-600' : 'text-amber-600'}`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>

            <div className='mt-8'>
                <Tab.Group>
                    <div className='bg-blue-500 rounded-t-xl p-5'>
                        <h1 className='text-white text-xl'>{selectedLeague.name}</h1>
                        <h2 className='text-gray-300'>Week 2 of 4</h2>
                    </div>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-500 rounded-b-xl">
                        {['Matches', 'Standing', 'Players'].map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    `w-full py-2.5 text-sm leading-5 font-medium rounded-lg transition-colors duration-150
                                    ${selected ? 'bg-blue-700 text-white' : 'bg-blue-900 text-blue-300'}`
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel>
                            {/* Content for Matches */}
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* Content for Standing */}
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* Content for Players */}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default LeaguesPage;