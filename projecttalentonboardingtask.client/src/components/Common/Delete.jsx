import React, { useState } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Delete({ item, isDeleted }) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage(null);
    };

    const handleDelete = async () => {
        if (!item.id) {
            throw new Error('Invalid Id');
        }

        try {
            const response = await fetch(`https://boardsite.azurewebsites.net/api/${item.url}/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setMessage(
                <Message positive>
                    <p>The record has been deleted successfully.</p>
                </Message>
            );

            setTimeout(() => {
                handleDisplayModal(); 
                isDeleted(true);
            }, 3000);
        } catch (error) {
            setMessage(
                <Message negative>
                    <p>There was an error while deleting the record.</p>
                </Message>
            );
            console.error('There was a problem deleting the record:', error.message);
        }
    };

    return (
        <>
            <Modal
                onClose={handleDisplayModal}
                open={open}
                trigger={<Button className="ui red button" onClick={handleDisplayModal}> <span className="icon-right-align"><i class="trash alternate icon"></i></span> {item.buttonText} </Button>}
            >
                <Modal.Header>{item.title}</Modal.Header>
                <Modal.Content>
                    <h3>Are you sure?</h3>
                    {message}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleDisplayModal}>
                        Cancel
                    </Button>
                    <Button className="ui button red" onClick={handleDelete}>Delete  <span className="icon-right-align"><i class="x icon"></i></span> </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}