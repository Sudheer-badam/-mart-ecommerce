import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import Home from "./component/pages/Home";
import Categories from "./component/pages/Categories";
import Profile from "./component/pages/Profile";
import Admin from "./component/pages/Admin";
import Login from "./component/pages/Login";
import Cart from "./component/pages/Cart";
import { CartProvider } from "./component/context/CartContext";
import ApiService from "./service/ApiService";

function App() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  return (
    <CartProvider>
      <Router>
        <div className="app">
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
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
