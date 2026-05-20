import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingIndex > -1) {
                const newState = [...state];
                newState[existingIndex].quantity += 1;
                return newState;
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case "INCREMENT_ITEM": {
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        case "DECREMENT_ITEM": {
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            );
        }
        case "REMOVE_ITEM": {
            return state.filter(item => item.id !== action.payload.id);
        }
        case "CLEAR_CART": {
            return [];
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem("sudheer_cart");
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem("sudheer_cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
