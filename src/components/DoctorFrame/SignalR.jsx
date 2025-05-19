// signalRService.js
import * as signalR from '@microsoft/signalr';
import Peer from 'peerjs';

let connection = null;
let myPeer = null;
let localStream = null;
let peers = {};

const startConnection = async (roomId, userId, addVideoStream,removeVideoStream) => {
  myPeer = new Peer(userId);

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://laaficonference.azurewebsites.net/VideoHub") // Replace with your SignalR hub URL
    .build();

  connection.on('user-connected', id => {
    if (userId === id) return;
    
    connectToNewUser(id, localStream, addVideoStream);
  });

  connection.on('user-disconnected', id => {
    if (peers[id]) peers[id].close();
    removeVideoStream(id);
  });

  myPeer.on('open', async id => {
    try {
      await connection.start();
      
      await connection.invoke("JoinRoom", roomId, userId);
    } catch (err) {
      
    }
  });

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    localStream = stream;
    addVideoStream(userId, stream);

    myPeer.on('call', call => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', userVideoStream => {
        addVideoStream(call.peer, userVideoStream);
      });
    });
  }).catch(error => {
    console.error('Error accessing media devices.', error);
  });
};

const connectToNewUser = (userId, stream, addVideoStream) => {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(call.peer, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
};

const stopConnection = async () => {
  if (connection) {
    try {
      await connection.stop();
      
    } catch (err) {
      
    }
  }

  if (myPeer) {
    myPeer.destroy();
  }

  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }

  peers = {};
};

export default {
  startConnection,
  stopConnection
};
