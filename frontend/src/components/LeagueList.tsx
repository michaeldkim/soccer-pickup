import { DeleteModal, EditModal } from '../components'
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModelOpen] = useState<boolean>(false);
    const formattedDate = formatDate(league.league_start_date);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const openEditModal = () => setIsEditModelOpen(true);
    const closeEditModal = () => setIsEditModelOpen(false);

    const handleDelete = () => {
        onDelete(league.id);
        closeDeleteModal();
    };

    const handleEdit = () => {
        onEdit(league.id);
        closeEditModal();
    };

    return (
        <div className="flex flex-col my-4 border-solid-1px border-t-2 border-slate-500">
            <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} league={league} onUpdate={handleEdit} />
            <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} />
            <div className="flex items-center p-2">
                <h3 className="text-xl font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {league.title}
                    {isOpen ? (
                        <ChevronUpIcon className="inline-block w-5 h-5 ml-2" />
                    ) : (
                        <ChevronDownIcon className="inline-block w-5 h-5 ml-2" />
                    )}
                </h3>
                <div>
                    <button onClick={() => onEdit(league.id)} aria-label="Edit">
                        {/* Edit Icon */}
                    </button>
                    <button onClick={() => onDelete(league.id)} aria-label="Delete">
                        {/* Delete Icon */}
                    </button>
                </div>
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

                <div className="">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5" onClick={openEditModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-5" onClick={openDeleteModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </Transition>
        </div>
    );
}

export default LeagueList;