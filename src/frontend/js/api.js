export async function apiCall(url, data = {}, method = 'GET') {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'GET' ? JSON.stringify(data) : null
    };
    const response = await fetch(url, options);
    return response.json();
}