class CateApi {
    private static instance: CateApi
    private baseUrl: string

    private constructor() {
        this.baseUrl = '/api/admin/categories'
    }

    public static getInstance(): CateApi {
        if (!CateApi.instance) {
            CateApi.instance = new CateApi()
        }
        return CateApi.instance
    }

    public async get(endpoint: string, body: any) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        return data
    }

    public async post(endpoint: string, body: any) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        return data
    }

    public async put(endpoint: string, body: any) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        return data
    }

    public async delete(endpoint: string, body: any) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        return data
    }
}
