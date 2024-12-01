"use client"
import { List, Select, Input, Button, Section } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios"
import { useUser } from '../UserContext';

const Deposit = () => {
    const { userId } = useUser();  // Destructure userId from useUser hook

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenn, setIsModalOpenn] = useState(false);
    const [pm, setPm] = useState(null)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [inputColor, setInputColor] = useState(''); // State for dynamic color

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
        if (inputColor == 'blue') {
            window.alert("150")
            setIsModalOpenn(false);
        }
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setPm(value);   // Call the setPm() function
    };

    const handleDeposit = (e) => {
        const value = e.target.value;
        setAmount(value);

        // Change the color based on the value of the input
        if (value < 150) {


            setInputColor('black');  // Set the color to black when amount is less than 150
        } else {


            setInputColor('blue');  // Set the color back to blue otherwise
        }
    };
    const handleConfirm = async (e) => {
        const did = Math.floor(10000 + Math.random() * 90000); // generates a 5-digit random number


        e.preventDefault()
        const responsed = await axios.post('/api/smm/addDeposit', {
            did: did,
            uid: userId,
            pm: pm,
            amount: amount,
            name: name
        });
        console.log(responsed.data.data)
    }

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
                        className="fixed  modal-pops inset-0 absolute h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
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
                            <Select header="Select" value={pm} onChange={handleChange}>
                                <option value="">Select an option</option>
                                <option>Hello</option>
                                <option>Okay</option>
                            </Select>
                            <Input header="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Write and clean me" autoFocus />
                            <Input type="number" style={{ color: inputColor }} header="Amount" value={amount} onInput={(e) => handleDeposit(e)} placeholder="Write and clean me" />
                            <div className="flex mt-6  justify-between">
                                <button
                                    disabled={inputColor == "blue" ? true : false}
                                    id="deposit"
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
                        className="fixed  modal-pops grid content-center inset-0  bg-opacity-75 grid content-center z-50"
                    >
                        <div style={{ height: '30rem', background: 'var(--tgui--bg_color)' }} className="mx-auto my-auto modal-pop relative  p-6 rounded-lg w-11/12">
                            <div
                                onClick={() => closeModall()}

                                className=" absolute right-8 text-gray-500 px-4 py-3 mx-auto rounded-md"
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-bold mb-4">Confirm Action</h2>
                            {amount} {pm} {name}
                            <div className="flex absolute bottom-6 left-0 right-0   w-full justify-end space-x-4">
                                <button
                                    onClick={handleConfirm}
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
                        <table className="min-w-full  rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Age</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Email</th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y ">
                                <tr>
                                    <td className="px-6 py-4 text-sm ">John Doe</td>
                                    <td className="px-6 py-4 text-sm">28</td>
                                    <td className="px-6 py-4 text-sm ">john@example.com</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 text-sm">Jane Smith</td>
                                    <td className="px-6 py-4 text-sm ">32</td>
                                    <td className="px-6 py-4 text-sm ">jane@example.com</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm ">Sam Brown</td>
                                    <td className="px-6 py-4 text-sm ">24</td>
                                    <td className="px-6 py-4 text-sm ">sam@example.com</td>
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