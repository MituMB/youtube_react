import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from 'axios';

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "320px"};
margin-bottom:  ${(props) => props.type === 'sm' ? '10px' : '45px'};
cursor: pointer;
display: ${(props) => props.type === 'sm' && 'flex'};
gap: 10px;
`;

const Image = styled.img`
width:100%;
height:  ${(props) => props.type === 'sm' ? '120px' : '202px'};
background-color:#999;
flex: 1;

`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};;
  gap: 12px;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === 'sm' && 'none'};
`;
const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Card = ({type,video}) => {
  
  const [channels, setchannels] = useState({})
  useEffect(() => {
    const fetchChannels = async () =>{
      const res = await axios.get(`/users/find/${video.userId}`)
      setchannels(res.data)
    }
    fetchChannels()
 
  }, [video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
    <Container type={type}>
        {/* <Image type={type}  src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"/> */}
        <Image type={type}  src={video.imgUrl}/>
        <Details type={type}>
        <ChannelImage type={type}

            src={channels.img}
          />
           <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channels.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
    </Container>
    </Link>
  )
}

export default Card