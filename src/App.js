import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import { BandList } from "./components/BandList";
import { AddBand } from "./components/AddBand";
import {Chart} from './components/Chart'

const connectSocket = () => {

  const socketconnection = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socketconnection;
};



const App = () => {
  const [socket] = useState(connectSocket());
  const [online, setOnline] = useState(false);
  const [bands,setBands]=useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])

  useEffect(() => {socket.on('connect',()=>{setOnline(true)});}, [socket])

  useEffect(() => {socket.on('disconnect',()=>{setOnline(false)})}, [socket])

  useEffect(() => {socket.on('current-list',(data)=>{setBands(data)})}, [socket])

  const vote=(id)=>{
    socket.emit('voteband',{id})
  }

  const deleteBand=(id)=>{
    socket.emit('deleteband',{id})
  }
  const addBand=(name)=>{
    socket.emit('addband',{name})
  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          service Status:
          {online?<span className="text-success"> online</span>:  <span className="text-dager"> offline</span> }
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
          data={bands}
          vote={vote}
          deleteBand={deleteBand}
       
          />
        </div>
        <div className="col-4">
          <AddBand
             addBand={addBand}
          />
        </div>
        <Chart
        datachart={bands}
        />
      </div>
    </div>
  );
};

export default App;
