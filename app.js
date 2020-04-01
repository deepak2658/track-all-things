'use strict';

//including essential third party packages
const http = require('http');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); //creating socketIo and bind it to our server

app.use(express.static(path.join(__dirname,'public')));

const locationMap = new Map();

io.on('connection',socket=>{

    socket.on('registertracker',(pos)=>{
        locationMap.set(socket.id,{lat:null,lng:null});
        if(locationMap.has(socket.id)){
            locationMap.set(socket.id,pos);
            // socket.emit(locationMap);
            }
        
        //console.log(locationMap);
    });
    
   
    socket.on('update-location',pos=>{
            
    });

    socket.on('request-location',()=>{
        //console.log(locationMap);

        socket.emit('locationsupdate',Array.from(locationMap));
    })

    socket.on('disconnect',()=>{
        locationMap.delete(socket.id);
    });
});

// //ading a middle ware for testing
// app.get('/',(req,res,next)=>{
//     res.send('Hellow from the server');
// })

server.listen(3000,err=>{
    if(err){
        throw err;
    }
    
    console.log('Server started at port 3000');
});
