import React, { useState, useEffect } from 'react';
import api from "../api";
import axios from "axios"
import LeagueList from "../components/LeagueList"
import { Tab } from '@headlessui/react'
import DashboardNavBar from '../components/DashboardNavBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

interface League {
  id: number;
  title: string;
  content: string;
  max_teams: number;
  location: string;
  game_time: string;
  league_start_date: Date;
  game_day: string;
  teams: { id: number; name: string; }[];
}

const DashboardPage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([])
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [location, setLocation] = useState<string>("");
  const [game_time, setGameTime] = useState('');
  const [game_day, setGameDay] = useState<string>("MO")
  const [league_start_date, setLeagueStartDate] = useState('');
  const [max_teams, setMaxTeams] = useState<number>(8)

  useEffect(() => {
    const storedFirstName = localStorage.getItem("first_name")
    if (storedFirstName) setFirstName(storedFirstName);
    console.log(storedFirstName);
    getLeagues();
  }, [])

  const getLeagues = () => {
    api
      .get("/api/leagues/")
      .then((res) => res.data)
      .then((data) => { setLeagues(data); console.log(data) })
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

  const editLeague = (id: number) => {
    api
      .put(`/api/leagues/edit/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("League updated!");
        else alert("Failed to update League")
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
  };

  const deleteLeague = (id: number) => {
    api
      .delete(`/api/leagues/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("League deleted");
        else alert("Failed to make League")
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

  const createLeague = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newLeague = {
      title,
      content,
      max_teams,
      location,
      game_day,
      game_time,
      league_start_date,
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
    <div className="flex flex-row items-center h-max w-screen bg-light-slate">
      <div className='flex flex-col bg-indigo-500 h-screen w-1/4 items-center'>
        <DashboardNavBar />
      </div>
      <div className='flex flex-col h-screen w-full justify-start text-white bg-black'>
        <h1 className='text-xl font-bold'>{`Welcome back, ${firstName}`}</h1>
        <p className='pr-4 py-4'>Manage your teams, schedule matches, and keep track of standings all in one place.</p>
      </div>
      <div className="bg-slate-300 p-5">
        <h2>Create a League</h2>
        <form onSubmit={createLeague} className='flex flex-col'>
          <label htmlFor='title'>Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <label htmlFor='content'>Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <label htmlFor='max_teams'>Max Teams:</label>
          <br />
          <input
            type="number"
            id="max_teams"
            name="max_teams"
            required
            onChange={(e) => setMaxTeams(parseInt(e.target.value, 10) || 0)}
            value={max_teams}
          />

          <label htmlFor='location'>Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            required
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />

          <label htmlFor='location'>Game Day:</label>
          <input
            type="text"
            id="game_day"
            name="game_day"
            required
            onChange={(e) => setGameDay(e.target.value)}
            value={game_day}
          />

          <label htmlFor='game_time'>Game Time:</label>
          <input
            type="time"
            id="game_time"
            name="game_time"
            required
            onChange={(e) => setGameTime(e.target.value)}
            value={game_time}
          />

          <label htmlFor='game_date'>League Start Date:</label>
          <input
            type="date"
            id="game_date"
            name="game_date"
            required
            onChange={(e) => setLeagueStartDate(e.target.value)}
            value={league_start_date}
          />

          <br />
          <input type='submit' value='Submit'></input>
        </form>
      </div>
      <div className=' px-5 w-screen'>
        <h2 className='text-xl mb-2'>LEAGUES</h2>
        {leagues.map((league) => (
          <LeagueList league={league} onEdit={editLeague} onDelete={deleteLeague} key={league.id} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;