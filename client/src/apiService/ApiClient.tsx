const BASE_URL: string = 'http://localhost:3000';


export async function fetchRequest<T>(): Promise<T> {
  const response = await fetch(`${BASE_URL}`);
  if (response.ok) {
      const data = await response.json();
      return data as T;
  }
  return Promise.reject(new Error('something went wrong'));
}
