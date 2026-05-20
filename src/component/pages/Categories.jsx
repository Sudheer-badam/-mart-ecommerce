import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        ApiService.getCategories().then(setCategories);
    }, []);

    return (
        <div className="categories-page page-container">
            <h1>Browse Categories</h1>
            <p className="subtitle">Discover our custom-curated collections designed for elegant simplicity.</p>
            
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div className="category-card" key={index}>
                        <div className="category-card-overlay"></div>
                        <h3>{category}</h3>
                        <p>Discover premium organic grains, pulses, flours, and pantry essentials under our {category.toLowerCase()} selection.</p>
                        <a href={`/?category=${category}`} className="explore-btn">Explore Collection &rarr;</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
