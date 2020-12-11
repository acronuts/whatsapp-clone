import { Avatar } from '@material-ui/core'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom'

const SidebarChat = ({ id, name, addNewChat }) => {

    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000))
    }, [])

    const createChat = async () => {
        const roomName = prompt('Please enter name for chat room')

        if (roomName) {
            await axios.post('/api/rooms/new', {
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/avataaars/${seed}.svg`}/>
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>last message that has been sent</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat
