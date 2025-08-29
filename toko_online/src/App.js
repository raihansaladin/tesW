import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add initial message
    setMessages([{ 
      type: 'info', 
      content: 'Aplikasi siap. Klik "Kirim" untuk mengirim data ke backend.' 
    }]);
    
    // Fetch initial hello message
    fetch('http://localhost:5000/hello')
      .then(response => response.text())
      .then(data => {
        setMessages(prev => [...prev, { 
          type: 'response', 
          content: `GET /hello: ${data}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      })
      .catch(err => {
        setMessages(prev => [...prev, { 
          type: 'error', 
          content: `Error fetching: ${err.message}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      });
  }, []);

  const SendtoBack = () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    // Add request to message history
    setMessages(prev => [...prev, { 
      type: 'request', 
      content: `POST /data: ${inputValue}`,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    fetch('http://localhost:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputValue }),
    })
      .then(response => response.text())
      .then(data => {
        setMessages(prev => [...prev, { 
          type: 'response', 
          content: `Response: ${data}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
        setInputValue('');
      })
      .catch(err => {
        setMessages(prev => [...prev, { 
          type: 'error', 
          content: `Error sending data: ${err.message}`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      SendtoBack();
    }
  };

  const clearHistory = () => {
    setMessages([{ 
      type: 'info', 
      content: 'Riwayat dibersihkan. Kirim data baru untuk melihat respons.',
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        React dengan Express Backend
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#3498db', marginTop: 0 }}>Kirim Data ke Backend</h2>
        
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <input 
            type='text' 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik data yang ingin dikirim"
            style={{
              padding: '12px',
              flex: 1,
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '16px',
              marginRight: '10px'
            }}
          />
          
          <button 
            onClick={SendtoBack}
            disabled={!inputValue.trim() || isLoading}
            style={{
              padding: '12px 24px',
              backgroundColor: inputValue.trim() && !isLoading ? '#2ecc71' : '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              minWidth: '100px'
            }}
          >
            {isLoading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
        
        <p style={{ fontSize: '14px', color: '#7f8c8d', margin: 0 }}>
          Tekan Enter atau klik Kirim untuk mengirim data
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#3498db', marginTop: 0 }}>Riwayat Request & Response</h2>
          <button 
            onClick={clearHistory}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Bersihkan
          </button>
        </div>
        
        <div style={{ 
          height: '400px', 
          overflowY: 'auto',
          border: '1px solid #ecf0f1',
          borderRadius: '4px',
          padding: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          {messages.length === 0 ? (
            <p style={{ color: '#7f8c8d', textAlign: 'center' }}>Tidak ada riwayat</p>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  backgroundColor: 
                    msg.type === 'request' ? '#d6eaf8' : 
                    msg.type === 'response' ? '#d5f5e3' : 
                    msg.type === 'error' ? '#fadbd8' : '#f8f9f9',
                  borderLeft: 
                    msg.type === 'request' ? '4px solid #3498db' : 
                    msg.type === 'response' ? '4px solid #2ecc71' : 
                    msg.type === 'error' ? '4px solid #e74c3c' : '4px solid #7f8c8d'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: 
                      msg.type === 'request' ? '#3498db' : 
                      msg.type === 'response' ? '#27ae60' : 
                      msg.type === 'error' ? '#c0392b' : '#7f8c8d'
                  }}>
                    {msg.type === 'request' ? 'REQUEST' : 
                     msg.type === 'response' ? 'RESPONSE' : 
                     msg.type === 'error' ? 'ERROR' : 'INFO'}
                  </span>
                  {msg.timestamp && (
                    <span style={{ color: '#7f8c8d', fontSize: '12px' }}>
                      {msg.timestamp}
                    </span>
                  )}
                </div>
                <p style={{ margin: '8px 0 0 0', wordBreak: 'break-word' }}>{msg.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#3498db', marginTop: 0 }}>Informasi</h3>
        <p style={{ color: '#7f8c8d' }}>
          Backend berjalan di port 5000. Pastikan server Express sedang berjalan.
        </p>
        <p style={{ color: '#7f8c8d' }}>
          Endpoint yang tersedia:
        </p>
        <ul style={{ color: '#7f8c8d' }}>
          <li><strong>GET /hello</strong> - Mengembalikan salam dari server</li>
          <li><strong>POST /data</strong> - Menerima data dan mengembalikan konfirmasi</li>
        </ul>
      </div>
    </div>
  );
}

export default App;