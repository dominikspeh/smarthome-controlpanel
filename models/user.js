const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    location: [],
    gas: []

}, { timestamps: true });


const user = mongoose.model('user', userSchema);

user.find(function (err, userdata) {
    if (userdata.length) {
        console.log("Configdaten bereits vorhanden");
        return;
    }
    new user({
        name: "Dominik Speh"

    }).save();


    console.log("Userdaten hinzugefügt");
});
module.exports = user;
