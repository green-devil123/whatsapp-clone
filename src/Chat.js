import React, {useState,useEffect} from 'react'
import './Chat.css';
import { Avatar,IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './firebase';
import firebase from "firebase";
import {useStateValue} from './StateProvider'

function Chat() {
 
    // const [seed,setSeed] = useState('');
    const [input,setInput] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();
    console.log(useParams());
    
    // useEffect(()=>{
    //     setSeed(Math.floor(Math.random()*5000),[])
    // })
    useEffect(()=>{
        if(roomId){
            db.collection('Rooms')
                .doc(roomId)
                .onSnapshot((snapshot)=>setRoomName(snapshot.data().name));
            console.log(roomId);
            
            db.collection('Rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    },[roomId]);

    const sendMessage = (e)=>{
        e.preventDefault();
        console.log(`let see ${input}`);
        db.collection('Rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }
    const inputChange =(ev)=>{
        setInput(ev.target.value);
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {new Date(
                            messages[messages.length-1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message => (
                    <p className={`chat_message ${user.displayName === message.name && "chat_receiver"}`}>
                    <span className="chat_name">
                        {message.name}
                    </span>
                        {message.message}
                    <span className="chat_timestamp">
                        {
                            new Date(message.timestamp?.toDate()).toUTCString()
                        }
                    </span> 
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type="text" placeholder="Type a message ..." value={input} onChange={inputChange}/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat;
