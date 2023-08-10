import { useEffect, useState } from "react";
import { getAllEpisodes } from "../../Managers/FullEpisodeManager";
import { Col, Container, Row, Button } from "reactstrap";
import { FullEpisode } from "./FullEpisode";
import { useNavigate } from "react-router-dom";

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
        navigate("/") //TODO: ADD FULL EPISODE LINK
    }

    return (
        <div className="episodes text-center">
            <h2>Latest Episodes (Available on Spotify)</h2>
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