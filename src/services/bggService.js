// src/services/bggService.js

const BGG_API_URL = 'https://boardgamegeek.com/xmlapi2';
const API_KEY = import.meta.env.VITE_BGG_API_KEY;

// --- Helper Functions para parsear el XML ---
const getText = (element, selector) => element.querySelector(selector)?.textContent || null;
const getAttr = (element, selector, attribute) => element.querySelector(selector)?.getAttribute(attribute) || null;


// Función para buscar juegos por nombre
export const searchGames = async (query) => {
  try {
    const response = await fetch(`${BGG_API_URL}/search?query=${encodeURIComponent(query)}&type=boardgame&apikey=${API_KEY}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const xmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "application/xml");

    const errorNode = doc.querySelector("error");
    if (errorNode) throw new Error(getText(errorNode, "message"));
    
    const items = Array.from(doc.querySelectorAll("item"));
    return items.map(item => ({
        id: item.getAttribute('id'),
        name: getAttr(item, 'name', 'value'),
        year: getAttr(item, 'yearpublished', 'value'), // Corregido aquí también
    }));
  } catch (error) {
    console.error("Error searching games:", error);
    return [];
  }
};

// Función para obtener detalles de juegos por sus IDs
export const getGameDetails = async (ids) => {
    if (!ids || ids.length === 0) return [];

    const idString = Array.isArray(ids) ? ids.join(',') : ids;
    try {
        const response = await fetch(`${BGG_API_URL}/thing?id=${idString}&stats=1&apikey=${API_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "application/xml");

        const items = Array.from(doc.querySelectorAll("item"));
        return items.map(item => ({
            id: item.getAttribute('id'),
            name: getAttr(item, 'name[type="primary"]', 'value'),
            image: getText(item, 'image'),
            thumbnail: getText(item, 'thumbnail'),
            description: getText(item, 'description')?.replace(/&#10;/g, '\n') || 'No description available.',
            // --- 👇 CORRECCIONES AQUÍ 👇 ---
            year: getAttr(item, 'yearpublished', 'value'),
            minPlayers: getAttr(item, 'minplayers', 'value'),
            maxPlayers: getAttr(item, 'maxplayers', 'value'),
            playingTime: getAttr(item, 'playingtime', 'value'),
            rating: parseFloat(getAttr(item, 'statistics > ratings > average', 'value') || 0).toFixed(1)
        }));
    } catch (error) {
        console.error("Error fetching game details:", error);
        return [];
    }
}