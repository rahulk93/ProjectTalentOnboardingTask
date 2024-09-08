import { React, useState } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Create({ isCreated }) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',

    });

    // methods
    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            // Handle success           
            console.log('Product created successfully');

            setMessage(<Message positive>
                <p>The product has been created successfully.</p>
            </Message>)


            setTimeout(() => {
                handleDisplayModal()
                isCreated(true)
            }, 3000);

        } catch (error) {

            setMessage(<Message negative>
                <p>There was an error while creating the product.</p>
            </Message>)

            console.error('There was a problem creating product:', error.message);
        }
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

                    {message}

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