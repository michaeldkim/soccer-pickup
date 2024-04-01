import React, { useState, useEffect } from 'react';
import api from "../api";
import axios from "axios"
import LeagueList from "../components/LeagueList"

interface League {
  id: number;
  title: string;
  content: string;
}

const DashboardPage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([])
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("")
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
    api
      .post("/api/leagues/", { content, title })
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
    <div className="flex flex-col items-center h-screen w-screen bg-light-slate px-5">
      <div className='m-5 w-full'>
        <h1 className='text-xl font-bold'>{`Welcome back, ${firstName}`}</h1>
        <p className='pr-4 py-4'>Manage your teams, schedule matches, and keep track of standings all in one place.</p>
      </div>
      <div className='bg-purple-500 px-5 w-screen'>
        <h2 className='text-xl font-bold'>Leagues</h2>
        {leagues.map((league) => (
          <LeagueList league={league} onDelete={deleteLeague} key={league.id} />
        ))}
      </div>
      <div className="bg-slate-600 p-5">
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
          <br />
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;