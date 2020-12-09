import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './index.css'

const SidebarChat = ({ addNewChat }) => {

    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000))
    }, [])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat')

        if (roomName) {

        }
    }

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/4.5/api/avataaars/${seed}.svg`}/>
            <div className="sidebarChat_info">
                <h2>Room name</h2>
                <p>last message that has been sent</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat
