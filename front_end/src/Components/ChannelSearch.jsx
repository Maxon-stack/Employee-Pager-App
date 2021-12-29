import React from 'react'
import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import {SearchIcon} from '../assets'

export const ChannelSearch = () => {

  const [search, setsearch]= useState('');
  const [loading, setLoading]= useState(false);
  const getChannels = async (text) =>{
    try{
      // fetch channels
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
      
    </div>
  )
}
export default ChannelSearch;
