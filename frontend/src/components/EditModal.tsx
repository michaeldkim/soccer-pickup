import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { League, Team } from '../types/types';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: League;
    onUpdate: (league: League) => void;
}

export default function EditModal({ isOpen, onClose, league, onUpdate }: EditModalProps) {
    // Local state for form inputs, initialized from league props
    const [title, setTitle] = useState<string>(league.title);
    const [content, setContent] = useState<string>(league.content);
    const [maxTeams, setMaxTeams] = useState<number>(league.max_teams);
    const [location, setLocation] = useState<string>(league.location);
    const [gameTime, setGameTime] = useState<string>(league.game_time);
    const [leagueStartDate, setLeagueStartDate] = useState<Date>(league.league_start_date);
    const [gameDay, setGameDay] = useState<string>(league.game_day);
    const [teams, setTeams] = useState<Team[]>(league.teams);

    // Handler for when the form is submitted
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedLeague = {
            ...league,
            title,
            content,
            max_teams: maxTeams,
            location: location,
            game_time: gameTime,
            league_start_date: new Date(leagueStartDate),
            game_day: gameDay,
            teams: teams,
        };
        onUpdate(updatedLeague);
        onClose();
    };

    function toISODateString(dateInput: Date) {
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        const isoDate = date.toISOString().split('T')[0];
        return isoDate;
    }

    // Handler for adding a new team (you need to define the logic for this)
    const handleAddTeam = (newTeam: Team) => {
        setTeams([...teams, newTeam]);
    };

    // Handler for removing a team
    const handleRemoveTeam = (teamId: number) => {
        setTeams(teams.filter(team => team.id !== teamId));
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto flex flex-col">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Edit League
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="flex flex-col">
                                    <div className='flex flex-row'>
                                        <div className='flex flex-col'>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='title'>Title:</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    value={title}
                                                />
                                            </div>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='content'>Content:</label>
                                                <textarea
                                                    id="content"
                                                    name="content"
                                                    onChange={(e) => setContent(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='max_teams'>Max Teams:</label>
                                                <input
                                                    type="number"
                                                    id="max_teams"
                                                    name="max_teams"
                                                    onChange={(e) => setMaxTeams(parseInt(e.target.value, 10) || 0)}
                                                    value={maxTeams}
                                                />
                                            </div>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='location'>Location:</label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    value={location}
                                                />
                                            </div>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='location'>Game Day:</label>
                                                <input
                                                    type="text"
                                                    id="game_day"
                                                    name="game_day"
                                                    onChange={(e) => setGameDay(e.target.value)}
                                                    value={gameDay}
                                                />
                                            </div>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='game_time'>Game Time:</label>
                                                <input
                                                    type="time"
                                                    id="game_time"
                                                    name="game_time"
                                                    onChange={(e) => setGameTime(e.target.value)}
                                                    value={gameTime}
                                                />
                                            </div>
                                            <div className="p-4 flex justify-between">
                                                <label htmlFor='game_date'>League Start Date:</label>
                                                <input
                                                    type="date"
                                                    id="game_date"
                                                    name="game_date"
                                                    onChange={(e) => setLeagueStartDate(new Date(e.target.value))}
                                                    value={toISODateString(leagueStartDate)}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h1>TEAMS: </h1>
                                            <div className="p-4 flex justify-between">
                                                {teams.length > 0 ? (
                                                    teams.map(team => (
                                                        <div key={team.id}>
                                                            {team.name}
                                                            <button onClick={() => handleRemoveTeam(team.id)}>Remove</button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No teams are in this league.</p>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 px-4 pt-4 flex justify-between">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                        >Update</button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClose}
                                        >Cancel</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}