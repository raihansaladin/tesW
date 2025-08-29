import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    fetch('/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, email }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal menambahkan user');
        return res.json();
      })
      .then(data => {
        setResponseMessage(`Sukses: ${data.message}, id: ${data.id}`);
        setNama('');     
        setEmail('');
      })
      .catch(err => setResponseMessage(`Error: ${err.message}`));
  };

  return (
    <div>
      <h1>Response dari backend</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nama}
          placeholder="nama"
          onChange={e => setNama(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Tambah</button>
      </form>

      <p>{responseMessage}</p>
      <p>{message}</p>
    </div>
  );
}

export default App;
