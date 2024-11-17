"use client"
import { List, Input, Button, Section } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Deposit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenn, setIsModalOpenn] = useState(false);


    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModall = () => {
        setIsModalOpenn(false);
    };

    const openModall = () => {
        setIsModalOpenn(true);
    };

    return (
        <>
            <List
                style={{

                    padding: '20px',

                }}
            >
                <Button
                    mode="filled"
                    size="l"
                    style={{ marginLeft: '50%' }}
                    onClick={openModal}
                    before="+"
                >
                    Make Deposit
                </Button>
                {isModalOpen && (
                    <div
                        className="fixed inset-0 absolute h-screen bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={closeModal}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Make Deposit</h2>
                            <p className="mb-4">Enter the amount you want to deposit:</p>
                            <Input header="Input" placeholder="Write and clean me" autoFocus />
                            <Input header="Input" placeholder="Write and clean me" />
                            <div className="flex mt-6  justify-between">
                                <button
                                    style={{ background: 'var(--tgui--button_color)' }}
                                    className=" w-full text-white px-6 py-4 rounded-md"
                                    onClick={openModall}
                                >
                                    Make Deposit
                                </button>

                            </div>
                        </div>
                    </div>
                )}
                {isModalOpenn && (
                    <div
                        className="fixed  inset-0  bg-opacity-75 flex justify-center items-center z-50"
                    >
                        <div style={{ 'height': '80%', background: 'var(--tgui--bg_color)' }} className="modal-pop relative  p-6 rounded-lg w-11/12">
                            <div
                                onClick={() => closeModall()}

                                className=" absolute right-8 text-gray-500 px-4 py-3 mx-auto rounded-md"
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-bold mb-4">Confirm Action</h2>

                            <div className="flex absolute bottom-6 left-0 right-0   w-full justify-end space-x-4">
                                <button
                                    style={{ background: 'var(--tgui--button_color)' }}
                                    className="bg-blue-500  text-white px-6 py-4 mx-auto w-10/12 rounded-md"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Section header="Order History" style={{ marginTop: '-1rem', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div style={{ borderRadius: '20PX' }} className="overflow-x-auto">
                        <table style={{ background: 'var(--tgui--header_bg_color)' }} className="min-w-full   border  rounded-lg shadow-md">
                            <thead style={{ background: 'var(--tgui--secondary_bg_color)' }}  >
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Age</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-900">John Doe</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">28</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">john@example.com</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">32</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">jane@example.com</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-900">Sam Brown</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">24</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">sam@example.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>
            </List >
        </>
    );
}

export default Deposit;