import { useEffect, useState } from "react";
import { getAllClips } from "../../Managers/ClipManager";
import { Col, Container, Row, Button } from "reactstrap";
import { Clip } from "./Clip";
import { useNavigate } from "react-router-dom";

export const ClipList = () => {
    const [clips, setClips] = useState([]);
    const navigate = useNavigate();

    const getClips = () => {
        getAllClips().then(allClips => setClips(allClips))
    };

    useEffect(() => {
        getClips()
    }, []);

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const isAdmin = loggedInUser?.userType?.id === 1;

    const create = () => {
        navigate("/clips/add")
    }

    return (
        <div className="clips text-center">
            <h2>Clips from the Show</h2>
            {isAdmin && (
                <Button
                    color="info"
                    size="sm"
                    onClick={create}
                >Add Clip</Button>
            )}
            <Container
                className="bg-light border"
                fluid
            >
                <Row>
                {clips.map((clip) => (
                    <Col lg="3" key={clip.id}>
                        <Clip clip={clip} />
                    </Col>
                ))}
                </Row>
            </Container>
        </div>
    )
}