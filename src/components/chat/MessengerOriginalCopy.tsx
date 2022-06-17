import React, { useEffect, useState } from 'react';
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import './style.css';
import { apiGetUser } from '../../remote/e-commerce-api/authService';
import { emitKeypressEvents } from 'readline';

var stompClient: Client | null = null;

const MessengerOriginalCopy: React.FC = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [showInput, setShowInput] = useState(false);
  const [showSupport, setShowSupport] = useState(true);

  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
    admin: false,
  });

  // Show the input box when the user clicks the Get Support button
  const showConnect = () => {
    let getUser: any;
    const fetchData = async () => {
      //Checkadmin + update UserData
      getUser = await apiGetUser();
    };
    fetchData().then(() => {
      // http request fulfilled
      if (getUser.payload.admin) {
        //when user tries to connect
        userData.username = getUser.payload.firstName;
        userData.admin = true;
        connect();
      } else if (getUser.payload.lastName != '') {
        // when users try to connect
        userData.username =
          getUser.payload.firstName + ' ' + getUser.payload.lastName;
        connect();
      }
    });

    fetchData().catch(() => {
      //error handling for api call
      userData.username = 'Guest No. ' + Date.now();
      connect();
    });
    setShowSupport(false);
    setShowInput(true);
  };

  // Connection to the server
  const connect = () => {
    let Sock = new SockJS('http://localhost:8000/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  // When the connection is established, subscribe to the chat room
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    if (stompClient) {
      stompClient.subscribe('/chatroom/public', onMessageReceived);
      stompClient.subscribe(
        '/user/' + userData.username + '/private',
        onPrivateMessage
      );
      userJoin();
    }
  };

  // New User joins the chat room
  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    };
    if (stompClient) {
      //send message to endpoint of websocket
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    }
  };

  // New message received from the server
  const onMessageReceived = (payload: { body: string }) => {
    let payloadData: any = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN': //when user connects to another user
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []); //sender name mapped to multiple receivers?
          console.log('connect from: ', payloadData.senderName);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        // publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  // New private message received from the server
  const onPrivateMessage = (payload: { body: string }) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const handleMessage = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      };
      console.log(chatMessage);
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const closeChatBox = () => {
    setShowInput(false);
    setShowSupport(true);
    setUserData({ ...userData, connected: false });
  };
  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
      };

      if (userData.admin == false) {
        // if sender is not admin
        chatMessage.receiverName = 'Admin'; //then send to admin
      }
      //and an object containing who sent the message and who the receiver is
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      // send and reset message to empty string
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };
  const handleUsername = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };
  const registerUser = () => {
    setShowInput(false);
    connect();
  };

  const keyPress = (e: any) => {
    if (e.key === 'Enter') {
      sendPrivateValue();
    }
  };
  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          {/* TODO: REMOVE LEFT SIDE PANEL IF IT IS A USER OR GUEST */}

          <div className="member-list">
            <ul>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && 'active'}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {tab !== 'CHATROOM' && (
            <div className="chat-content">
              <button
                type="button"
                className="chat-close"
                onClick={closeChatBox}
              >
                ---
              </button>
              <h2>You Are: {userData.username}</h2>
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && 'self'
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyPress={(e) => keyPress(e)}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className={!showInput && showSupport ? 'showConnect' : 'hideConnect'}
          onClick={showConnect}
        >
          Get Support
        </button>
      )}
    </div>
  );
};
export default Messenger;