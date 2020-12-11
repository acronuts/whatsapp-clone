import React, { useState } from 'react'
import './index.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import myself from '../../assests/images/me.jpg'
import SidebarChat from '../SidebarChat';

const Sidebar = ({ rooms }) => {
    // const [input, setInput] = useState('')

    // const sendMessage = async (e) => {
    //     e.preventDefault()

    //     await axios.post('/api/messages/new', {
    //         message: input,
    //         name: 'Me',
    //         timeStamp: 'Now',
    //         received: false
    //     })

    //     setInput('')
    // };

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src={myself}/>
                <div className="header_right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>  
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room._id} id={room._id} name={room.name}/>
                ))}
            </div>            
        </div>
    )
}

export default Sidebar
