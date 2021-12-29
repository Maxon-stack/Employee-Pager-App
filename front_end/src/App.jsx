import React from "react";
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie'
import { ChannelListContainer, ChannelContainer, Auth } from './Components';
import './App.css'
//hello
//hello

const apiKey = 'xtfwv7xbc5rv';

const client = StreamChat.getInstance(apiKey);
const authToken = false;


const App = () =>{
  if(!authToken) return <Auth/>
  return(
      <div className="app__wrapper">
        <Chat client = {client} theme = 'team dark'>
          <ChannelListContainer

          />
          <ChannelContainer
          
          />
          </Chat>
      </div>
  );
}

export default App;