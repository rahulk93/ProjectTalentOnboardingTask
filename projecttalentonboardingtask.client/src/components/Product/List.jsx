import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'
import ProductCreate from './Create';
import ProductEdit from './Edit';
import ProductDelete from '../Common/Delete';

export default function List() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {
            await fetch('https://boardsite.azurewebsites.net/api/Product')
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));

        } catch (error) {
            console.error('There was a problem fetching product data:', error.message);
        }

    };

    const handleDeleteSuccess = async (isDeleted) => {

        if (isDeleted) {
            await fetchProducts();
        }
    }

    const handleUpdateSuccess = async (isUpdated) => {

        if (isUpdated) {
            await fetchProducts();
        }
    }

    const handleCreateSuccess = async (isCreated) => {

        if (isCreated) {
            await fetchProducts();
        }
    }

    const renderTableRows = (product, handleUpdateSuccess, handleDeleteSuccess) => {

        const productDeleteItem = {
            id: product.id,
            title: 'Delete Product',
            buttonText: 'DELETE',
            url: 'Product',
            redirect: 'products'
        };

        return (
            <tr key={product.id}>
                <td data-label="Name">{product.name}</td>
                <td data-label="Price">{product.price}</td>
                <td>
                    <ProductEdit
                        item={{ product }}
                        isUpdated={handleUpdateSuccess}
                    />
                </td>
                <td>
                    <ProductDelete
                        item={productDeleteItem}
                        isDeleted={handleDeleteSuccess}
                    />
                </td>
            </tr>

        )
    }


    return (
        <>

            <ProductCreate isCreated={handleCreateSuccess} />

            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>

                        renderTableRows(product, handleUpdateSuccess, handleDeleteSuccess)

                    )}

                </tbody>
            </table>
        </>
    )
}