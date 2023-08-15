import { useEffect, useState } from "react";
import { getAllEpisodes, deleteEpisode } from "../../Managers/FullEpisodeManager";
import { Col, Container, Row, Button, Alert } from "reactstrap";
import { FullEpisode } from "./FullEpisode";
import { Link, useNavigate } from "react-router-dom";
import '../Post/Post.css';

export const FullEpisodeList = () => {
    const [fullEpisodes, setFullEpisodes] = useState([]);
    const navigate = useNavigate();

    const getEpisodes = () => {
        getAllEpisodes().then(allEpisodes => setFullEpisodes(allEpisodes))
    };

    useEffect(() => {
        getEpisodes()
    }, []);

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const isAdmin = loggedInUser?.userType?.id === 1;

    const create = () => {
        navigate("/fullepisodes/add")
    }

    return (
        <div className="episodes text-center">
            <h2 className="posts-title">Latest Episodes (Available on Spotify)</h2>
            {isAdmin && (
                <Button
                    color="info"
                    size="sm"
                    onClick={create}
                >Add Episode</Button>
            )}
            <Container
                className="bg-light border"
                fluid
            >
                <Row>
                    {fullEpisodes.map((fullEpisode) => (
                        <Col lg="3" key={fullEpisode.id}>
                            <FullEpisode fullEpisode={fullEpisode} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}