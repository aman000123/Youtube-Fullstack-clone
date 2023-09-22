

import styled from 'styled-components'
import Comment from './comment'
import Imges from "../img/corey-frederick.png";
import { useEffect, useState } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { currentUser } from "../redux/userSlice"
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify'


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Icon = styled.div`
color: ${({ theme }) => theme.text};
cursor:pointer;`

const Comments = ({ videoId }) => {

  const [comments, setComments] = useState([])

  useEffect(() => {

    const fetchComment = async () => {
      try {

        const res = await axios.get(`http://localhost:4004/api/comments/${videoId}`);
        console.log("comments get", res.data)
        setComments(res.data.reverse())//get data latest in respect  time data reverse 
      }
      catch (err) {
        console.log("erro in fetch comment", err)

      }

    }
    fetchComment()
  }, [videoId])

  const { currentUser } = useSelector((state) => state.user)
  const [comment, setComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const axiosForComment = axios.create({
        withCredentials: true,
      });

      const res = await axiosForComment.post("http://localhost:4004/api/comments", { desc: comment, videoId }, { withCredentials: true, });
      // console.log("comments send  data", res.data)

      // Add the new comment to the comments state

      setComments([res.data, ...comments,]);

      // Assuming res.data is the new comment object


      // Clear the comment input field
      setComment("");

    } catch (err) {
      // toast.error(err.response.data.message)
      console.log("erro in comments", err)

    }

  }



  const handleDeleteComment = async (commentId, userId, videoId) => {
    try {



      // console.log("commentId ===", commentId);
      // console.log("userId ===", userId);
      // console.log("userid name", currentUser.name)
      // console.log("videoId ===", videoId);

      const axiosForComment = axios.create({
        withCredentials: true,
      });

      const res = await axiosForComment.delete(
        `http://localhost:4004/api/comments/${commentId}?userId=${userId}&videoId=${videoId}`
      );
      if (res.status === 200) {
        // Remove the deleted comment from the state
        setComments(comments.filter(comment => comment._id !== commentId));
      }
    } catch (err) {
      //change username first letter into capital 
      toast.error(`Hello! ` +
        `${currentUser.name.charAt(0).toUpperCase() +
        currentUser.name.slice(1)}` +
        `${err.response.data.message}`)

      console.error("Error deleting comment", err);
    }
  };



  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder='Add a comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <Icon><SendIcon onClick={handleComment} /></Icon>
      </NewComment>
      {
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onDeleteComment={handleDeleteComment} />
        ))
      }


    </Container>
  )
}

export default Comments 