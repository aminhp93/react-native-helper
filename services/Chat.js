import Pusher from 'pusher-js';
import { omit } from 'lodash';
import { getHeaders, ChatUrls } from '../config/api';
import { ChatEventType } from '../constants/common';
import request from '../utils/request';

// Pusher
const authPusher = async (channel, socketId) => {
    let headers = await getHeaders();
    headers = omit(headers, ['Content-Type']);
  
    return request({
      method: 'POST',
      headers,
      data: {
        channel_name: channel.name,
        socket_id: socketId,
      },
      url: ChatUrls.authPusher(),
    });
  };
  
  let baseSocket = null;
  const pusherSocket = async () => {
    if (!baseSocket) {
      baseSocket = new Pusher('45508b0b256b603df639', {
        cluster: 'ap1',
        encrypted: true,
        enabledTransports: ['ws', 'wss', 'sockjs'],
        authorizer: channel => ({
          authorize: async (socketId, callback) => {
            try {
              console.log(32, socketId)
              const response = await authPusher(channel, socketId);
              callback(false, { ...response.data });
            } catch (err) {
              console.log(36, err)
              callback(true, err.status);
            }
          },
        }),
      });
    }
    return baseSocket;
  };


class ChatObserver {
    constructor() {
        this.init();
      }
    
      init() {
        this.listeners = [];
      }
    
      subscribe(listener) {
        console.log(55, listener)
        this.listeners.push(listener);
    
        return function unsubscribe() {
          this.unsubscribe(listener);
        }.bind(this);
      }
    
      unsubscribe(listener) {
        this.listeners = this.listeners.filter(sub => sub !== listener);
      }
    
      notify(data, type) {
        this.listeners.forEach(observer => observer(data, type));
      }
}


const chatObserver = new ChatObserver();
const subscribedDataChannels = new Set();
// const subscribedNotificationChannels = new Set();

const ChatService = {
    getChatObserver() {
        return chatObserver;
    },
    async subscribeToDataChannel(conversationId) {
      console.log(83, conversationId)
        const socket = await pusherSocket();
        console.log(socket)
        const subscribed = socket.channel(`private-data_conversation_${conversationId}`);
    
        if (subscribed) return;
        console.log(89, socket)
        const channel = socket.subscribe(`private-data_conversation_${conversationId}`);
        if (channel) {
          subscribedDataChannels.add(conversationId);
          console.log(socket, subscribedDataChannels)
          channel.bind(ChatEventType.SEND_MESSAGE, (data) => {
            console.log(data, 94)
            chatObserver.notify(data, ChatEventType.SEND_MESSAGE);
          });

          channel.bind(ChatEventType.CREATE_THREAD, (control) => {
            console.log(control, 99)
            chatObserver.notify(control, ChatEventType.CREATE_THREAD);
          });
        }
      },
}

export default ChatService;
