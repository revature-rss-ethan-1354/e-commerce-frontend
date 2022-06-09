import React, { useState } from 'react';
import styled from 'styled-components';
import { CometChat } from '@cometchat-pro/chat';

import { ChatSocket } from './ChatSocket';

// function setConnected(connected) {
//   $('#connect').prop('disabled', connected);
//   $('#disconnect').prop('disabled', !connected);
//   if (connected) {
//     $('#conversation').show();
//   } else {
//     $('#conversation').hide();
//   }
//   $('#greetings').html('');
// }

// function connect() {
//   var socket = new SockJS('/gs-guide-websocket');
//   stompClient = Stomp.over(socket);
//   stompClient.connect({}, function (frame) {
//     setConnected(true);
//     console.log('Connected: ' + frame);
//     stompClient.subscribe('/topic/greetings', function (greeting) {
//       showGreeting(JSON.parse(greeting.body).content);
//     });
//   });
// }

// into DisplayProducts
export const Chat = () => {
  const [btnConnect, setBtnConnect] = useState(false);

  //   const handleSetConnected = (event: React.ChangeEvent<HTMLButtonElement>) => {
  //     setBtnValue(!btnValue);
  //   };

  return (
    <div id="main-content" className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="connect">WebSocket connection:</label>

              <button
                id="connect"
                className="btn btn-default"
                type="submit"
                disabled={btnConnect}
                onClick={() => setBtnConnect(true)}
              >
                Connect
              </button>

              <button
                id="disconnect"
                className="btn btn-default"
                type="submit"
                disabled={true}
              >
                Disconnect
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="name">What is your name?</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name here..."
              />
            </div>
            <button id="send" className="btn btn-default" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {btnConnect ? (
            <table id="conversation" className="table table-striped">
              <thead>
                <tr>
                  <th>Greetings</th>
                </tr>
              </thead>
              <tbody id="greetings"></tbody>
            </table>
          ) : (
            <></>
          )}
        </div>
      </div>

      <ChatSocket />
    </div>
  );
};
