import { useState, useEffect } from 'react';

export const useLibrary = () => {
    // Collection (My Shelf)
    const [collection, setCollection] = useState(() => {
        const saved = localStorage.getItem('gameShelf_collection');
        return saved ? JSON.parse(saved) : [];
    });

    // Wishlist
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('gameShelf_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('gameShelf_collection', JSON.stringify(collection));
    }, [collection]);

    useEffect(() => {
        localStorage.setItem('gameShelf_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Actions
    const addToCollection = (gameId) => {
        setCollection(prev => {
            if (prev.includes(gameId)) return prev;
            return [...prev, gameId];
        });
        // Optional: Remove from wishlist if added to collection? 
        // Let's keep them independent for now, or maybe remove from wishlist is better UX.
        // User said "keep the idea of the wishlist but separated". 
        // Usually if you own it, you don't want it.
        removeFromWishlist(gameId);
    };

    const removeFromCollection = (gameId) => {
        setCollection(prev => prev.filter(id => id !== gameId));
    };

    const inCollection = (gameId) => collection.includes(gameId);

    const addToWishlist = (gameId) => {
        setWishlist(prev => {
            if (prev.includes(gameId)) return prev;
            return [...prev, gameId];
        });
    };

    const removeFromWishlist = (gameId) => {
        setWishlist(prev => prev.filter(id => id !== gameId));
    };

    const inWishlist = (gameId) => wishlist.includes(gameId);

    return {
        collection,
        addToCollection,
        removeFromCollection,
        inCollection,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        inWishlist
    };
};
