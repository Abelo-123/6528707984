"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, List, Cell, IconContainer, Text, Input, Modal } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk } from '@fortawesome/free-brands-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

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
            <Section header="Promo Code" style={{ border: '1px solid var(--tgui--section_bg_color)' }}>
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
                    style={{ height: '77%', padding: '1rem', background: 'var(--tgui--bg_color)' }}
                    header={<ModalHeader after={(<ModalClose>
                        <FontAwesomeIcon onClick={closeModal} icon={faClose} style={{}} size="2x" />
                    </ModalClose>)}>Only iOS header</ModalHeader>}
                    trigger={<Cell style={{ padding: '0px 20px', borderBottom: '2px solid var(--tgui--bg_color)' }} before={<IconContainer>1</IconContainer>}>
                        Chat
                    </Cell>}
                >

                    <DialogTitle style={{ color: 'var(--tgui--section_header_text_color)' }}><Text>Modal Title</Text></DialogTitle>
                    <List>
                        <ModalClose>
                            <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                                <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.3rem' }}>Twitc</div>
                            </Cell>
                        </ModalClose>
                        <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.6rem' }}>Twitc</div>
                        </Cell>
                        <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.6rem' }}>Twitc</div>
                        </Cell>
                        <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.6rem' }}>Twitc</div>
                        </Cell>
                    </List>
                </Modal>
                <Modal
                    style={{ height: '77%', background: 'var(--tgui--bg_color)' }}
                    header={<ModalHeader after={(
                        <ModalClose>
                            <FontAwesomeIcon onClick={closeModal} icon={faClose} style={{}} size="2x" />

                        </ModalClose>)}>Only iOS header</ModalHeader>}
                    trigger={<Cell style={{ padding: '0px 20px' }} before={<IconContainer>2</IconContainer>}>
                        Data and Storage
                    </Cell>}
                >

                    <DialogTitle>Modal Title</DialogTitle>
                    <List>
                        <Cell style={{ width: '100%', borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <div className='flex flex-row flex-wrap  relative w-screen place-items-center space-around'>
                                <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto 0rem' }} size="2x" />
                                <div style={{ display: 'inline', textAlign: 'center', margin: '0 1rem', fontSize: '1.6rem' }}>Twitc</div>
                                <div className='p-4 bg-red-100 inline absolute right-16 p-12 '>lorem</div>
                            </div>
                        </Cell>
                        <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.6rem' }}>Twitc</div>
                        </Cell>
                        <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.6rem' }}>Twitc</div>
                        </Cell>
                        <Cell style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                            <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div style={{ display: 'inline', textAlign: 'center', marginLeft: '1rem', fontSize: '1.6rem' }}>Twitc</div>
                        </Cell>
                    </List>
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
                        className="fixed inset-0 absolute h-screen bg-black bg-opacity-75 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            style={{ width: '90%', background: 'var(--tgui--bg_color)' }}
                            className=" modal-pop lg:w-4/12  px-2 py-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
                        >
                            <div
                                className=" text-gray-500 absolute m-2 right-0  top-0 px-4 py-3 rounded-md"
                                onClick={closeModal}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold ml-4 mb-4">Make Deposit</h2>
                            <p className="mb-4 ml-4">Enter the amount you want to deposit:</p>
                            <Input header="Input" placeholder="Write and clean me" autoFocus />
                            <Input header="Input" placeholder="Write and clean me" />
                            <div className="flex mt-6  justify-between">
                                <button
                                    style={{ background: 'var(--tgui--button_color)' }}
                                    className=" w-10/12 mx-auto text-white  px-6 py-4 rounded-md"

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