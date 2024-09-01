import { React, useState, useEffect } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react';

export default function Create({ isCreated }) {

    // states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        customerId: '',
        productId: '',
        storeId: '',
        dateSold: ''

    });

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchCustomers()
        fetchProducts()
        fetchStores()

    }, []);

    // const
    const API_END_POINT = `https://onboardsite.azurewebsites.net/api/`;

    // methods
    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage(null);
    };

    const fetchCustomers = async () => {
        try {
            await fetch(`${API_END_POINT}Customer`)
                .then(response => response.json())
                .then(
                    data => setCustomers(data)
                )
                .catch(error => console.error('Error fetching customers:', error));

        } catch (error) {
            console.error('There was a problem fetching customers data:', error.message);
        }
    }

    const fetchProducts = async () => {
        try {
            await fetch(`${API_END_POINT}Product`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));

        } catch (error) {
            console.error('There was a problem fetching product data:', error.message);
        }
    }

    const fetchStores = async () => {
        try {
            await fetch(`${API_END_POINT}Store`)
                .then(response => response.json())
                .then(data => setStores(data))
                .catch(error => console.error('Error fetching stores:', error));
        } catch (error) {
            console.error('There was a problem fetching stores data:', error.message);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value);

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        try {
            const response = await fetch(`${API_END_POINT}Sale`, {
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
            console.log('Store created successfully');

            setMessage(<Message positive>
                <p>The sale has been created successfully.</p>
            </Message>)

            setTimeout(() => {
                handleDisplayModal()
                isCreated(true)
            }, 3000);


        } catch (error) {

            setMessage(<Message negative>
                <p>There was an error while creating the sale.</p>
            </Message>)

            console.error('There was a problem creating store:', error.message);
        }
    };



    return (
        <>

            <Modal
                onClose={handleDisplayModal}
                open={open}
                trigger={<Button className="ui primary button" onClick={handleDisplayModal} >New Sale</Button>}
            >
                <Modal.Header>Create Sale</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Customer</label>
                            <select className="ui search dropdown" id="customerId" name="customerId" onChange={handleChange}>
                                <option value="0">Select Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}> {customer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Product</label>
                            <select id="productId" name="productId" className="ui fluid dropdown" onChange={handleChange}>
                                <option value="0">Select Product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Store</label>
                            <select id="storeId" name="storeId" className="ui fluid dropdown" onChange={handleChange}>
                                <option value="0">Select Store</option>
                                {stores.map(store => (
                                    <option key={store.id} value={store.id}>{store.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="field">
                            <label>Date Sold (yyyy-mm-dd)</label>
                            <input
                                type="text"
                                name="dateSold"
                                placeholder="Date Sold"
                                value={formData.dateSold}
                                onChange={handleChange} />
                        </div>
                    </form>

                    {message}

                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleDisplayModal}>
                        Cancel
                    </Button>
                    <Button className="ui teal button" onClick={handleSubmit}>Create <span className="icon-wrapper"><i class="check icon"></i></span></Button>

                </Modal.Actions>
            </Modal>

        </>
    )
}