import React, { useEffect, useState } from 'react';
import './../App.css';

function Chat({ socket, user, chat }) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== '' && user !== '' && chat !== '') {
      const messageData = {
        chat: chat,
        author: user,
        message: message,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      await socket.emit('sendMessage', messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='wrapper'>
        <div className='chat-box'>
          <div className='chat-head'>
            <h2>Chat Box</h2>
          </div>
          <div className='chat-body'>
            <div className='msg-insert'>
              {messageList.map((message) => {
                return (
                  <div
                    className='message-info'
                    id={user === message.author ? 'you' : 'other'}
                  >
                    <div className='message-content'>
                      <p>{message.message}</p>
                    </div>
                    <div className='message-meta'>
                      <p>Time: {message.time}</p>
                      <p>Author: {message.author}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className='chat-text'>
                <textarea
                  placeholder='Send'
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                ></textarea>
                <button className='send-message-button' onClick={sendMessage}>
                  Send
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
