import styled from "styled-components"

import Images from "../img/corey-frederick.png"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Logo from "../img/yt-logo.jpg"
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";

import { subscription } from "../redux/userSlice"
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
display:flex;
gap:24px;`;

const Content = styled.div`
flex:5`;

const VideoWrapper = styled.div`
`;


const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;


const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {


  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")[2];
  // console.log(path) fetch video is from path
  //  console.log("currentVideo", currentVideo, path)


  const [chanel, setChanel] = useState({})



  useEffect(() => {

    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:4004/api/videos/find/${path}`)
        const chanelRes = await axios.get(`http://localhost:4004/api/users/find/${videoRes.data.userId}`);
        //  console.log("videoRes.data.userid", videoRes.data.userId)
        setChanel(chanelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      }
      catch (err) {

      }

    }
    fetchData()

  }, [path, dispatch])
  //console.log('currentVideo?.desc,', currentVideo?.desc,)


  const handleLike = async () => {

    // Create an Axios instance for liking videos
    const axiosForLike = axios.create({
      withCredentials: true,
    });



    await axiosForLike.put(`http://localhost:4004/api/users/like/${currentVideo._id}`)
    console.log('like(currentUser._id)', like(currentUser._id))
    dispatch(like(currentUser._id))

  }

  const handleDislike = async () => {


    // Create an Axios instance for disliking videos
    //when we cliked on like and dislike then token Unauthenticated  shows then solve with create instance
    const axiosForDislike = axios.create({
      withCredentials: true,
    });

    await axiosForDislike.put(`http://localhost:4004/api/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }



  const handleSubscribe = async () => {

    const axiosForSub = axios.create({
      withCredentials: true,
    });




    currentUser.subscribeUsers?.includes(chanel._id)

      ? await axiosForSub.put(`http://localhost:4004/api/users/unsub/${chanel._id}`)



      : await axiosForSub.put(`http://localhost:4004/api/users/sub/${chanel._id}`);
    dispatch(subscription(chanel._id))
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views .  {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>

              {/*check whether user id inside likes button or not*/}
              {currentVideo.likes?.includes(currentUser._id) ?
                (
                  <ThumbUpIcon />
                ) : (<ThumbDownIcon />)}{currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id) ? (<ThumbDownIcon />)
                : (<ThumbDownOffAltOutlinedIcon />)

              }Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon />Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon />Save
            </Button>
          </Buttons>


        </Details>
        <Hr />

        <Channel>
          <ChannelInfo>
            <Image src={chanel.img} />
            <ChannelDetail>
              <ChannelName>{chanel.name}</ChannelName>
              <ChannelCounter>{chanel.subscriber} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>{currentUser.subscribeUsers?.includes(chanel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />


      </Content>
      <Recommendation tags={currentVideo.tags} />


    </Container>
  )
}

export default Video