import { DeleteModal, EditModal } from '../components'
import { useState } from 'react'

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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return correctedDate.toLocaleDateString('en-US', options);
}

function LeagueList({ league, onEdit, onDelete }: LeagueProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModelOpen] = useState<boolean>(false);

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
        <div className="flex flex-col mb-4 border-solid">
            <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} league={league} onUpdate={handleEdit} />
            <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} />
            <div className="league-info">
                <strong>Title:</strong> {league.title}
                <p>{league.content}</p>
                <p><strong>Max Teams:</strong> {league.max_teams}</p>
                <p><strong>Location:</strong> {league.location}</p>
                <p><strong>Game Time:</strong> {formatTime(league.game_time)}</p>
                <p><strong>League Start Date:</strong> {formatDate(league.league_start_date.toString())}</p>
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

            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 m-5" onClick={openEditModal}>
                    Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-20 m-5" onClick={openDeleteModal}>
                    Delete
                </button>
            </div>

        </div>
    );
}

export default LeagueList;