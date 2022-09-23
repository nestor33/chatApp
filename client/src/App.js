import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat.js';
const socket = io.connect('http://localhost:3001');

function App() {
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState('');
  const [chat, setChat] = useState('');
  const connect = () => {
    if (user !== '' && chat !== '') {
      socket.emit('connectTheChat', chat);
      setShowChat(true);
    } else {
      socket.emit('doesNotConnected');
    }
  };
  return (
    <div className='App'>
      {!showChat ? (
        <div className='connectChatContainer'>
          <h4>Chat App</h4>
          <input
            type='text'
            placeholder='User Name'
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Chat Name'
            onChange={(event) => {
              setChat(event.target.value);
            }}
          />
          <button onClick={connect}>Connect</button>
        </div>
      ) : (
        <Chat socket={socket} user={user} chat={chat} />
      )}
    </div>
  );
}

export default App;
