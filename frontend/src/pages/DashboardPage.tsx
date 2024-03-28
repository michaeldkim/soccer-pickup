import React, { useState, useEffect } from 'react';
import api from "../api";

interface League {
    id: number;
    title: string;
    content: string;
}

const DashboardPage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([])
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    getLeagues();
  }, [])

  const getLeagues = () => {
    api
      .get("/api/leagues/")
      .then((res) => res.data)
      .then((data) => {setLeagues(data); console.log(data)})
      .catch((err: Error) => alert(err.message));
  }

  const deleteLeague = (id: number) => {
    api
      .delete(`/api/leagues/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("League deleted");
        else alert("Failed to make League")
        getLeagues();
      })
      .catch((err) => alert(err));
  }

  const createLeague = (e) => {
    e.preventDefault()
    api
      .post("/api/leagues", {content, title})
      .then((res) => {
        if (res.status === 201) alert("League created!");
        else alert("Failed to make league.");
        getLeagues();
      })
      .catch((err) => alert(err))
  }

  return (
    <div>
      <h1>Welcome to the Soccer Team Management Dashboard</h1>
      <p>Manage your teams, schedule matches, and keep track of standings all in one place.</p>
    </div>
  );
};

export default DashboardPage;