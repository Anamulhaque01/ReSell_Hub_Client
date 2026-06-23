const API_URL = "http://localhost:5000/api";


export async function apiRequest(
    endpoint,
    options = {}
) {

    const response =
        await fetch(
            `${API_URL}${endpoint}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers
                },
                ...options
            }
        );


    const data =
        await response.json();


    return {
        ok: response.ok,
        data
    };

}