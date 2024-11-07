import { Section, Modal, Placeholder, List } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
const Account = () => {

    return (
        <>
            <List
                style={{

                    padding: '20px',

                }}
            >

                <Section header="Referaal link">

                </Section>
                <Section header="Promo Code"></Section>
                <Section header="Earn"></Section>
            </List>
            <Modal
                style={{ height: '100%', background: 'red' }}
                header={<ModalHeader after={<ModalClose><i style={{ color: 'var(--tgui--plain_foreground)' }} >X</i></ModalClose>}>Only iOS header</ModalHeader>}
                trigger={<p>po</p>}
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
        </>
    );
}

export default Account;