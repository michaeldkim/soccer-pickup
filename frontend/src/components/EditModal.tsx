import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { League } from '../types/types'

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: League;
    onUpdate: (league: League) => void;
  }

export default function EditModal({ isOpen, onClose, league, onUpdate }: EditModalProps) {
    // Local state for form inputs, initialized from league props
    const [title, setTitle] = useState(league.title);
    // ... other states for each field

    // Handler for when the form is submitted
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Construct updated league object
        const updatedLeague = {
            ...league,
            title,
            // ... other fields
        };
        onUpdate(updatedLeague);
        onClose(); // Close the modal after update
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                // ... other transition properties
                >
                    {/* Overlay */}
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                        // ... other transition properties
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Edit League
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>
                                    {/* Form fields */}
                                    <label htmlFor='title'>Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    // ... other input properties
                                    />
                                    {/* ... other form inputs for editing league properties */}
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
