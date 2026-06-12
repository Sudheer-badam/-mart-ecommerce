import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import Home from "./component/pages/Home";
import Categories from "./component/pages/Categories";
import Profile from "./component/pages/Profile";
import Admin from "./component/pages/Admin";
import Login from "./component/pages/Login";
import Cart from "./component/pages/Cart";
import Support from "./component/pages/Support";
import { CartProvider } from "./component/context/CartContext";
import ApiService from "./service/ApiService";
import IntroScreen from "./component/common/IntroScreen";

function App() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CartProvider>
      <Router>
        <div className="app">
          {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
          {/* Global Header Navigation */}
          <Navbar />

          {/* Main App Body with Routed Content */}
          <div className="content-body">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/support" element={<Support />} />

              {/* Protected Customer Profile Route */}
              <Route 
                path="/profile" 
                element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} 
              />

              {/* Protected Administrator Dashboard Route */}
              <Route 
                path="/admin" 
                element={isAdmin ? <Admin /> : <Navigate to="/login" replace />} 
              />

              {/* Wildcard Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Global Site Footer — FSSAI Certification Badge */}
          <footer className="site-footer">
            <div className="site-footer-inner">
              <span className="site-footer-label">Food Safety Certified</span>
              <img
                src="./Screenshot 2026-06-05 165026.png"
                alt="FSSAI Certified"
                className="site-footer-fssai"
              />
              <p className="site-footer-copy">© {new Date().getFullYear()} Badam Mart. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
