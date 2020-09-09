import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

//connecting to socket server
const socket = io('http://localhost:3000',{
    transports : ['websocket','polling']
});

// fuctional component
const App= ({}) =>{

    // Basically initialising data(state) as an empty array and namaing a function to change its state 
    const [data,setData] = useState([]); 
    
    // useEffect hook is used to determine when the function has to re-run
    // here we are using an empty array which means it will re run only once
    // NOTE - If we antwe can pass a prop as 2nd argument to listen to it. 
    useEffect(()=> {
        // this 'cpu' is being emitted by server.
        socket.on('cpu',(cpuPercent) => {
            setData((currentData) => [...currentData,cpuPercent] );
        })
    },[])

    // rendering the line chart    
    return (
        <div>
            <h1>Real Time CPU Usage</h1>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                
                <Line type="monotone" dataKey="value"/>                
            </LineChart>
        </div>
    )

};

// render the functional compnent and return it with the key 'root'
ReactDOM.render(<App />,document.getElementById('root'));


