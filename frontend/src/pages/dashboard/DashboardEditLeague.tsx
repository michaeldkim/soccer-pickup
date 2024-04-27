import React, { useState, useEffect } from 'react';
import api from "../../api";
import axios from "axios";
import LeagueInformation from "../../components/LeagueInformation"
import DashboardNavBar from '../../components/DashboardNavBar';
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

const DashboardEditLeague: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([])

  useEffect(() => { 
    getLeagues();
  }, [])

  const getLeagues = () => {
    api
      .get("/api/leagues/")
      .then((res) => res.data)
      .then((data) => { setLeagues(data); console.log(data) })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error("Patch request failed: ", error.response || error.message);
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
      <div>
        <DashboardNavBar />
      </div>
      <div className='h-screen px-5 w-screen overflow-y-scroll'>
        <h2 className='text-4xl font-bold my-2'>LEAGUES</h2>
        {leagues.map((league) => (
              <LeagueInformation league={league} refreshLeagues={getLeagues} key={league.id} />
        ))}
      </div>
    </div>
  );
};

export default DashboardEditLeague;