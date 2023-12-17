import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from "styled-components";
import Card from '../components/Card';
import axios from 'axios';


const Container = styled.div`
display: flex;
 flex-flow: row wrap;
 gap:15px;
  /* justify-content: space-between; */
  /* padding:0 20px; */
`;


const Home = ({type}) => {

  const [videos, setvideos] = useState([])
  useEffect(() => {
    const fetchVideos = async () =>{
      const res = await axios.get(`/videos/${type}`)
      setvideos(res.data)
    }
    fetchVideos()
 
  }, [type])
  
  return (
    <Container>
      {
        videos.map(video =>(

          <Card key={video._id} video={video}/>
        ))
      }
       
    </Container>
  )
}

export default Home