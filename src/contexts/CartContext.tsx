import React, { useEffect, createContext, useContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';

/// Define the type for your context value.
export type CartContextType = {
    cartItems: ProductType[];
    addToCart: (product: ProductType) => void;
    removeFromCart: (product: ProductType) => void;
    getTotalPrice: () => number;
};

export type ProductType = {
    id: number,
    quantity?: number,
    price: number,
}

/// Create context with a default value.
const CartContext = createContext<CartContextType | undefined>(undefined);

function getProduct(x: any) {
    return {
        quantity: 1,
        id: x.id,
        price: x.price
    } as ProductType;
}

/// Create a provider component.
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Array<ProductType>>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Read from cookies on initial load
    useEffect(() => {
        const cookieCart = Cookies.get('cart');
        if (cookieCart) {
            try {
                const parsedCart = JSON.parse(cookieCart) as Array<ProductType>;
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            } catch (e) {
                console.error('Failed to parse cart cookie', e);
            }
        }
        setIsLoaded(true);
    }, []);
    
    // Write to cookies whenever cart changes
    useEffect(() => {
        if (isLoaded) { // Only write after initial load
            Cookies.set('cart', JSON.stringify(cartItems), {
                expires: 7, // Expires in 7 days
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            });
        }
    }, [cartItems, isLoaded]);

    const addToCart = (product: ProductType) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === product.id);
            if (exist) {
                let newItems = prevItems.map(item => {
                    if (item.id === product.id) {
                        item.quantity = (item.quantity ?? 0) + 1;
                    }
                    return item;
                }
                )
                return newItems;
            }
            return [...prevItems, getProduct(product)];
        });
    };

    const removeFromCart = (product: ProductType) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === product.id);
            if (exist) {
                if (exist.quantity === 1) {
                    return prevItems.filter(item => item.id !== product.id);
                }
                return prevItems.map(item =>
                    item.id === product.id ? { ...exist, quantity: exist.quantity ?? 0 - 1 } : item
                );
            }
            return [];
        });

    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.quantity ?? 0) * item.price, 0);
    };

    return (
        <CartContext.Provider value={{ addToCart, getTotalPrice, removeFromCart, cartItems }}>
            {children}
        </CartContext.Provider>
    );
};


/// Custom hook to use the context.
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};