'use client'
import React, { useState, useEffect } from 'react';

interface MessageResponse {
  message: string;
}

const HomeComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await fetch('http://localhost:8000/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MessageResponse = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError(`${err}`);
      console.error('Error fetching message:', err);
    }
  };

  const submitName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MessageResponse = await response.json();
      setGreeting(data.message);
      setName('');
    } catch (err) {
      setError('Failed to submit name');
      console.error('Error submitting name:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <p className="mb-4">{message}</p>

      <form onSubmit={submitName} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border p-2 mr-2 text-black"
        />
        <button type="submit" className="bg-blue-500 text-black p-2 rounded">
          Submit
        </button>
      </form>

      {greeting && <p className="mb-4">{greeting}</p>}
    </div>
  );
};

export default HomeComponent;