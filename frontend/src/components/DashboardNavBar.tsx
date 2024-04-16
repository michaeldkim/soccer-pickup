import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavBar: React.FC = () => {
  const menuLinks = [
    { name: 'Home', to: '/dashboard' },
    { name: 'Leagues', to: '/dashboard/leagues' },
  ];

  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="flex flex-col justify-between items-start ">
        <nav>
          {menuLinks.map((link) => (
            <Link key={link.name} to={link.to} className="hover:text-gray-300 px-4 py-2 block"> {/* Added py-2 and block */}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DashboardNavBar;
