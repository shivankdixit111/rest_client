'use client';
import { useState } from 'react';
import { useContextData } from '@/context/DataContext';
import Loader from '@/components/Loader';

export default function Home() {
  const { setRefreshHistory, loading, setLoading } = useContextData();

  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);

  const removeHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const sendRequest = async () => {
    try {
      setLoading(true);

      const headersObj: Record<string, string> = {};
      headers.forEach(({ key, value }) => {
        if (key && value) headersObj[key] = value;
      });

      const httpBody = JSON.stringify({
        method,
        url,
        headers: headersObj,
        body: body ? JSON.parse(body) : undefined,
      });

      const res = await fetch('/api/sendRequest', {
        method: 'POST',
        body: httpBody,
      });

      const data = await res.json();
      console.log('req is ', data)
      setResponse(JSON.stringify(data, null, 2));
      setLoading(false);
      setRefreshHistory(prev => !prev);

      alert(res.ok ? 'Success' : 'Error');
    } catch (e: any) {
      setResponse(e.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4 font-bold">🛠️ REST Client</h1>

      <select value={method} onChange={(e) => setMethod(e.target.value)} className="mb-4 border-black border-2 rounded">
        {['GET', 'POST', 'PUT', 'DELETE'].map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <input
        className="border w-full mb-2 p-2"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Headers</h2>
        {headers.map((header, index) => (
          <div key={index} className="flex mb-2 items-center">
            <input
              className="border p-1 mr-2 flex-1"
              placeholder="Key"
              value={header.key}
              onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
            />
            <textarea
              className="border p-1 mr-2 flex-1 resize-none overflow-hidden"
              placeholder="Value"
              value={header.value}
              onChange={(e) => {
                handleHeaderChange(index, 'value', e.target.value);
                e.target.style.height = 'auto'; // Reset height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set new height
              }}
              rows={1}
            />
            <button
              onClick={() => removeHeader(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              ❌
            </button>
          </div>
        ))}
        <button className="text-blue-500 underline text-sm mt-1" onClick={addHeader}>+ Add Header</button>
      </div>

      <textarea
        className="border w-full mb-2 p-2"
        placeholder="Enter JSON body (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-300" onClick={sendRequest}>
        Send
      </button>

      <pre className="mt-4 p-4 bg-gray-100 whitespace-pre-wrap">{response}</pre>
    </main>
  );
}
