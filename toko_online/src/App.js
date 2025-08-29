import react, {useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  
  useEffect(() => {
    fetch('/hello')
    .then(response => response.text())
    .then(data => setMessage(data))
    .catch(err => console.error('Error  fetching: ', err));
  }, []);
  
  const SendtoBack = () => {
    fetch('/data', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputValue }),
    })
    .then(response => response.text())
    .then(data => setMessage(data))
  }
  return (
    <div>
      <h1>Response dari backend</h1>
      <p>{message}</p>
      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
      <button type='button' onClick={SendtoBack()}>Kirim </button>
    </div>
  );

}

export default App;
