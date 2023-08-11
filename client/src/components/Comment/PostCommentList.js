import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Button } from "reactstrap";
import { getPostCommentsById } from "../../Managers/CommentManager";
import { PostComment } from "./PostComment";
import '../Post/Post.css';

export const PostCommentList = () => {
    const [postComments, setPostComments] = useState([]);
    const { postId } = useParams();
    const navigate = useNavigate();

    const getPostComments = (postId) => {
        getPostCommentsById(postId).then((allPostComments) => setPostComments(allPostComments));
    };

    useEffect(() => {
        getPostComments(postId);
    }, [postId]);

    const create = () => {
        navigate("/postcomment/add", {state:{postId: postId}})
    };

    return (
        <div className="comments text-center">
            <h3 className="posts-title">Comments</h3>
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