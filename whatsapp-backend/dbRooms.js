const mongoose = require('mongoose');

const whatsappRoomSchema = mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('whatsappRoom', whatsappRoomSchema);
