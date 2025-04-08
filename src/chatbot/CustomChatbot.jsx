'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';

const CustomChatbot = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      content:
        "Hi! I'm the A.S Office of Student Organizations chatbot, here to help your organization with everything A.S Funding! I'll do my best to assist with any questions.",
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!input.trim() || isProcessing) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const token = await user.getIdToken();

      const response = await fetch('http://127.0.0.1:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: userMessage.content,
          conversation_history: messages.map(msg => ({
            message: msg.content,
            type: msg.role === 'user' ? 'user' : 'bot',
            id: msg.id,
          })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Sorry, you've reached the daily limit for messages. Please try again tomorrow."
          );
        }
        if (response.status === 422) {
          throw new Error(
            'Sorry, your message was too long. Please try again with a shorter message.'
          );
        }

        throw new Error('Sorry, authentication failed or something went wrong.');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now().toString(),
        role: 'bot',
        content: data.response,
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);

      const errorMessage = {
        id: Date.now().toString(),
        role: 'bot',
        content: error.message,
        createdAt: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="custom-chatbot">
      <div className="chatbot-header">
        <h2>A.S.</h2>
      </div>

      <div className="chatbot-messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isProcessing && (
          <div className="typing-indicator-container">
            <div className="bot-avatar">
              <img src="/AS_Logo_StudentOrgs.png" alt="Bot Avatar" />
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoComplete="new-password"
          placeholder={isProcessing ? 'Please wait...' : 'Type a message...'}
          disabled={isProcessing}
          className={`chatbot-input ${isProcessing ? 'disabled' : ''}`}
        />
        <div className="input-separator">|</div>
        <button
          type="submit"
          disabled={isProcessing || !input.trim()}
          className={`chatbot-send-button ${isProcessing ? 'disabled' : ''}`}
        >
          {isProcessing ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <CornerDownLeft size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomChatbot;
