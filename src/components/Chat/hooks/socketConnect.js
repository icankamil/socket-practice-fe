import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
  fetchChats,
  onlineFriends,
  onlineFriend,
  offlineFriend,
  setSocket,
  receivedMessage,
  senderTyping,
  createChat
} from '../../../store/actions/chat';

function useSocket(user, dispatch) {
  useEffect(() => {

    dispatch(fetchChats())
      .then(res => {
        const socket = socketIOClient.connect('http://127.0.0.1:3001', {
          transports: ['websocket'],
          upgrade: false
        });

        dispatch(setSocket(socket))

        socket.emit('join', user);

        socket.on('typing', (user) => {
          console.log('Event', user);
        });

        socket.on('friends', (friends) => {
          console.log("Friends", friends);
          dispatch(onlineFriends(friends))
        })

        socket.on('online', (user) => {
          dispatch(onlineFriend(user));
        });

        socket.on('offline', (user) => {
          dispatch(offlineFriend(user));
        })

        socket.on('received', (message) => {
          dispatch(receivedMessage(message, user.id));
        })

        socket.on('typing', (sender) => {
          dispatch(senderTyping(sender))
        })

        socket.on('new-chat', (chat) => {
          dispatch(createChat(chat))
        })

        console.log(res)
      })
      .catch(err => console.log(err))
  }, [dispatch, user])

};

export default useSocket;