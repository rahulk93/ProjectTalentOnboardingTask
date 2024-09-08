import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import CustomerCreate from './Create';
import CustomerEdit from './Edit';
import CustomerDelete from '../Common/Delete';

export default function List() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        try {
            await fetch('https://boardsite.azurewebsites.net/api/Customer')
                .then(response => response.json())
                .then(data => setCustomers(data))
                .catch(error => console.error('Error fetching customers:', error));

        } catch (error) {
            console.error('There was a problem fetching customers data:', error.message);
        }
    }

    const handleDeleteSuccess = async (isDeleted) => {

        if (isDeleted) {
            await fetchCustomers();
        }
    }

    const handleUpdateSuccess = async (isUpdated) => {

        if (isUpdated) {
            await fetchCustomers();
        }
    }

    const handleCreateSuccess = async (isCreated) => {

        if (isCreated) {
            await fetchCustomers();
        }
    }

    const renderTableRows = (customer, handleUpdateSuccess, handleDeleteSuccess) => {

        const customerDeleteItem = {
            id: customer.id,
            title: 'Delete Customer',
            buttonText: 'DELETE',
            url: 'Customer',
            redirect: ''
        };

        return (
            <tr key={customer.id}>
                <td data-label="Name">{customer.name}</td>
                <td data-label="Address">{customer.address}</td>
                <td>
                    <CustomerEdit
                        item={{ customer }}
                        isUpdated={handleUpdateSuccess}
                    />
                </td>
                <td>
                    <CustomerDelete
                        item={customerDeleteItem}
                        isDeleted={handleDeleteSuccess}

                    />
                </td>
            </tr>
        )
    }

    return (
        <>

            <CustomerCreate isCreated={handleCreateSuccess} />

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        renderTableRows(customer, handleUpdateSuccess, handleDeleteSuccess)

                    )}

                </tbody>
            </table>

        </>
    )
}