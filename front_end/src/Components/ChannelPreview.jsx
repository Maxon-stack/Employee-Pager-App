import React from 'react'
import {Avatar, Channel, useChatContext} from 'stream-chat-react';
import Trash from '../assets/trash.png'
const ChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, setTContainer, channel, type}) => {
  const { channel: ActiveChannel, client} = useChatContext();
  const ChannelPreview = () =>(
    <p className='channel-preview__item'>
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )

  const DirectPreview = () =>{
    const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.userID);

    return(
      <div className="channel-preview__item single">
        <Avatar
        image = {members[0]?.user?.image}
        name = {members[0]?.user?.fullName || members[0]?.user?.name}
        size={24}
        />
        <p>
        {members[0]?.user?.fullName|| members[0]?.user?.name}
        </p>

      </div>
    )
  }
  return (
    <div className={
      channel?.id === ActiveChannel?.id
        ?'channel-preview__wrapper__selected'
        :'channel-preview__wrapper'
    }
    onClick={() =>{
      setIsCreating(false);
      setIsEditing(false);
      setActiveChannel(channel)
      if(setTContainer){
        setTContainer((prev) => !prev)
      }
      console.log(channel);
      
    }}
    >
      {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}

      <div style={{color:'pink', backgroundColor:"white", borderRadius:"25%", marginRight:"5px", marginTop:"5px"}}
      onClick={() =>{channel.delete();}}

      >
       <img src= {Trash} alt="Employee" width = '25' />
      </div>
    </div>
  )
}

export default ChannelPreview;
