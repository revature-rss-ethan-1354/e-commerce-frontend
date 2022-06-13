import React, { useEffect, useState } from 'react'
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import "./style.css";
import { apiGetUser } from '../../remote/e-commerce-api/authService';

var stompClient: Client | null = null;
const Messenger: React.FC = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [showInput, setShowInput] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    const [user, setUser] = useState({
        id: 0+Date.now(),
    email: "guest@gmail.com",
    password: "password",
    firstName: "Guest",
    lastName: "User",
    admin: false
    });

    useEffect(() => {
        console.log(userData);
    }, [userData]);
    
    const showConnect = () => {
        
        const fetchData = async () => {            
            const getUser = await apiGetUser();
            setUser(getUser.payload);           
            console.log(getUser.payload);            
            setUserData({ ...userData, "username": user.firstName+" "+user.lastName });
            console.log("Userdata: "+userData.username);
            
        };
          fetchData();
            
        setShowInput(true)
        
        
    }
    
    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }
    const onConnected = () => {
        //setUserData({ ...userData, "connected": true });
        if (stompClient) {
            stompClient.subscribe('/chatroom/public', onMessageReceived);
            stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
            userJoin();
        }
    }
    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        if (stompClient) {
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        }
    }
    const onMessageReceived = (payload: { body: string; }) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    const onPrivateMessage = (payload: { body: string; }) => {
        console.log(payload);
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
    }
    const onError = (err: any) => {
        console.log(err);
    }
    const handleMessage = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }
    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }
    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };
            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }
    const handleUsername = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": user.firstName+" "+user.lastName });
    }
    const registerUser = () => {
        setUserData({ ...userData, "username": user.firstName+" "+user.lastName });
        connect();
    }
    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                    {/* TODO: REMOVE LEFT SIDE PANEL IF IT IS A USER OR GUEST */}
                        <ul>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab !== "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <button className={!showInput ? "showConnect": "hideConnect"} onClick={showConnect}>Get Support</button>
               }
               {
                   showInput &&
                   <div className="register">
                   <input
                       id="user-name"
                       placeholder="Enter your name"
                       name="userName"
                       value={user.firstName+" "+user.lastName}
                    //    onChange={handleUsername}
                   />
                   <button type="button" onClick={registerUser}>
                       connect
                   </button>
               </div>
               }
        </div>
    )
}
export default Messenger;