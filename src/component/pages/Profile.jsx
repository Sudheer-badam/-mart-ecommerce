import React from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const user = ApiService.getUserProfile();
    const role = localStorage.getItem("sudheer_role") || "USER";

    const handleLogout = () => {
        ApiService.logout();
        navigate("/login");
    };

    return (
        <div className="profile-page page-container">
            <div className="profile-header-card">
                <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <span className={`badge ${role === "ADMIN" ? "badge-admin" : "badge-user"}`}>{role} Account</span>
                    <p className="email">{user.email}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>

            <div className="profile-details-section">
                <h2>Order History</h2>
                <div className="orders-list">
                    <div className="order-item">
                        <div className="order-details">
                            <span className="order-id">Order #PM-98124</span>
                            <span className="order-date">Placed on May 18, 2026</span>
                        </div>
                        <div className="order-products">
                            <p>Pure Vedic A2 Cow Ghee x 1</p>
                        </div>
                        <div className="order-summary">
                            <span className="order-status badge-success">Delivered</span>
                            <span className="order-total">₹749.00</span>
                        </div>
                    </div>

                    <div className="order-item">
                        <div className="order-details">
                            <span className="order-id">Order #PM-97615</span>
                            <span className="order-date">Placed on May 10, 2026</span>
                        </div>
                        <div className="order-products">
                            <p>Premium Basmati Rice (Rozana) 5kg x 1</p>
                            <p>Organic Unpolished Toor Dal 1kg x 2</p>
                        </div>
                        <div className="order-summary">
                            <span className="order-status badge-success">Delivered</span>
                            <span className="order-total">₹849.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
