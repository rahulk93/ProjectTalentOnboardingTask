import { React, useState, useEffect } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Edit({ item, isUpdated }) {

    // states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({ text: null, type: null });

    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });

    useEffect(() => {

        if (!item.store.id) {
            throw new Error('Invalid Id');
        }

        fetchStore();
    }, [item.store.id]);

    // const
    const API_END_POINT = `https://boardsite.azurewebsites.net/api/Store/`;

    // methods
    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage({ text: null, type: null });
    };

    const fetchStore = async () => {
        try {
            const response = await fetch(`${API_END_POINT + item.store.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error('There was a problem fetching store data:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isFormValid = () => {
        const { name, address } = formData;
        if (!name || !address) {
            setMessage({ text: 'Please fill in all fields.', type: 'negative' });
            return false;
        }
        return true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            return; 
        }
        try {
            const response = await fetch(`${API_END_POINT + item.store.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            

            setMessage({ text: 'The store has been updated successfully.', type: 'positive' });

            setTimeout(() => {
                handleDisplayModal()
                isUpdated(true)
            }, 3000);

        } catch (error) {

            setMessage({ text: 'There was an error while updating the store.', type: 'negative' });

            console.error('There was a problem updating store:', error.message);
        }
    };


    const renderMessage = () => {
        if (!message.text) return null;

        return (
            <Message className={message.type}>
                <p>{message.text}</p>
            </Message>
        );
    };

    return (
        <>
            <Modal
                onClose={handleDisplayModal}
                open={open}
                trigger={<Button className="ui orange button" onClick={handleDisplayModal} > <span className="icon-left-align"><i class="edit icon"></i></span> EDIT</Button>}
            >
                <Modal.Header>Update Store</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleUpdate}>
                        <div className="field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                    </form>

                    {renderMessage()}

                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleDisplayModal}>
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleUpdate}>Update <span className="icon-right-align"><i class="check icon"></i></span> </Button>

                </Modal.Actions>
            </Modal>

        </>
    );
}
