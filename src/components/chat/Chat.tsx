import React from 'react';
import styled from 'styled-components';
import { CometChat } from '@cometchat-pro/chat';
import * as CONSTANTS from '../constants/constants';
import Popup from './Popup';
// import Popup from './Popup';

const Chat = () => {
  // Chat initialize
  // const appID = '2115110a5496735e';
  // const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(CONSTANTS.APP_REGION)
    .build();
  CometChat.init(CONSTANTS.APP_ID, appSetting).then(
    () => {
      console.log('Initialization completed successfully');
      // You can now call login function.
    },
    (error) => {
      console.log('Initialization failed with error:', error);
      // Check the reason for error and take appropriate action.
    }
  );

  // Chat Login User
  let authKey = CONSTANTS.AUTH_KEY;
  // let authKey = '0e9ac77b6884a68658aace31e9b497d9eaece3e5';
  var uid = 'user2';
  var name = 'Chime';

  var user = new CometChat.User(uid);

  user.setName(name);
  // CometChat.createUser(user, authKey).then(
  //   (user) => {
  //     console.log('user created', { name });
  //   },
  //   (error) => {
  //     console.log('error', error);
  //   }
  // );

  // Chat Superhero
  CometChat.login(uid, authKey).then(
    (user) => {
      let username = user.getName();
      console.log('Milan Login successfull:', { name });
    },
    (error) => {
      console.log('Login failed with exception:', { error });
    }
  );

  // const handleName = (event: React.MouseEvent<HTMLButtonElement>) => {

  // }

  return (
    <div>
      <h1>Chat popup!!!123</h1>

      {/* <Popup /> */}

      <p>{user.getName()}</p>
    </div>
  );
};

export default Chat;
