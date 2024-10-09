import { React, useState } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Create({ isCreated }) {

    // states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({ text: null, type: null });

    const [formData, setFormData] = useState({
        name: '',
        address: ''
    });

    // methods
    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage({ text: null, type: null });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }
        try {
            const response = await fetch(`https://boardsite.azurewebsites.net/api/Customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            setMessage({ text: 'The customer has been created successfully.', type: 'positive' });
            
            setTimeout(() => {
                handleDisplayModal();
                isCreated(true)
            }, 3000);


        } catch (error) {
            setMessage({ text: 'There was an error while creating the customer.', type: 'negative' });
            
            console.error('There was a problem creating customer:', error.message);
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
                trigger={<Button className="ui primary button" onClick={handleDisplayModal} >New Customer</Button>}
            >
                <Modal.Header>Create Customer</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleSubmit}>
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
                    <Button color='black' onClick={handleDisplayModal} >
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleSubmit} >Create <span className="icon-right-align"><i class="check icon"></i></span> </Button>

                </Modal.Actions>
            </Modal>
        </>
    );
}
