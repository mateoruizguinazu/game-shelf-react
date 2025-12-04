
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

export const useLibrary = () => {
    const { user } = useAuth();
    const [collection, setCollection] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Load initial data
    useEffect(() => {
        if (user) {
            // Load from Supabase
            const fetchData = async () => {
                const { data, error } = await supabase
                    .from('user_games')
                    .select('game_id, list_type')
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error fetching user games:', error);
                } else {
                    const newCollection = data.filter(item => item.list_type === 'collection').map(item => item.game_id);
                    const newWishlist = data.filter(item => item.list_type === 'wishlist').map(item => item.game_id);
                    setCollection(newCollection);
                    setWishlist(newWishlist);
                }
            };
            fetchData();
        } else {
            // Load from LocalStorage
            const storedCollection = JSON.parse(localStorage.getItem('gameShelf_collection')) || [];
            const storedWishlist = JSON.parse(localStorage.getItem('gameShelf_wishlist')) || [];
            setCollection(storedCollection);
            setWishlist(storedWishlist);
        }
    }, [user]);

    // Helper to update DB
    const updateDb = async (gameId, listType, action) => {
        if (!user) return;

        if (action === 'add') {
            const { error } = await supabase
                .from('user_games')
                .insert([{ user_id: user.id, game_id: gameId, list_type: listType }]);
            if (error) console.error('Error adding game:', error);
        } else {
            const { error } = await supabase
                .from('user_games')
                .delete()
                .match({ user_id: user.id, game_id: gameId, list_type: listType });
            if (error) console.error('Error removing game:', error);
        }
    };

    const addToCollection = (gameId) => {
        if (!collection.includes(gameId)) {
            const newCollection = [...collection, gameId];
            setCollection(newCollection);
            if (user) {
                updateDb(gameId, 'collection', 'add');
            } else {
                localStorage.setItem('gameShelf_collection', JSON.stringify(newCollection));
            }
        }
    };

    const removeFromCollection = (gameId) => {
        const newCollection = collection.filter(id => id !== gameId);
        setCollection(newCollection);
        if (user) {
            updateDb(gameId, 'collection', 'remove');
        } else {
            localStorage.setItem('gameShelf_collection', JSON.stringify(newCollection));
        }
    };

    const addToWishlist = (gameId) => {
        if (!wishlist.includes(gameId)) {
            const newWishlist = [...wishlist, gameId];
            setWishlist(newWishlist);
            if (user) {
                updateDb(gameId, 'wishlist', 'add');
            } else {
                localStorage.setItem('gameShelf_wishlist', JSON.stringify(newWishlist));
            }
        }
    };

    const removeFromWishlist = (gameId) => {
        const newWishlist = wishlist.filter(id => id !== gameId);
        setWishlist(newWishlist);
        if (user) {
            updateDb(gameId, 'wishlist', 'remove');
        } else {
            localStorage.setItem('gameShelf_wishlist', JSON.stringify(newWishlist));
        }
    };

    const isInCollection = (gameId) => collection.includes(gameId);
    const isInWishlist = (gameId) => wishlist.includes(gameId);

    return {
        collection,
        wishlist,
        addToCollection,
        removeFromCollection,
        isInCollection,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    };
};
