import { React, useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import SaleCreate from './Create';
import SaleEdit from './Edit';
import SaleDelete from '../Common/Delete';

export default function List() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {

        try {
            await fetch('https://onboardsite.azurewebsites.net/api/Sale')
                .then(response => response.json())
                .then(data => setSales(data))
                .catch(error => console.error('Error fetching sales:', error));

        } catch (error) {
            console.error('There was a problem fetching product sales:', error.message);
        }

    };

    const handleDeleteSuccess = async (isDeleted) => {

        if (isDeleted) {
            await fetchSales();
        }
    }

    const handleUpdateSuccess = async (isUpdated) => {

        if (isUpdated) {
            await fetchSales();
        }
    }

    const handleCreateSuccess = async (isCreated) => {

        if (isCreated) {
            await fetchSales();
        }
    }

    const renderTableRows = (sale, handleUpdateSuccess, handleDeleteSuccess) => {

        const saleDeleteItem = {
            id: sale.id,
            title: 'Delete Sale',
            buttonText: 'DELETE',
            url: 'Sale',
            redirect: 'sales'
        };

        return (
            <tr key={sale.id}>
                <td data-label="Customer">{sale.customer.name}</td>
                <td data-label="Product">{sale.product.name}</td>
                <td data-label="Store">{sale.store.name}</td>
                <td data-label="Date Sold">{sale.dateSold}</td>
                <td>
                    <SaleEdit
                        item={{ sale }}
                        isUpdated={handleUpdateSuccess}
                    />
                </td>
                <td>
                    <SaleDelete
                        item={saleDeleteItem}
                        isDeleted={handleDeleteSuccess}
                    />
                </td>
            </tr>

        )
    }

    return (
        <>

            <SaleCreate isCreated={handleCreateSuccess} />

            <table className="ui celled table">
                <thead>
                    <tr><th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {sales.map(sale =>
                        renderTableRows(sale, handleUpdateSuccess, handleDeleteSuccess)
                    )}

                </tbody>
            </table>

        </>
    )
}