// src/hooks/useInfiniteScroll.js
import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback, hasMore, isLoading) => {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && hasMore && !isLoading) {
                callback();
            }
        }, { threshold: 1.0 });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [callback, hasMore, isLoading]);

    return observerRef;
};
