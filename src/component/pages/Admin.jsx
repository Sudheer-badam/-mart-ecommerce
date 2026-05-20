import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

const Admin = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        ApiService.getProducts().then(setProducts);
    }, []);

    return (
        <div className="admin-page page-container">
            <h1>Admin Dashboard</h1>
            <p className="subtitle">Manage store inventory, view sales metrics, and fulfill customer orders.</p>

            <div className="admin-metrics">
                <div className="metric-card">
                    <h4>Total Sales</h4>
                    <span className="metric-value">₹1,24,805.00</span>
                    <span className="metric-trend text-success">+18% this week</span>
                </div>
                <div className="metric-card">
                    <h4>Total Orders</h4>
                    <span className="metric-value">148</span>
                    <span className="metric-trend text-success">+6% this week</span>
                </div>
                <div className="metric-card">
                    <h4>Products Listed</h4>
                    <span className="metric-value">{products.length}</span>
                    <span className="metric-trend">In stock</span>
                </div>
            </div>

            <div className="admin-inventory-section">
                <div className="section-header">
                    <h2>Store Inventory</h2>
                    <button className="add-product-btn">+ Add Product</button>
                </div>

                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>#{p.id}</td>
                                <td>
                                    <img src={p.imageUrl} alt={p.name} className="inventory-img" />
                                </td>
                                <td className="font-bold">{p.name}</td>
                                <td>{p.category}</td>
                                <td>₹{p.price.toFixed(2)}</td>
                                <td><span className="badge badge-success">In Stock</span></td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
