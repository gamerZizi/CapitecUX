import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TabsView from './components/TabsView.jsx';
import React from 'react';
import axios from 'axios';


function App() {
    const [array, setArray] = useState([]);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:3000");
        setArray(response.data.blogPost);
    }  
    useEffect(() => {
        fetchData();
    },[])

  return (
    <>
      <Header />
          <Hero />
          <TabsView />
          <ul>
          {
            array?.map((blog,index) => (
                <li key={index}>
                <p>{blog.title}</p>
                <p>{blog.content}</p>
                </li>

            ))
          }
          </ul>

 </>
  );
}

export default App
