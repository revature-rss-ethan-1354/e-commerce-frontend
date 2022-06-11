import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

const Messenger = () => {
    let stompClient: any;
    const url="http://localhost:8080";
    const [message, setMessage] = useState("");

    console.log("connecting to chat");
    console.log(url);

    function connectToChat(uid: number) { 
        console.log("Connecting to Chat");
        let socket = new SockJS(url + '/chat');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame: any) {
            console.log("connected to: " + frame);

            stompClient.subscribe("/topic/messages/" + 1, function (response: any) {
                let data = JSON.parse(response.body);
                console.log(data);
            });
        });
    }

    function sendMessage(uid: number) {
        stompClient.send("/app/chat/3", {}, JSON.stringify( {
            //These fields are the same as the backend chat model
            fromLogin: 1,
            message: message 
        }));

        console.log("message sent: ", message);
    }

    const handleSubmit = (event: React.FormEvent) => {
        sendMessage(1);
    }

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    useEffect( () => {
        //we would want to get the uid
        connectToChat(1);
    }, [])


    return (
        <form className='sendField' >Enter Message
            <input type='text' className='message-input-field' onChange={handleChanges}/>
            <input type='button' className='send-button' value="SEND"/>
        </form>
    )
}

export default Messenger