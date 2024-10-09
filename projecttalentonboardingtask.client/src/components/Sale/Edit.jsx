import { React, useState, useEffect } from 'react';
import { Modal, Button, Message } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Edit({ item, isUpdated }) {

    // states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({ text: null, type: null });

    const [formData, setFormData] = useState({
        customerId: '',
        productId: '',
        storeId: '',
        dateSold: null
    });

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchCustomers()
        fetchProducts()
        fetchStores()
    }, []);



    useEffect(() => {

        if (!item.sale.id) {
            throw new Error('Invalid Id');
        }

        fetchSale();

    }, [item.sale.id]);

    // const
    const API_END_POINT = `https://boardsite.azurewebsites.net/api/`;

    // methods
    const handleDisplayModal = () => {
        setOpen(!open);
        setMessage({ text: null, type: null });
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

    const fetchSale = async () => {
        try {
            const response = await fetch(`${API_END_POINT}Sale/${item.sale.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData({
                ...data,
                dateSold: new Date(data.dateSold),  
            });
        } catch (error) {
            console.error('There was a problem fetching sale data:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dateSold: date,
        });
    };

    const isFormValid = () => {
        const { customerId, productId, storeId, dateSold } = formData;
        if (!customerId || !productId || !storeId || !dateSold) {
            setMessage({ text: 'Please fill in all fields and select a date.', type: 'negative' });
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
            const response = await fetch(`${API_END_POINT}Sale/${item.sale.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
 

            setMessage({ text: 'The sale has been updated successfully.', type: 'positive' });
            

            setTimeout(() => {
                handleDisplayModal()
                isUpdated(true)
            }, 3000);

        } catch (error) {

            setMessage({ text: 'There was an error while updating the sale.', type: 'negative' });
            

            console.error('There was a problem updating sale:', error.message);
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
                <Modal.Header>Update Sale</Modal.Header>
                <Modal.Content>
                    <form className="ui form" onSubmit={handleUpdate}>

                        <div className="field">
                            <label>Customer</label>
                            <select className="ui search dropdown" id="customerId" name="customerId" onChange={handleChange} value={formData.customerId}>
                                <option value="0">Select Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}> {customer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Product</label>
                            <select id="productId" name="productId" className="ui fluid dropdown" onChange={handleChange} value={formData.productId}>
                                <option value="0">Select Product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Store</label>
                            <select id="storeId" name="storeId" className="ui fluid dropdown" onChange={handleChange} value={formData.storeId}>
                                <option value="0">Select Store</option>
                                {stores.map(store => (
                                    <option key={store.id} value={store.id} >{store.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="field">
                            <label>Date Sold</label>
                            <DatePicker
                                selected={formData.dateSold}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select Date Sold"
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
