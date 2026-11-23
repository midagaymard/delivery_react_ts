export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const path = req.url.startsWith('/api/proxy') ? req.url.replace('/api/proxy', '') : req.url;

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const targetUrl = `https://purpleschool.ru/pizza-api-demo${cleanPath}`;

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (req.headers.authorization) {
            headers['Authorization'] = req.headers.authorization;
        }

        const fetchOptions = {
            method: req.method,
            headers: headers,
        };

        if (!['GET', 'HEAD'].includes(req.method)) {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            fetchOptions.body = Buffer.concat(buffers);
        }

        const response = await fetch(targetUrl, fetchOptions);
        const data = await response.text();

        res.status(response.status).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка прокси', details: error.message });
    }
}