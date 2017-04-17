const exec = require('child_process').exec;
const smartSockets = require("../models/smartSockets");

function getSockets() {
    return new Promise((resolve, reject) => {
        smartSockets.find().sort().exec(function (err, results) {

            if (!err) {
                resolve(results)

            }
        });
    });
}
function updateSockets(id) {
    return new Promise((resolve, reject) => {

        smartSockets.findOne({ _id: id }, (err, socket) => {
            if (err) {
                console.log(err);
            }

            if (socket.mode == 0) {
                socket.mode = 1
            }
            else {
                socket.mode = 0;
            }

            socket.save((err) => {
                resolve(socket);
            });

        });
    });
}

function turnSocket(id) {

    return new Promise((resolve, reject) => {

        updateSockets(id).then(socket => {
            exec('sudo /home/pi/raspberry-remote/send '+socket.code+' '+socket.mode, function(error, stdout, stderr) {

                if (error !== null) {
                    console.log('exec error: ' + error);
                }

                resolve(stdout);


            });

        });

    });
}

function addSocket(description, code) {
    return new Promise((resolve, reject) => {
        new smartSockets({
            name: description,
            code: code,
            mode: "0"

        }).save(function (err, status) {
            if(err){
                console.log(err)
            }
            else{
                resolve();
            }
        });
    })
}

function updateSocket(socket) {
    return new Promise((resolve, reject) => {
        smartSockets.update({_id: socket._id}, {
            $set: {
                name: socket.name,
                code: socket.code,
            }
        }).exec(function () {
            resolve();

        });
    })
}

function deleteSocket(socket) {
    return new Promise((resolve, reject) => {
        smartSockets.remove( {_id: socket._id} , function () {
            resolve();
        })
    })
}
module.exports = {
    getSockets,
    turnSocket,
    addSocket,
    updateSocket,
    deleteSocket
};