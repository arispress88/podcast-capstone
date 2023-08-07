import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Button } from "reactstrap";
import { getPostCommentsById } from "../../Managers/CommentManager";
import { PostComment } from "./PostComment";

export const PostCommentList = () => {
    const [postComments, setPostComments] = useState([]);
    const { id, postId } = useParams();
    const navigate = useNavigate();

    const getPostComments = (id, postId) => {
        getPostCommentsById(id, postId).then((allPostComments) => setPostComments(allPostComments));
    };

    useEffect(() => {
        getPostComments(id, postId);
    }, [postId]);

    const create = () => {
        navigate("/postcomment/add")
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
                {postComments.map((postComment) => ( 
                    <Col className="bg-light border" key={postComment.id}>
                        <PostComment postComment={postComment} />
                    </Col>
                ))}
            </Container>
        </div>
    )
}