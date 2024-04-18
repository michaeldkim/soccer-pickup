import React, { useState, useEffect } from 'react';
import DashboardNavBar from '../components/DashboardNavBar';

const DashboardPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("")

  useEffect(() => {
    const storedFirstName = localStorage.getItem("first_name")
    if (storedFirstName) setFirstName(storedFirstName);
    console.log(storedFirstName);
  }, [])

  return (
    <div className="flex flex-row items-center h-screen w-screen bg-light-slate">
      <div className='flex flex-col h-screen items-center'>
        <DashboardNavBar />
      </div>
      <div className='flex flex-col h-screen w-full justify-start p-5'>
        <h1 className='text-xl font-bold'>{`Welcome back, ${firstName}`}</h1>
        <p className='pr-4 py-4'>Manage your teams, schedule matches, and keep track of standings all in one place.</p>
      </div>
    </div>
  );
};

export default DashboardPage;