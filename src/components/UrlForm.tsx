import { useState } from 'react';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await res.json();
      setResult(data.shortUrl);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error shortening URL');
    }
  };

  const handleBrowse = () => {
    window.open(result, '_blank');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button type="submit">Shorten</button>
      {result && (
        <>
          <p>Shortened URL: <a href={result} target="_blank" rel="noopener noreferrer">{result}</a></p>
          <button type="button" onClick={handleBrowse}>Browse</button>
        </>
      )}
    </form>
  );
};

export default UrlForm;
