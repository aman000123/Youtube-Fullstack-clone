
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrappper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 16px;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const VideoUpload = styled.div`
cursor: pointer;`

const Navbar = () => {

  const { currentUser } = useSelector(state => state.user)

  const [open, setOpen] = useState(false)

  const [q, setQ] = useState("");


  const navigate = useNavigate()

  return (
    <>
      <>
        <Container>
          <Wrappper>
            <Search>
              <Input placeholder="Just Search" onChange={(e) => setQ(e.target.value)} />
              <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
              {currentUser ?

                (<User>
                  <VideoUpload><VideoCallOutlinedIcon onClick={() => setOpen(true)}>
                  </VideoCallOutlinedIcon></VideoUpload>
                  <Avatar src={currentUser.img} />
                  {currentUser.name}
                </User>
                )

                : (<Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}> <Button><AccountCircleOutlinedIcon /> Sign in</Button>
                </Link>)}  </Search>
          </Wrappper>
        </Container >
        {open && <Upload setOpen={setOpen} />}
      </>

    </>
  )
}
export default Navbar