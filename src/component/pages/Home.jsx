import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const location = useLocation();

    // Load initial products and categories
    useEffect(() => {
        ApiService.getProducts().then(setProducts);
        ApiService.getCategories().then(setCategories);
    }, []);

    // Filter products based on category and search query parameter
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get("search")?.toLowerCase() || "";

        let results = products;

        if (selectedCategory !== "All") {
            results = results.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            results = results.filter(
                p => p.name.toLowerCase().includes(searchQuery) || 
                     p.description.toLowerCase().includes(searchQuery)
            );
        }

        setFilteredProducts(results);
        setCurrentPage(1); // Reset to page 1 on search/filter
    }, [products, selectedCategory, location.search]);

    // Pagination calculations
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="home-container">
            {/* HERO SECTION */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Discover Crafted Minimalism</h1>
                    <p>Curated design objects, premium electronics, and daily essentials engineered for modern living.</p>
                </div>
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="category-section">
                <h2>Browse Categories</h2>
                <div className="category-buttons">
                    <button 
                        className={selectedCategory === "All" ? "active" : ""} 
                        onClick={() => setSelectedCategory("All")}
                    >
                        All Products
                    </button>
                    {categories.map((cat, idx) => (
                        <button 
                            key={idx}
                            className={selectedCategory === cat ? "active" : ""} 
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* PRODUCTS LIST */}
            <div className="products-grid-section">
                <div className="section-header">
                    <h2>{selectedCategory === "All" ? "All Products" : selectedCategory}</h2>
                    <span className="product-count">{filteredProducts.length} items found</span>
                </div>
                
                {filteredProducts.length > 0 ? (
                    <>
                        <ProductList products={currentProducts} />
                        {totalPages > 1 && (
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={setCurrentPage} 
                            />
                        )}
                    </>
                ) : (
                    <div className="no-products">
                        <p>No products match your search or filter selection.</p>
                        <button onClick={() => { setSelectedCategory("All"); window.history.replaceState({}, '', '/'); }}>
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
