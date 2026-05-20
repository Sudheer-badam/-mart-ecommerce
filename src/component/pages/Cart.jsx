import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, dispatch } = useCart();

    const handleIncrement = (item) => {
        dispatch({ type: "INCREMENT_ITEM", payload: item });
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: "DECREMENT_ITEM", payload: item });
        } else {
            dispatch({ type: "REMOVE_ITEM", payload: item });
        }
    };

    const handleRemove = (item) => {
        dispatch({ type: "REMOVE_ITEM", payload: item });
    };

    const handleClear = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    // Calculate total price
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 || subtotal === 0 ? 0 : 49.00;
    const tax = subtotal * 0.05; // 5% GST on groceries
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        alert("Thank you for your order! Checkout was simulated successfully.");
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <div className="cart-page page-container">
            <h1>Shopping Cart</h1>
            <p className="subtitle">Review your items and proceed to checkout.</p>

            {cart.length > 0 ? (
                <div className="cart-content">
                    {/* Cart Items List */}
                    <div className="cart-items-section">
                        <div className="cart-actions-header">
                            <span>{cart.length} unique items</span>
                            <button className="clear-cart-btn" onClick={handleClear}>Clear Cart</button>
                        </div>

                        <div className="cart-items-list">
                            {cart.map(item => (
                                <div className="cart-item-row" key={item.id}>
                                    <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-desc">{item.description}</p>
                                    </div>
                                    <div className="cart-item-qty">
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                    </div>
                                    <div className="cart-item-price">
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        <button className="remove-item-btn" onClick={() => handleRemove(item)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Order Summary Side Card */}
                    <div className="cart-summary-section">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="summary-row">
                            <span>Estimated GST (5%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Secure Checkout
                        </button>
                        <p className="shipping-hint">✨ Free shipping on orders over ₹500.00!</p>
                    </div>
                </div>
            ) : (
                <div className="empty-cart-view">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="shop-now-btn">Start Shopping</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
