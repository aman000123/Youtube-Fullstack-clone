
import styled from 'styled-components'
import Imges from "../img/corey-frederick.png";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  width:100%;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.div`
  font-size: 13px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.div`
  font-size: 14px;
`;

const CommentSet = styled.div`
display:flex;
color: ${({ theme }) => theme.textSoft};
justify-content: space-between;
width:100%;`




const Comment = ({ comment, onDeleteComment }) => {

  //fetch user.chanel name
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:4004/api/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };
    fetchChannel();
  }, [comment.userId]);








  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <CommentSet>
          <Text>{comment.desc} </Text>
          <MoreVertIcon style={{ cursor: "pointer" }}
            onClick={() => onDeleteComment(comment._id, comment.userId, comment.videoId)}
          />
        </CommentSet>

      </Details>

    </Container>
  )
}

export default Comment