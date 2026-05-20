import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (isLogin) {
            const res = ApiService.login(email, password);
            if (res.success) {
                navigate("/");
                window.location.reload(); // Refresh to update nav
            } else {
                setError(res.message);
            }
        } else {
            const res = ApiService.register(name, email, password);
            if (res.success) {
                setIsLogin(true);
                alert("Account created! Please log in.");
            } else {
                setError(res.message);
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
                <p className="subtitle">{isLogin ? "Sign in to your Sudheer Mart account" : "Join us for handcrafted organic essentials"}</p>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="you@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        {isLogin ? "Sign In" : "Register"}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {isLogin ? "New to Sudheer Mart?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                            {isLogin ? "Create an account" : "Sign in here"}
                        </button>
                    </p>
                </div>
                
                <div className="demo-hint">
                    <p>💡 **Quick Tip for Testing:**</p>
                    <p>Enter any password. Email with `admin` in it grants Admin access (e.g. `admin@sudheer.com`). Any other email signs in as a normal customer.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
