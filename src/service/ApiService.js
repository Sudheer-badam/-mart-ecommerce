class ApiService {
    static BASE_URL = "http://localhost:8080/api"; // Reference to back-end API

    // Auth actions using localStorage for mock capability
    static isAuthenticated() {
        const token = localStorage.getItem("sudheer_token");
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem("sudheer_role");
        return role === "ADMIN";
    }

    static login(email, password) {
        if (email && password) {
            localStorage.setItem("sudheer_token", "mock-jwt-token-12345");
            if (email.toLowerCase().includes("admin")) {
                localStorage.setItem("sudheer_role", "ADMIN");
            } else {
                localStorage.setItem("sudheer_role", "USER");
            }
            localStorage.setItem("sudheer_user", JSON.stringify({ email, name: email.split("@")[0] }));
            return { success: true };
        }
        return { success: false, message: "Invalid credentials" };
    }

    static register(name, email, password) {
        return { success: true, message: "Registration successful" };
    }

    static logout() {
        localStorage.removeItem("sudheer_token");
        localStorage.removeItem("sudheer_role");
        localStorage.removeItem("sudheer_user");
    }

    static getUserProfile() {
        const user = localStorage.getItem("sudheer_user");
        return user ? JSON.parse(user) : { name: "Guest User", email: "guest@example.com" };
    }

    // Mock products data
    static MOCK_PRODUCTS = [
        {
            id: 1,
            name: "Aashirvaad Shudh Chakki Atta",
            description: "100% pure whole wheat flour processed using traditional stone-ground chakki process. Rich in dietary fiber. 5kg Pack.",
            price: 260.00,
            imageUrl: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 2,
            name: "Premium Basmati Rice (Rozana)",
            description: "Aromatic extra-long grain aged Basmati rice, perfect for daily biryani, pulao, and steam rice. 5kg Pack.",
            price: 499.00,
            imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
            category: "Rice & Rice Products"
        },
        {
            id: 3,
            name: "Tata Sampann Unpolished Toor Dal",
            description: "High-protein, nutritious, and unpolished split pigeon peas, sourced from the best farms. 1kg Pack.",
            price: 185.00,
            imageUrl: "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?w=500&auto=format&fit=crop&q=60",
            category: "Dals & Pulses"
        },
        {
            id: 4,
            name: "Fortune Premium Kachi Ghani Mustard Oil",
            description: "100% pure mustard oil extracted using cold pressed traditional process, high pungency and rich taste. 1 Liter.",
            price: 175.00,
            imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60",
            category: "Spices & Oils"
        },
        {
            id: 5,
            name: "Organic Foxtail Millet (Kangni)",
            description: "Nutrient-rich, gluten-free smart grain containing high protein, healthy fiber, and vital minerals. 1kg Pack.",
            price: 145.00,
            imageUrl: "https://images.unsplash.com/photo-1536304997881-a372c179924b?w=500&auto=format&fit=crop&q=60",
            category: "Millets & Superfoods"
        },
        {
            id: 6,
            name: "BB Royal Organic Jowar Flour (Sorghum)",
            description: "Gluten-free traditional flour milled from premium organic sorghum grains. Highly nutritious. 1kg Pack.",
            price: 120.00,
            imageUrl: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 7,
            name: "Aashirvaad Multi-Grain Atta (6 Grains)",
            description: "Power-packed flour containing wheat, soya, channa, oats, maize, and psyllium husk for active digestion. 5kg Pack.",
            price: 310.00,
            imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 8,
            name: "Organic Tattva Moong Dal Split",
            description: "Quick-cooking organic yellow split moong dal, easy to digest and packed with natural proteins. 1kg Pack.",
            price: 195.00,
            imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=60",
            category: "Dals & Pulses"
        },
        {
            id: 9,
            name: "Fortune Biryani Special Basmati Rice",
            description: "Extra long grains that expand up to double their size when cooked. Superb aroma, non-sticky texture. 5kg Pack.",
            price: 649.00,
            imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
            category: "Rice & Rice Products"
        },
        {
            id: 10,
            name: "BB Royal Organic Bajra Flour (Pearl Millet)",
            description: "Freshly milled pearl millet flour, traditional winter dietary grain rich in iron and phosphorus. 1kg Pack.",
            price: 110.00,
            imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 11,
            name: "Aashirvaad Svasti Pure Cow Ghee",
            description: "100% pure cow ghee with rich granular texture, delightful aroma, made using slow-cook process. 1 Liter.",
            price: 695.00,
            imageUrl: "https://images.unsplash.com/photo-1589733901241-5e53429e1dbf?w=500&auto=format&fit=crop&q=60",
            category: "Spices & Oils"
        },
        {
            id: 12,
            name: "Organic Ragi Flour (Finger Millet)",
            description: "Traditional South Indian organic finger millet powder, calcium-rich, perfect for ragi mudde or porridge. 1kg Pack.",
            price: 85.00,
            imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 13,
            name: "Tata Sampann Kabuli Chana (Jumbo)",
            description: "Jumbo-sized, premium handpicked chickpeas, rich in folate, iron, and fiber. Ideal for chole. 1kg Pack.",
            price: 165.00,
            imageUrl: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=500&auto=format&fit=crop&q=60",
            category: "Dals & Pulses"
        },
        {
            id: 14,
            name: "BB Royal Roasted Sooji (Rava)",
            description: "Premium double-refined semolina, pre-roasted to prevent bugs, perfect for instant upma, halwa, or idli. 1kg Pack.",
            price: 75.00,
            imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 15,
            name: "Tata Iodized Cooking Salt",
            description: "The nation's standard iodized salt, ensures healthy mental growth and physical body functions. 1kg Pack.",
            price: 28.00,
            imageUrl: "https://images.unsplash.com/photo-1518110168928-20b19f1ec57b?w=500&auto=format&fit=crop&q=60",
            category: "Spices & Oils"
        },
        {
            id: 16,
            name: "Organic Amaranth Flour (Rajgira)",
            description: "Gluten-free nutrient powerhouse flour, extremely high in calcium and amino acids, great for fasting recipes. 500g.",
            price: 99.00,
            imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
            category: "Atta & Flours"
        },
        {
            id: 17,
            name: "Pampers Premium Care Baby Diapers (Large)",
            description: "Softest ever Pampers diapers with 360-degree cottony softness and wetness indicator. Pack of 44.",
            price: 699.00,
            imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&auto=format&fit=crop&q=60",
            category: "Baby Care"
        },
        {
            id: 18,
            name: "Himalaya Gentle Baby Wipes",
            description: "Extra soft, alcohol-free wet wipes enriched with Aloe Vera and Indian Lotus for gentle cleansing. Pack of 2 (72 units each).",
            price: 199.00,
            imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=60",
            category: "Baby Care"
        },
        {
            id: 19,
            name: "Johnson's Baby Daily Moisture Lotion",
            description: "Classic mild baby lotion with coconut oil, keeps delicate skin soft, smooth and feeling healthy. 500ml.",
            price: 350.00,
            imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60",
            category: "Baby Care"
        },
        {
            id: 20,
            name: "Sebamed Baby Cleansing Bar",
            description: "100% soap and alkali-free mild baby cleansing bar with pH 5.5 for delicate, sensitive skin. 100g.",
            price: 299.00,
            imageUrl: "https://images.unsplash.com/photo-1605648812658-0051a806c9a7?w=500&auto=format&fit=crop&q=60",
            category: "Baby Care"
        }
    ];

    static getProducts() {
        return Promise.resolve(this.MOCK_PRODUCTS);
    }

    static getCategories() {
        return Promise.resolve(["Atta & Flours", "Dals & Pulses", "Rice & Rice Products", "Millets & Superfoods", "Spices & Oils", "Baby Care"]);
    }
}

export default ApiService;
