import React from 'react'
import './index.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
// import myself from '../../assests/images/me.jpg'
import SidebarChat from '../SidebarChat';
import { useStateValue } from '../../StateProvider';

const Sidebar = ({ rooms }) => {
    const [{ user }, dispatch] = useStateValue();

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
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
