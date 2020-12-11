import './index.css';
import Chat from '../Chat';
import Sidebar from '../Sidebar';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from '../../axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('api/messages/sync')
    .then(res => {
      setMessages(res.data)
    })
  }, []);

  useEffect(() => {
    axios.get('api/rooms')
    .then(res => {
      setRooms(res.data)
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('eebeb692d8a297e1f91b', {
      cluster: 'eu'
    });

    const channelOne = pusher.subscribe('messages');
    channelOne.bind('inserted', (data) => {
      setMessages([...messages, data])
    });

    const channelTwo = pusher.subscribe('rooms');
    channelTwo.bind('inserted', (data) => {
      setRooms([...rooms, data])
    });

    return () => {
      channelOne.unbind_all();
      channelTwo.unbind_all();
      channelOne.unsubscribe();
      channelTwo.unsubscribe();
    }

  }, [messages, rooms]);

  console.log('messages', messages)
  console.log('rooms', rooms)

  return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Sidebar rooms={rooms}/>
          <Switch>
            <Route path='/rooms/:roomId'>
              <Chat messages={messages} />
            </Route>
            <Route path='/'>
              <Chat messages={messages} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
