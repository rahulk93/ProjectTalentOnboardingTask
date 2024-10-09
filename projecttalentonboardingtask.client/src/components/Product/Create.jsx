import { React, useState } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Create({ isCreated }) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({ text: null, type: null });

    const [formData, setFormData] = useState({
        name: '',
        price: '',

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
            [name]: value,
        });
    };

    const isFormValid = () => {
        const { name, price } = formData;
        if (!name || !price) {
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
            const response = await fetch('https://boardsite.azurewebsites.net/api/Product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  

            setMessage({ text: 'The product has been created successfully.', type: 'positive' });
           


            setTimeout(() => {
                handleDisplayModal()
                isCreated(true)
            }, 3000);

        } catch (error) {

            setMessage({ text: 'There was an error while creating the product.', type: 'negative' });
           

            console.error('There was a problem creating product:', error.message);
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
                trigger={<Button className="ui primary button" onClick={handleDisplayModal} >New Product</Button>}
            >
                <Modal.Header>Create Product</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleSubmit}>

                        <div className="field">
                            <label> Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="field">
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange} />
                        </div>

                    </form>

                    {renderMessage()}

                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleDisplayModal} >
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleSubmit}>Create <span className="icon-right-align"><i class="check icon"></i></span></Button>

                </Modal.Actions>
            </Modal>



        </>
    )
}