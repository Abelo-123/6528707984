"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, List, Cell, IconContainer, Text, Input, Modal, Placeholder } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk } from '@fortawesome/free-brands-svg-icons';

const Smm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (

        <List>
            <Section header="Promo Code">
                <div className="gap-x-9  px-6 gap-y-3 place-items-center   mx-auto h-auto grid grid-cols-3 px-4 ">
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.5rem' }}>
                        <FontAwesomeIcon icon={faYoutube} color="#ff0000" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>YouTube</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faTiktok} color="#ffffff" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Tiktok</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faTelegram} color="#0088cc" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Telegram</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faFacebook} color="#1877f2" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Facebook</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faInstagram} color="#c32aa3" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Instagram</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faXTwitter} color="#ffffff" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitter/X</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faLinkedin} color="#0a66c2" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>LinkedIn</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faWhatsapp} color="#25d366" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Whatsapp</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faSpotify} color="#1ed760" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Spotify</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitch</Text>
                        </div>
                    </div>
                    <div className='common-styles' style={{ 'borderRadius': '10px', fontSize: '0.6rem' }}>
                        <FontAwesomeIcon icon={faVk} color="#4a76a8" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Vk</Text>
                        </div>
                    </div>
                </div>
            </Section>

            <List
                style={{

                    padding: '10px 10px',

                }}
            >


                <Modal
                    style={{ height: '90%', padding: '1rem', background: 'red' }}
                    header={<ModalHeader after={<ModalClose><button className='bg-blue-500 text-white absolute m-2 right-4 top-0 px-3 py-2 rounded-md'><i style={{ color: 'var(--tgui--plain_foreground)' }} >X</i></button></ModalClose>}>Only iOS header</ModalHeader>}
                    trigger={<Cell style={{ padding: '0px 20px', borderBottom: '2px solid var(--tgui--bg_color)' }} before={<IconContainer>1</IconContainer>}>
                        Chat
                    </Cell>}
                >

                    <DialogTitle>Modal Title</DialogTitle>
                    <List>
                        <Cell style={{ borderRadius: '10px', border: '1px solid blue' }}>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                        <Cell>One</Cell>
                    </List>
                </Modal>
                <Modal
                    style={{ height: '80%', background: 'blue' }}
                    header={<ModalHeader after={<ModalClose><button className='bg-blue-500 text-white absolute m-2 right-4 top-2 px-4 py-3 rounded-md'><i style={{ color: 'var(--tgui--plain_foreground)' }} >X</i></button></ModalClose>}>Only iOS header</ModalHeader>}
                    trigger={<Cell style={{ padding: '0px 20px' }} before={<IconContainer>2</IconContainer>}>
                        Data and Storage
                    </Cell>}
                >
                    <Placeholder
                        description="Description"
                        header="Title"
                    >
                        <DialogTitle>Modal Title</DialogTitle>
                        <img
                            alt="Telegram sticker"
                            src="https://xelene.me/telegram.gif"
                            style={{
                                display: 'block',
                                height: '144px',
                                width: '144px'
                            }}
                        />
                    </Placeholder>
                </Modal>

                <Button
                    mode="filled"
                    size="l"
                    style={{ 'width': '96%', 'marginLeft': '2%', 'marginTop': '2%' }}
                    onClick={openModal}
                >
                    Action
                </Button>
                {isModalOpen && (
                    <div
                        className="fixed inset-0 absolute h-screen bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            style={{ width: '90%', background: 'var(--tgui--bg_color)' }}
                            className=" modal-pop lg:w-4/12  px-2 py-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
                        >
                            <button
                                className="bg-blue-500 text-white absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={closeModal}
                            >
                                X
                            </button>
                            <h2 className="text-xl font-semibold ml-4 mb-4">Make Deposit</h2>
                            <p className="mb-4 ml-4">Enter the amount you want to deposit:</p>
                            <Input header="Input" placeholder="Write and clean me" />
                            <Input header="Input" placeholder="Write and clean me" />
                            <div className="flex mt-6  justify-between">
                                <button
                                    className="bg-blue-500 w-10/12 mx-auto text-white  px-6 py-4 rounded-md"

                                >
                                    Make Deposit
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </List>
        </List>

    );
}

export default Smm;