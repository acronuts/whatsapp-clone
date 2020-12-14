import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './index.css'
import { SearchOutlined } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios'
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

// import ChatMessage from '../ChatMessage';
// import chat_message from './index.css'

const Chat = ({ messages }) => {
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState('');
    const [{ user }, dispatch] = useStateValue();
    
    useEffect(() => {
        if (roomId) {
            axios.get('api/rooms')
            .then(res => {
                setRoomName(res.data)
            })
        }
    },  [roomId])

    console.log('in da chat', roomId)

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000))
    }, [])

    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post('/api/messages/new', {
            message: input,
            name: user.displayName,
            // timeStamp: 'now?',
            // received: false
        })

        setInput('')
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/avataaars/${seed}.svg`} alt="" />

                <div className="chat_headerInfo">
                    <h3>{roomName.name}</h3>
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
                    <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`} key={message._id} >
                        <span className="chat_author">{message.name}</span>
                        {message.message}
                        <span className="chat_timeStamp">{message._id}</span>
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
