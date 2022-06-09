import React, { useState } from 'react';

import useSockjs from 'react-use-sockjs';

// inside Chat
export const ChatSocket = () => {
  const [data, setData] = useState({});

  const { sendMessage } = useSockjs({
    url: 'http://localhost:8080/gs-guide-websocket',
    // url: 'http://localhost:8080/ws',
    topics: ['/user'],
    onMessage: (body, destination) => {
      console.log(body, destination);
      setData(body);
    },
  });
  console.log('coming from line 16 ', data);

  return <h1>hello</h1>;
};
