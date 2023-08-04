import { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "reactstrap";
import { getAllClips } from "../../Managers/ClipManager";
import { Clip } from "./Clip";
import { useNavigate } from "react-router-dom";

export const WCWClip = () => {
    const [clips, setClips] = useState([]);
    const navigate = useNavigate();

    const getWcwClips = () => {
        getAllClips().then(allClips => {
            const filteredClips = allClips.filter(clip => clip.categoryId === 2)
            setClips(filteredClips)
        });
    }

    useEffect(() => {
        getWcwClips()
    }, []);

    return (
        
        <div className="clips text-center">
            <h2>Clips from WCW Episodes</h2>
            <Container
                className="bg-light border"
                fluid
            >
                <Row>
                   {
                    clips.filter(clip => clip.categoryId === 2)
                        .map(clip => (
                            <Col lg="3" key={clip.id}>
                                <Clip clip={clip} />
                            </Col>
                        ))
                   }
                </Row>
            </Container>
        </div>
    ) 
}