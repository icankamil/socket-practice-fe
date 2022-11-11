import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function useSocket(user, dispatch) {

  useEffect(() => {
    const socket = socketIOClient.connect('http://127.0.0.1:3001', {
      transports: ['websocket'],
      upgrade: false
    });

    socket.emit('join', user);

    socket.on('typing', (user) => {
      console.log('Event', user);
    });

    socket.on('friends', (friends) => {
      console.log('Friends', friends);
    });

    socket.on('online', (user) => {
      console.log('Online', user);
    });

    socket.on('offline', (user) => {
      console.log('Offline', user);
    });

  }, [dispatch])
};

export default useSocket;