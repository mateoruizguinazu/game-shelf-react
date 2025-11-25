export default async function handler(req, res) {
    const { path } = req.query;
    const queryParams = new URLSearchParams(req.query);
    queryParams.delete('path'); // Remove the path param used for routing

    const targetUrl = `https://boardgamegeek.com/xmlapi2/${Array.isArray(path) ? path.join('/') : path}?${queryParams.toString()}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.VITE_BGG_API_TOKEN}`
            }
        });

        const data = await response.text();

        res.status(response.status).send(data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Error fetching data from BGG' });
    }
}
