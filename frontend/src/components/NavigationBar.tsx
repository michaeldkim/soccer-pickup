import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavigationBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuLinks = [
        { name: 'Home', to: '/' },
        { name: 'Leagues', to: '/leagues' },
        { name: 'About', to: '/about' },
        { name: 'Dashboard', to: '/dashboard' },
        { name: 'Login', to: '/login' },
    ];

    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="flex justify-between items-center">
                <nav className="hidden md:flex">
                    {menuLinks.map((link) => (
                        <Link key={link.name} to={link.to} className="hover:text-gray-300 px-4">
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <Menu as="div" className="md:hidden items-end">
                    <Menu.Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </Menu.Button>
                    <Transition
                        show={isMenuOpen}
                        enter="transition ease-out duration-100 transform"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75 transform"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Menu.Items static className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {menuLinks.map((link) => (
                                    <Menu.Item key={link.name}>
                                        {({ active }) => (
                                            <Link
                                                to={link.to}
                                                className={`${
                                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex items-center px-4 py-2 text-sm`}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    );
};

export default NavigationBar;