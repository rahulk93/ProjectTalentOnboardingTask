import { React, useState, useEffect } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Edit({ item, isUpdated }) {

    // states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });

    useEffect(() => {

        if (!item.product.id) {
            throw new Error('Invalid Id');
        }

        fetchProduct();

    }, [item.product.id]);

    // const
    const API_END_POINT = `https://onboardsite.azurewebsites.net/api/Product/`;

    // methods
    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage(null);
    };

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API_END_POINT + item.product.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error('There was a problem fetching product data:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_END_POINT + item.product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
            console.log('Product updated successfully');

            setMessage(<Message positive>
                <p>The product has been updated successfully.</p>
            </Message>)

            setTimeout(() => {
                handleDisplayModal()
                isUpdated(true)
            }, 3000);

        } catch (error) {

            setMessage(<Message negative>
                <p>There was an error while updating the product.</p>
            </Message>)

            console.error('There was a problem updating product:', error.message);
        }
    };

    return (
        <>
            <Modal
                onClose={handleDisplayModal}
                open={open}
                trigger={<Button className="ui orange button" onClick={handleDisplayModal} ><span className="icon-left-align"><i class="edit icon"></i></span> EDIT</Button>}
            >
                <Modal.Header>Update Product</Modal.Header>
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
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </form>

                    {message}

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
