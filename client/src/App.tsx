import { useEffect, useState } from 'react';
import './App.css'
import { fetchRequest } from './apiService/ApiClient';

function App() {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    async function getState () {
      try {
        const res = await fetchRequest<string>();
        setState(res);
      } catch (error) {
        console.log(error);
      }
    }
    getState();
  })
  return (
    <>
    <p> App is working </p>
    <p>{ state }</p>
    </>
  )
}

export default App
