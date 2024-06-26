// You must import useState if you are using it.
import React, { useState, Fragment, SVGProps } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { League } from '../types/types';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import api from "../api";
import axios from "axios";

interface OptionsButtonProps {
    league: League;
    refreshLeagues: () => void;
}

const OptionsButton: React.FC<OptionsButtonProps> = ({
    league,
    refreshLeagues,
}) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Instead of undefined onEdit and onDelete, now using provided props
    const handleEdit = () => {
        setIsEditModalOpen(true);// Assuming you want to call onEditConfirm here
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);// Assuming you want to call onDeleteConfirm here
    };

    const deleteLeague = (id: number) => {
        api
            .delete(`/api/leagues/${id}/delete/`)
            .then((res) => {
                if (res.status === 204) alert("League deleted");
                else alert("Failed to make League");
                refreshLeagues();
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

    const editLeague = (id: number, updatedLeague: League) => {
        console.log("UPDATED", updatedLeague)
        api
            .put(`/api/leagues/${id}/edit/`, updatedLeague)
            .then((res) => {
                console.log("RES", res);
                if (res.status === 204) alert("League updated!");
                else alert("Failed to update League");
                refreshLeagues();
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

    return (
        <div>
            <div className='top-16 w-56 text-right'>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button onClick={() => setIsOpen(!isOpen)} className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            Options
                            {isOpen ? <ChevronUpIcon
                                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                aria-hidden="true"
                            /> : <ChevronDownIcon
                                className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                aria-hidden="true"
                            />}

                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={handleEdit}
                                        >
                                            {active ? (
                                                <EditActiveIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <EditInactiveIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Edit
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={handleDelete}
                                        >
                                            {active ? (
                                                <DeleteActiveIcon
                                                    className="mr-2 h-5 w-5 text-violet-400"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <DeleteInactiveIcon
                                                    className="mr-2 h-5 w-5 text-violet-400"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            Delete
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            {/* Modals are now controlled by the state hooks and callbacks within this component */}
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                league={league}
                onConfirm={(updatedLeague) => {
                    editLeague(league.id, updatedLeague);
                    setIsEditModalOpen(false); // Close the modal on confirm
                }}
            />
            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={() => deleteLeague(league.id)} />
        </div>
    );
}

export default OptionsButton;

function EditInactiveIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    );
}

function EditActiveIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    );
}

function DeleteInactiveIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    );
}

function DeleteActiveIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    );
}