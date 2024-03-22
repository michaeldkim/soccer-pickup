import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <nav>
                <ul className="flex justify-between">
                    <li>
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/leagues" className='hover:text-gray-300'>Leagues</Link>                   </li>
                    <li>
                        <Link to="/about" className="hover:text-gray-300">About</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;