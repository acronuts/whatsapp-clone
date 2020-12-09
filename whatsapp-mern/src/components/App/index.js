import './index.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import axios from '../../axios'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('api/messages/sync')
    .then(res => {
      setMessages(res.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('eebeb692d8a297e1f91b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      setMessages([...messages, data])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  console.log('messages', messages)

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
