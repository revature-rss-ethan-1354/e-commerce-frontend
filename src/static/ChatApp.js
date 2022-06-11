import React, {useState,useEffect} from "react";
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './ChatApp.css';
 const socket = io.connect("http://localhost:3009");

const ChatApp = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_message", {message});
    };

    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }, [socket]);
    return(
        <div className="app">
            <input placeholder="Messaage.." 
            onChange={(event)=>{
                setMessage(event.target.value);
            }} />
            <button onClick={sendMessage}>Send Message

            </button>
            <h1>Message:</h1>
            {messageReceived}
        </div>
    );

}

  export default ChatApp


 