import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import StoreCreate from './Create';
import StoreEdit from './Edit';
import StoreDelete from '../Common/Delete';
export default function List() {

    const [stores, setStores] = useState([]);

    useEffect(() => {

        fetchStores();

    }, []);

    const fetchStores = async () => {

        try {
            await fetch('https://onboardsite.azurewebsites.net/api/Store')
                .then(response => response.json())
                .then(data => setStores(data))
                .catch(error => console.error('Error fetching stores:', error));

        } catch (error) {
            console.error('There was a problem fetching stores data:', error.message);
        }

    };

    const handleDeleteSuccess = async (isDeleted) => {

        if (isDeleted) {
            await fetchStores();
        }
    }

    const handleUpdateSuccess = async (isUpdated) => {

        if (isUpdated) {
            await fetchStores();
        }
    }

    const handleCreateSuccess = async (isCreated) => {

        if (isCreated) {
            await fetchStores();
        }
    }

    const renderTableRows = (store, handleUpdateSuccess, handleDeleteSuccess) => {

        const storeDeleteItem = {
            id: store.id,
            title: 'Delete Store',
            buttonText: 'DELETE',
            url: 'Store',
            redirect: 'stores'
        };

        return (
            <tr key={store.id}>
                <td data-label="Name">{store.name}</td>
                <td data-label="Address">{store.address}</td>
                <td>
                    <StoreEdit
                        item={{ store }}
                        isUpdated={handleUpdateSuccess}
                    />
                </td>
                <td>
                    <StoreDelete
                        item={storeDeleteItem}
                        isDeleted={handleDeleteSuccess}
                    />
                </td>
            </tr>
        )

    }

    return (
        <>
            <StoreCreate isCreated={handleCreateSuccess} />

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        renderTableRows(store, handleUpdateSuccess, handleDeleteSuccess)
                    )}

                </tbody>
            </table>
        </>
    )
}