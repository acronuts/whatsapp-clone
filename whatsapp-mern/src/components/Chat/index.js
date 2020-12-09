import { Avatar, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import './index.css'
import { SearchOutlined } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios'
// import ChatMessage from '../ChatMessage';
// import chat_message from './index.css'

const Chat = ({ messages }) => {
    const [input, setInput] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post('/api/messages/new', {
            message: input,
            name: 'Me',
            timeStamp: 'Now',
            received: false
        })

        setInput('')
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>last seen at ...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.received && 'chat_receiver'}`} >
                        <span className="chat_author">{message.name}</span>
                        {message.message}
                        <span className="chat_timeStamp">{message.timeStamp}</span>
                    </p>    
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
