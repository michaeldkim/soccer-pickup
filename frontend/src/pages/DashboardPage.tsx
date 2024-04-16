import React, { useState, useEffect } from 'react';
import api from "../api";
import axios from "axios"
import LeagueList from "../components/LeagueList"
import DashboardNavBar from '../components/DashboardNavBar';

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
  const [firstName, setFirstName] = useState<string>("")

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

  return (
    <div className="flex flex-row items-center h-screen w-screen bg-light-slate">
      <div className='flex flex-col h-screen items-center'>
        <DashboardNavBar />
      </div>
      <div className='flex flex-col h-screen w-full justify-start text-white bg-black'>
        <h1 className='text-xl font-bold'>{`Welcome back, ${firstName}`}</h1>
        <p className='pr-4 py-4'>Manage your teams, schedule matches, and keep track of standings all in one place.</p>
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