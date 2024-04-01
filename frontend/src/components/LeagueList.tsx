import DeleteModal from './DeleteModal'
import { useState } from 'react'

interface LeagueProps {
    league: {
        id: number;
        title: string;
        content: string;
    };
    onDelete: (id: number) => void;
}

function League({ league, onDelete }: LeagueProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleDelete = () => {
      onDelete(league.id);
      closeModal();
    };

    return (
        <div className="flex flex-col">
        <DeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} />
        <h1 className="font-bold">{league.title}</h1>
        <p>{league.content}</p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
            Delete
        </button>
        </div>
    );
}

export default League;