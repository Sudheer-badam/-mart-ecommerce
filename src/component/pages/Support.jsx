import React, { useState } from "react";
import "../../style/main.css"; // Reuse global style container classes

const Support = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const faqs = [
        {
            q: "How do I track my order?",
            a: "You can view all your orders and their delivery status by logging in and navigating to your 'My Account' page."
        },
        {
            q: "What is your return policy?",
            a: "We offer a 7-day hassle-free return policy for all organic produce and grocery products if they do not meet our quality standards."
        },
        {
            q: "Are all products completely organic?",
            a: "Yes! Every single item sourced at Sudheer Mart is certified organic and passes rigorous quality checks before packaging."
        },
        {
            q: "How can I contact support directly?",
            a: "You can reach us at our support hotline +91 86885 09699 or email us at badamsudheerreddy@gmail.com."
        }
    ];

    return (
        <div className="page-container support-page">
            <div className="hero-section" style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 100%)", marginBottom: "2rem" }}>
                <div className="hero-content">
                    <h1>Help & Support Center</h1>
                    <p>We are here to assist you with order inquiries, product details, or any other feedback.</p>
                </div>
            </div>

            <div className="cart-content" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2rem" }}>
                {/* Contact Form */}
                <div className="cart-items-section" style={{ padding: "2rem" }}>
                    <h2 style={{ marginBottom: "1.5rem", fontWeight: "800" }}>Send us a Message</h2>
                    {isSubmitted ? (
                        <div className="demo-hint" style={{ backgroundColor: "#ecfdf5", borderColor: "#10b981", color: "#065f46" }}>
                            <h3>Message Sent Successfully!</h3>
                            <p style={{ marginTop: "0.5rem" }}>Thank you for reaching out. A support representative will get back to you within 24 hours.</p>
                            <button 
                                className="shop-now-btn" 
                                style={{ backgroundColor: "#10b981", marginTop: "1rem" }}
                                onClick={() => setIsSubmitted(false)}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Write your message here..."
                                    rows="5"
                                    style={{
                                        padding: "0.75rem 1rem",
                                        borderRadius: "10px",
                                        border: "1px solid #e2e8f0",
                                        fontSize: "0.95rem",
                                        outline: "none",
                                        fontFamily: "inherit"
                                    }}
                                />
                            </div>
                            <button type="submit" className="submit-btn" style={{ backgroundColor: "#10b981" }}>
                                Submit Support Ticket
                            </button>
                        </form>
                    )}
                </div>

                {/* Direct Contact Info & FAQ */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div className="cart-summary-section" style={{ border: "1px solid #e2e8f0", borderRadius: "20px" }}>
                        <h3 style={{ fontWeight: "800", marginBottom: "1rem" }}>Direct Contact</h3>
                        <div style={{ marginBottom: "1rem" }}>
                            <p style={{ fontWeight: "600", fontSize: "0.9rem", color: "#64748b" }}>Support Hotline</p>
                            <p style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a" }}>+91 86885 09699</p>
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <p style={{ fontWeight: "600", fontSize: "0.9rem", color: "#64748b" }}>Email Address</p>
                            <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>badamsudheerreddy@gmail.com</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: "600", fontSize: "0.9rem", color: "#64748b" }}>Hours of Operation</p>
                            <p style={{ fontSize: "0.95rem", fontWeight: "500", color: "#334155" }}>Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
                        </div>
                    </div>

                    <div className="cart-summary-section" style={{ border: "1px solid #e2e8f0", borderRadius: "20px" }}>
                        <h3 style={{ fontWeight: "800", marginBottom: "1rem" }}>Frequently Asked Questions</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {faqs.map((faq, idx) => (
                                <div key={idx} style={{ fontSize: "0.9rem" }}>
                                    <p style={{ fontWeight: "700", color: "#0f172a", marginBottom: "0.25rem" }}>{faq.q}</p>
                                    <p style={{ color: "#475569" }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
