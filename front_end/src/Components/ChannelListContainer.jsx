import React  , {useState, useEffect} from 'react'
import { ChannelList, useChatContext, UseChatContext } from 'stream-chat-react';
import { ChannelSearch, TeamList, ChannelPreview } from './';
import Cookies from 'universal-cookie';
import Employee from '../assets/employee.jpg'
import Logout from '../assets/logout.png'

const cookies = new Cookies;
const SideBar = ({logout}) =>(
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src= {Employee} alt="Employee" width = '30' />
      </div>
    </div>   
     <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
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


const channelTeamFilter = (channels) =>{
  return channels.filter((channel) => channel.type === 'team');
}
const channelMessagingFilter = (channels) =>{
  return channels.filter((channel) => channel.type === 'messaging');
}
const ChannelListContent = ({isCreating, setIsCreating,setCreateType, setIsEditing, setTContainer}) => {
  const {client} = useChatContext();
  const logout = () =>{
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('phoneNumber');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    
    window.location.reload()
  }
  const [currentColor, setCurrentColor] = useState("")
  const filters = {members: {$in: [client.userID]}}


  useEffect(() => {
    const savedColor = JSON.parse(localStorage.getItem('color-preferance')
    );
  
    if(savedColor){
      setCurrentColor(savedColor)
      document.documentElement.style.setProperty
      ('--primary-color', savedColor);
      console.log(savedColor)
    }
    
  }, []);
  
  useEffect(() => {
    localStorage.setItem('color-preferance', JSON.stringify(currentColor)
    );
  
  }, [currentColor])

  const setColor = (color) =>{
    document.documentElement.style.setProperty('--primary-color', color);
    setCurrentColor(color)
  }

  return (
    <>
      <SideBar logout = {logout}/>
        <div className="channel-list__list__wrapper">
        <Header/>
        <ChannelSearch setTContainer = {setTContainer}/>
        {/*group message list*/}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={channelTeamFilter}
          List={(listProps) => (
            <TeamList
              {...listProps}
              type='team'
              isCreating = {isCreating} 
              setIsCreating = {setIsCreating}
              setCreateType = {setCreateType}
              setIsEditing = {setIsEditing}
              setTContainer = {setTContainer}
            />
          )}  
          Preview={(previewProps) => (
            <ChannelPreview
              {...previewProps}
              setIsCreating = {setIsCreating}
              setIsEditing = {setIsEditing}
              setTContainer = {setTContainer}
              type = 'team'
            />
            )}     
        />        
        {/*private message list*/}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={channelMessagingFilter}
          List={(listProps) => (
            <TeamList
              {...listProps}
              type='messaging'

              isCreating = {isCreating} 
              setIsCreating = {setIsCreating}
              setCreateType = {setCreateType}
              setIsEditing = {setIsEditing}
              setTContainer = {setTContainer}
            />
          )}  
          Preview={(previewProps) => (
            <ChannelPreview
              {...previewProps}
              setIsCreating = {setIsCreating}
              setIsEditing = {setIsEditing}
              setTContainer = {setTContainer}
              type = 'messaging'
              
            />
            )}     
        />
        <div className="channel-list__header" style={{color: "rgba(255, 255, 255, 0.66)", marginTop: "10px"}}>
          Change Theme:
        </div>        
        <div className="channel-list__header">
         <button style={{borderRadius:'100%', width:'30px', height:'30px', margin:'5px', backgroundColor:'black'}} onClick={() =>{setColor('black');}}>
          </button>
          <button style={{borderRadius:'100%', width:'30px', height:'30px', margin:'5px', backgroundColor:'#f471f4'}}onClick={() =>{setColor('#f471f4');}}>
          </button>
          <button style={{borderRadius:'100%', width:'30px', height:'30px', margin:'5px', backgroundColor:'#005fff'}} onClick={() =>{setColor('#005fff');}}>
          </button>              
          <button style={{borderRadius:'100%', width:'30px', height:'30px', margin:'5px', backgroundColor:'#720500'}} onClick={() =>{setColor('#720500');}}>
          </button>          
          <button style={{borderRadius:'100%', width:'30px', height:'30px', margin:'5px', backgroundColor:'#1E5631'}} onClick={() =>{setColor('#1E5631');}}>
          </button>            
           <button style={{borderRadius:'100%', width:'30px', height:'30px', margin:'5px', backgroundColor:'#b7825f'}} onClick={() =>{setColor('#b7825f');}}>
          </button>                                    

        </div>

      </div>
    </>
  );
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) =>{
  const [tContainer, setTContainer] = useState(false);
  return(
    <>
      <div className="channel-list__container">
        <ChannelListContent 
          setCreateType = {setCreateType}
          setIsCreating = {setIsCreating}
          setIsEditing = {setIsEditing}
        />
      </div>
      <div className="channel-list__container-responsive" style ={{ left: tContainer ? "0%" : "-100%", backgroundColor: "#005fff"}}
      >
        <div className="channerl-list__container-toggle" onClick={() => setTContainer((prevTContainer) => !prevTContainer )}>
        </div>
        <ChannelListContent 
          setCreateType = {setCreateType}
          setIsCreating = {setIsCreating}
          setIsEditing = {setIsEditing}
          setTContainer = {setTContainer}
        />
      </div>
    </>
  )
}


export default ChannelListContainer
