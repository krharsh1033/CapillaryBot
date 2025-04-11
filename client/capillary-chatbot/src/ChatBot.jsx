import React, { useState, useEffect, useRef } from 'react';
import {FaUser } from 'react-icons/fa';
import './ChatBot.css';
import botImage from './bot.png'; 


export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! 👋 Ask me anything about CapillaryTech' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: '⚠️ Oops! Something went wrong contacting the server.' }
      ]);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className='makeCenter'>
    <div className='hello2'>
    <div className="ft">
    <img src={botImage} alt="logo" className='hello1' />
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">CapillaryTech Chatbot 💬</h1>
      </div>
      <div >
      
        {messages.map((msg, i) => (
        

          <div
            key={i}
            className='hello'
          >
            <div className={`flex items-center gap-2 max-w-[75%]`}>
            {msg.sender === 'bot' && (
        <>
           
           <img src={botImage} alt="logo" className='hello8' />
        </>
      )}
      
            
                <div className='dt'>
                 {msg.sender === 'user' && <FaUser className="text-blue-600 mt-1" />}
                 
                {msg.text}
                </div>
              </div>
             
            
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className='ami'>

      </div>

      <div className="rd">
      <div className="rd1">
        <input
          type="text"
          className="edt"
          placeholder="Type your question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bt"
        >
          Send
        </button>
        </div>
      </div>
    </div>
    </div>
  );
}
