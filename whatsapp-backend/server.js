const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1120531",
  key: "eebeb692d8a297e1f91b",
  secret: "48fed773369aafbacf7f",
  cluster: "eu",
  useTLS: true
});


//Middleware
app.use(express.json());
app.use(cors())


// Database
const mongoose = require('mongoose')
const dbMessages = require('./dbMessages')
const dbRooms = require('./dbRooms')
const mongoDB = 'mongodb+srv://admin:W73QmbejCf2zT6C@cluster0.fr173.mongodb.net/whatsappDB?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection("whatsappcontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

const Messages = require('./dbMessages');
const Rooms = require('./dbRooms')

// API routes
app.get('/', (req, res) =>{
    res.send('Hello World!')
})

app.get('/api/messages/sync', (req, res) =>{
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

app.post('/api/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/api/rooms', (req, res) => {
    Rooms.find((err, data) => {
        if (err) {
            res.status(500).res.send(data);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/api/rooms/new', (req, res) => {
    const dbRoom = req.body;

    Rooms.create(dbRoom, (err, data) =>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
})



app.listen(port, () => console.log(`Listening on port ${port}`))