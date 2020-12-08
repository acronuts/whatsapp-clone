import { Avatar } from '@material-ui/core'
import React from 'react'
import './index.css'

const SidebarChat = () => {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room name</h2>
                <p>last message that has been sent</p>
            </div>
        </div>
    )
}

export default SidebarChat
