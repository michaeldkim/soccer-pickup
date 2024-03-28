import React from "react";

interface LeagueProps {
    league: {
        id: number;
        title: string;
        content: string;
    };
    onDelete: (id: number) => void;
}

function League({ league, onDelete }: LeagueProps) {
    return (
        <div>
            <p>{league.title}</p>
            <p>{league.content}</p>
            <button onClick={() => onDelete(league.id)}>
                Delete
            </button>
        </div>
    );
}

export default League;