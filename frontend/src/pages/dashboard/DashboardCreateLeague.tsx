import React, { useState } from 'react';
import axios from "axios"
import DashboardNavBar from '../../components/DashboardNavBar';
import api from '../../api';
import { Team } from '../../types/types';

interface League {
    id: number;
    title: string;
    content: string;
    max_teams: number;
    location: string;
    game_time: string;
    league_start_date: Date;
    game_day: string;
    teams: Team[];
}

const DashboardCreateLeague: React.FC = () => {
    const [content, setContent] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [location, setLocation] = useState<string>("");
    const [game_time, setGameTime] = useState('');
    const [game_day, setGameDay] = useState<string>("MO")
    const [league_start_date, setLeagueStartDate] = useState('');
    const [max_teams, setMaxTeams] = useState<number>(8)

    const getLeagues = () => {
        api
            .get("/api/leagues/")
            .then((res) => res.data)
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    // If the error is an Axios error, you can get the detailed request and response.
                    alert(`Error: ${error.response?.status} - ${error.response?.statusText}`);
                } else {
                    // If it's not an Axios error, it might be a more systemic issue (network failure, etc.)
                    alert(error);
                }
            })
    }

    const createLeague = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newLeague = {
            title,
            content,
            max_teams,
            location,
            game_day,
            game_time,
            league_start_date,
            teams: [] as Team[],
        }
        
        api
            .post("/api/leagues/", newLeague)
            .then((res) => {
                if (res.status === 201) alert("League created!");
                else alert("Failed to make league.");
                getLeagues();
            })
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    // If the error is an Axios error, you can get the detailed request and response.
                    alert(`Error: ${error.response?.status} - ${error.response?.statusText}`);
                } else {
                    // If it's not an Axios error, it might be a more systemic issue (network failure, etc.)
                    alert(error);
                }
            })
    }

    return (
        <div className='flex'>
            <div>
                <DashboardNavBar />
            </div>
            <div className="bg-slate-100 w-screen">
                <div className="p-5 h-max">
                    <h1 className="font-bold text-4xl mb-7">Create a League</h1>
                    <form onSubmit={createLeague} className='flex flex-col'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <br />
                        <label htmlFor='content'>Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <br />
                        <label htmlFor='max_teams'>Max Teams:</label>
                        <input
                            type="number"
                            id="max_teams"
                            name="max_teams"
                            required
                            onChange={(e) => setMaxTeams(parseInt(e.target.value, 10) || 0)}
                            value={max_teams}
                        />
                        <br />
                        <label htmlFor='location'>Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            required
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                        <br />
                        <div>
                            <label htmlFor='location'>Game Day:</label>
                            <input
                                type="text"
                                id="game_day"
                                name="game_day"
                                required
                                onChange={(e) => setGameDay(e.target.value)}
                                value={game_day}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor='game_time'>Game Time:</label>
                            <input
                                type="time"
                                id="game_time"
                                name="game_time"
                                required
                                onChange={(e) => setGameTime(e.target.value)}
                                value={game_time}
                            /></div>
                        <br />
                        <div>
                            <label htmlFor='game_date'>League Start Date:</label>
                            <input
                                type="date"
                                id="game_date"
                                name="game_date"
                                required
                                onChange={(e) => setLeagueStartDate(e.target.value)}
                                value={league_start_date}
                            />
                        </div>
                        <br />
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default DashboardCreateLeague;
