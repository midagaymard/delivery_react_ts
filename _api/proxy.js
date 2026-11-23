export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    const path = req.url.replace(/^\/api\/proxy/, '');
    const targetUrl = `https://purpleschool.ru/pizza-api-demo${path}`;

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:5173',
                'Referer': 'http://localhost:5173/',
            },
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
        });

        const data = await response.text();

        res.status(response.status).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка прокси', details: error.message });
    }
}