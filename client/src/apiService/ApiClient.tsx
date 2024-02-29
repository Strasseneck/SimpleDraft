const BASE_URL: string = 'http://localhost:3000';

// reusable fetch request function 
export async function apiClient<T>(
  endpoint: string,
  method: string = 'GET', // Default GET method
  body?: any // Optional parameter for request body
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json' 
    },
    body: body ? JSON.stringify(body) : undefined 
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (response.ok) {
    return response.json() as unknown as T;
  }
  return Promise.reject(new Error('Something went wrong'));
}
