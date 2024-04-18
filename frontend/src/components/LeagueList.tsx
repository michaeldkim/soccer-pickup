import { DeleteModal, EditModal, OptionsButton } from '../components'
import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';

interface LeagueProps {
    league: {
        id: number;
        title: string;
        content: string;
        max_teams: number;
        location: string;
        game_time: string;
        league_start_date: Date;
        game_day: string;
        teams: { id: number; name: string; }[];
    };
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

enum DaysOfWeek {
    MO = 'Monday',
    TU = 'Tuesday',
    WE = 'Wednesday',
    TH = 'Thursday',
    FR = 'Friday',
    SA = 'Saturday',
    SU = 'Sunday'
}

function getFullDayName(dayAbbreviation: keyof typeof DaysOfWeek | string): string {
    if (dayAbbreviation in DaysOfWeek) {
        return DaysOfWeek[dayAbbreviation as keyof typeof DaysOfWeek];
    }
    console.warn('Invalid day abbreviation:', dayAbbreviation);
    return dayAbbreviation; // Fallback to the input if it's not a valid key
}

function formatTime(timeString: string) {
    const [hours24, minutes] = timeString.split(':');
    const hours = parseInt(hours24, 10);
    const suffix = hours >= 12 ? "PM" : "AM";
    const hours12 = ((hours + 11) % 12 + 1);
    return `${hours12}:${minutes} ${suffix}`;
}

function formatDate(dateInput: string | Date): string {
    let date: Date;

    if (typeof dateInput === 'string') {
        const parts = dateInput.split('-');
        date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    } else {
        date = dateInput;
    }
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}

function LeagueList({ league, onEdit, onDelete }: LeagueProps) {
    const [isOpen, setIsOpen] = useState(false);
    const formattedDate = formatDate(league.league_start_date);

    return (
        <div className="flex flex-col my-4 border-solid-1px border-t-2 border-slate-500">
            
            <div className="flex justify-between items-center p-2">
                <h3 className="flex flex-row text-xl font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {league.title}
                    {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </h3>
                <OptionsButton league={league} onEdit={() => onEdit(league.id)} onDelete={() => onDelete(league.id)} />
            </div>

            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div className="mt-2 flex flex-col">
                    <p><strong>Title:</strong> {league.title}</p>
                    <p><strong>Content:</strong>{league.content}</p>
                    <p><strong>Max Teams:</strong> {league.max_teams}</p>
                    <p><strong>Location:</strong> {league.location}</p>
                    <p><strong>Game Time:</strong> {formatTime(league.game_time)}</p>
                    <p><strong>League Start Date:</strong> {formattedDate}</p>
                    <p><strong>Game Day:</strong> {getFullDayName(league.game_day)}</p>
                    <div>
                        <strong>Teams:</strong>
                        {league.teams.length > 0 ? (
                            <ul>
                                {league.teams.map((team) => (
                                    <li key={team.id}>{team.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>There are no teams in this league.</p>
                        )}
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export default LeagueList;