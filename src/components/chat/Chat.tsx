import React from "react";
import styled from "styled-components";
import { CometChat } from "@cometchat-pro/chat";
import Popup from "./Popup";

const Chat = () => {
  // Chat initialize
  const appID = "2115110a5496735e";
  const region = "us";
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    (error) => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );

  // Chat Login User
  let authKey = "0e9ac77b6884a68658aace31e9b497d9eaece3e5";
  var uid = "user1";
  var name = "Kevin";

  // if user doesn't exist, create user
  var user = new CometChat.User(uid);
  user.setName(name);
  CometChat.createUser(user, authKey).then(
    (user) => {
      console.log("user created", user);
    },
    (error) => {
      console.log("error", error);
    }
  );

  // if user exists, login user
  // Chat Superhero
  CometChat.login("SUPERHERO1", authKey).then(
    (user) => {
      console.log("Login Successful:", { user });
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );

  return (
    <div>
      <h1>Chat popup!!!123</h1>
      {/* <Popup></Popup>  */}
    </div>
  );
};

export default Chat;
