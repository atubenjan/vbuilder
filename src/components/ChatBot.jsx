import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: input,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer To be filled`,
            'Content-Type': 'application/json', // Ensure the correct content type
          },
        },
      );

      const botMessage = response.data.choices[0].text.trim();
      setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-1 mb-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-2 ml-2 text-white bg-blue-500 rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
