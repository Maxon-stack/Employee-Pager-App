import React from 'react'
import { ChannelList, UseChatContext } from 'stream-chat-react';
import { ChannelSearch, TeamList, ChannelPreview } from './';
import Cookies from 'universal-cookie';
import Employee from '../assets/employee.jpg'
import Logout from '../assets/logout.png'

const SideBar = () =>(
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src= {Employee} alt="Employee" width = '30' />
      </div>
    </div>   
     <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner">
        <img src= {Logout} alt="Logout" width = '30' />
      </div>
    </div>
  </div>
)

const Header = () =>(
  <div className="channel-list__header">
    <p className='channel-list__header__text'>Employee Pager</p>
  </div>
)
const ChannelListContainer = () => {
  return (
    <>
      <SideBar/>
        <div className="channel-list__list__wrapper">
        <Header/>
        <ChannelSearch/>
        {/*group message list*/}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={()=> {}}
          List={(listProps) => (
            <TeamList
              {...listProps}
              type='team'
            />
          )}  
          Preview={(previewProps) => (
            <ChannelPreview
              {...previewProps}
              type = 'team'
              
            />
            )}     
        />        
        {/*private message list*/}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={()=> {}}
          List={(listProps) => (
            <TeamList
              {...listProps}
              type='messaging'
            />
          )}  
          Preview={(previewProps) => (
            <ChannelPreview
              {...previewProps}
              type = 'messaging'
              
            />
            )}     
        />
      </div>
    </>
  )
}


export default ChannelListContainer
