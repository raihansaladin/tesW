import react, {useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/hello')
    .then(response => response.text())
    .then(data => setMessage(data))
    .catch(err => console.error('Error  fetching: ', err));
  }, []);

  return (
    <div>
      <h1>Response dari backend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
