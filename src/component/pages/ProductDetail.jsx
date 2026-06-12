import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import "../../style/productDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, dispatch } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiService.getProducts().then((products) => {
            const found = products.find((p) => p.id === parseInt(id));
            setProduct(found || null);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="loading-spinner"></div>
                <p>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-not-found page-container">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <button className="back-btn" onClick={() => navigate("/")}>← Back to Shop</button>
            </div>
        );
    }

    const cartItem = cart.find((item) => item.id === product.id);

    const handleAdd = () => dispatch({ type: "ADD_ITEM", payload: product });
    const handleIncrement = () => dispatch({ type: "INCREMENT_ITEM", payload: product });
    const handleDecrement = () => {
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: "DECREMENT_ITEM", payload: product });
        } else {
            dispatch({ type: "REMOVE_ITEM", payload: product });
        }
    };

    return (
        <div className="product-detail-page page-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="product-detail-card">
                <div className="product-detail-image-wrap">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-detail-img"
                    />
                    <span className="product-detail-category-badge">{product.category}</span>
                </div>

                <div className="product-detail-info">
                    <h1 className="product-detail-title">{product.name}</h1>

                    <p className="product-detail-desc">{product.description}</p>

                    <div className="product-detail-meta">
                        <div className="product-detail-meta-item">
                            <span className="meta-label">Category</span>
                            <span className="meta-value">{product.category}</span>
                        </div>
                        <div className="product-detail-meta-item">
                            <span className="meta-label">Availability</span>
                            <span className="meta-value text-success">✓ In Stock</span>
                        </div>
                        <div className="product-detail-meta-item">
                            <span className="meta-label">Shipping</span>
                            <span className="meta-value">Free above ₹500</span>
                        </div>
                    </div>

                    <div className="product-detail-price-row">
                        <span className="product-detail-price">₹{product.price.toFixed(2)}</span>
                        <span className="product-detail-gst">incl. 5% GST</span>
                    </div>

                    {cartItem ? (
                        <div className="product-detail-qty">
                            <button className="qty-btn" onClick={handleDecrement}>−</button>
                            <span className="qty-count">{cartItem.quantity}</span>
                            <button className="qty-btn" onClick={handleIncrement}>+</button>
                        </div>
                    ) : (
                        <button className="detail-add-btn" onClick={handleAdd}>
                            🛒 Add to Cart
                        </button>
                    )}

                    {cartItem && (
                        <p className="in-cart-hint">
                            ✅ <strong>{cartItem.quantity}</strong> item{cartItem.quantity > 1 ? "s" : ""} in your cart —{" "}
                            <button className="view-cart-link" onClick={() => navigate("/cart")}>View Cart →</button>
                        </p>
                    )}

                    <div className="product-detail-trust">
                        <div className="trust-item">🌿 100% Organic Certified</div>
                        <div className="trust-item">🏅 FSSAI Approved</div>
                        <div className="trust-item">🔄 7-day Return Policy</div>
                        <div className="trust-item">🚚 Fast Delivery</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
