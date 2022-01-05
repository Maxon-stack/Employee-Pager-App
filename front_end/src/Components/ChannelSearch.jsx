import React from 'react'
import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import {SearchIcon} from '../assets'
import {ResultsDropdown} from './'

export const ChannelSearch = ({setTContainer}) => {
  const {client , setActiveChannel} = useChatContext();
  const [search, setsearch]= useState('');
  const [loading, setLoading]= useState(false);
  const [teamChannel, setTeamChannel] = useState([]);
  const [directChannel, setDirectChannel] = useState([]);
  useEffect(() => {
    if(!search){
      setTeamChannel([]);
      setDirectChannel([]);

    }
  }, [search])
  const getChannels = async (text) =>{
    try{
      // fetch channels
      const channelResponse = client.queryChannels({
        type: 'team', 
        name:{$autocomplete:text}, 
        members:{$in:[client.userID]}
      })      
      const userResponse = client.queryUsers({
        id: {$ne: client.userID}, 
        name:{$autocomplete:text}, 
      })

      const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannel(channels);
      if(users.length) setDirectChannel(users);

    }catch(error){
      console.log(error)
      setsearch('')
    }
  }
  const onSearch = (event) =>{
    event.preventDefault();
    setLoading(true);
    setsearch(event.target.value);
    getChannels(event.target.value)
  }
  const setChannel = (channel) =>{
    setsearch("");
    setActiveChannel(channel);
  }
  return (
    <div className='channel-search__container'>
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
        <SearchIcon/>
        </div>
        <input 
        className='channel-search__input__text'
        placeholder='Search Channel'
        type='text' 
        value={search}
        onChange={onSearch}
        />
      </div>

      {search && (
        <ResultsDropdown
        teamChannels = {teamChannel}
        directChannels = {directChannel}
        loading = {loading}
        setChannel = {setChannel}
        setsearch = {setsearch}
        setToggleContainer = {setTContainer}
        />
      )}
      
    </div>
  )
}
export default ChannelSearch;
