import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import {Link} from 'react-router-dom';
function SidebarChat({addNewChat,name,id}) {
    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState('');
    // useEffect(()=>{
    //     setSeed(Math.floor(Math.random()*5000),[])
    // })
    useEffect(() => {
        if(id){
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            ));
        }   
    },[id])
    const createChat = ()=>{
        const roomName = prompt("Please enter name for chat room");
        if(roomName){
            //do some clever clever database stuff
           console.log(roomName);
           
            db.collection('Rooms').add(
               {
                   name:roomName
               }
           )
            
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`}/>
                <div className="sidebarChat_info">
                    <h2 style={{textTransform:"capitalize"}}>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat}
        className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat;
