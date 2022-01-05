import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react';
import {UserList} from './'
import {CloseCreateChannel} from '../assets'

const ChannelNameInput =({channelName = '', setChannelName}) =>{
  const change = (e) =>{
    e.preventDefault();
    setChannelName(e.target.value);
  }
  return(
    <div className="channel-name-input__wrapper">
      <p>
        Name
      </p>
      <input value = {channelName} onChange = {change} placeholder = 'channel-name' type="text" />
      <p>
        Add Members
      </p>
    </div>
  )
}

function CreateChannel({createType, setIsCreating}) {
  const {client, setActiveChannel} = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const createAChannel = async (event) =>{
    event.preventDefault();
    try {
      const newChannel = client.channel(createType, channelName, {name: channelName, members: selectedUsers});
      newChannel.watch();
      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);


    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='create-channel__container'>
      <div className="create-channel__header">
        <p>
          {createType ==='team' ? "Create a New Channel" : 'Send Direct Message'}
        </p>

        <CloseCreateChannel setIsEditing={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput
      channelName={channelName} setChannelName ={setChannelName}/>}
      <UserList setSelectedUsers = {setSelectedUsers}/>
      <div className="create-channel__button-wrapper" onClick={createAChannel}>
        <p>
          {createType === 'team' ? "Create Channel" : "Create Message group"}
        </p>
      </div>
    </div>
  )
}

export default CreateChannel
