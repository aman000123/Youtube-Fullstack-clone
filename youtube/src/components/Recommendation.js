

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
const Container = styled.div`
  flex: 2;
`;


const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`http://localhost:4004/api/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

    return (
        <Container>
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </Container>
    );
};
export default Recommendation