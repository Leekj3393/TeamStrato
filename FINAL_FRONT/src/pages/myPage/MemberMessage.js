import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

// MyPageAPICalls.js
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const reqeustURL = `${process.env.PRE_URL}/members?page=1`;

const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/myPage`;


const ChatApp = ({ userId }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(new Map());
  const [members, setMembers] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    socket = io(`http://${process.env.REACT_APP_WEBSOCKET_SERVER_IP}:${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`);
    
    socket.emit('join', { userId });

    socket.on('message', (data) => {
      setMessages((messages) => {
        const { chatId, message } = data;
        const chatMessages = messages.get(chatId) || [];
        return new Map(messages).set(chatId, [...chatMessages, message]);
      });
    });

    return () => {
      socket.emit('leave', { userId });
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    const callMemberListAPI = async () => {
      const reqeustURL = `${PRE_URL}/members?page=1`;
      const result = await fetch(reqeustURL).then(response => response.json());
      if (result.status === 200) {
        setMembers(result.data);
      }
    }
    callMemberListAPI();
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim() !== '' && currentChatId) {
      const message = {
        text: messageText,
        sender: userId,
      };
      socket.emit('message', { chatId: currentChatId, message });
      setMessageText('');
    }
  };

  const handleChatSelection = (chatId) => {
    setCurrentChatId(chatId);
  };

  const currentMessages = messages.get(currentChatId) || [];

  return (
    <div>
      <h1>실시간 채팅</h1>
      <div>
        {members.map((member) => (
          <button key={member.id} onClick={() => handleChatSelection(member.id)}>
            {member.name}
          </button>
        ))}
      </div>
      <div>
        {currentMessages.map((message, index) => (
          <div key={index}>
            <span>{message.sender}:</span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatApp;
