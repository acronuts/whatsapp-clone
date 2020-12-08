import React from 'react';
import './index.css';

const ChatMessage = () => {
    return (
        <p className="chat_message" >
            <span className="chat_author">Joost</span>
            Message here
            <span className="chat_timeStamp">{new Date().toUTCString()}</span>
        </p>
    )
}

export default ChatMessage
