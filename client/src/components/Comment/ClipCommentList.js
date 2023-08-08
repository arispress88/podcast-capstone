import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Button } from "reactstrap";
import { getClipCommentsById } from "../../Managers/CommentManager";
import { ClipComment } from "./ClipComment";

export const ClipCommentList = () => {
    const [clipComments, setClipComments] = useState([]);
    const { id, clipId } = useParams();
    const navigate = useNavigate();

    const getClipComments = (id, clipId) => {
        getClipCommentsById(id, clipId).then((allClipComments) => setClipComments(allClipComments))
    };

    useEffect(() => {
        getClipComments(id, clipId)
    }, [clipId]);

    const create = () => {
        navigate("/clipcomment/add", {state:{clipId: clipId}})
    };

    return (
        <div className="comments text-center">
            <h3>Comments</h3>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Button color="primary" onClick={create}>
                Add Comment
            </Button>
            <Container
                className="bg-light border"
                fluid="xl"
            >
                {clipComments.map((clipComment) => (
                    <Col className="bg-light border" key={clipComment.id}>
                        <ClipComment clipComment={clipComment} />
                    </Col>
                ))}
            </Container>
        </div>
    )
}