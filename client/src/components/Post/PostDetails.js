import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Alert } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../../Managers/PostManager";
import { getPostCommentsById } from "../../Managers/CommentManager";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const postComment = getPostCommentsById();

    useEffect(() => {
        getPostById(id).then(setPost)
    }, [id])

    if (!post) {
        return null;
    }

    const handleDelete = () => {
        deletePost(post.id).then(() => {
            setShowAlert(false)
            navigate("/posts")
        });
    };

    const handleCancel = () => {
        setShowAlert(false)
    }

    const deletePostAlert = () => {
        return (<>
        <Alert color="danger" key={'danger'}>
            You are about to delete this post. Continue?
            <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
        </Alert>
        </>)
    }

    const deleteButtonForUser = () => {
        if (post.userProfileId === aewrUserObject.id) {
            return <>
            <Button
                color="danger"
                type="delete"
                onClick={() => {
                    setShowAlert(true);
                }}>
                    Delete
                </Button>
                {showAlert && deletePostAlert()}
            </>
        }
    }

    const editPostButtonForUser = () => {
        if (post.userProfileId === aewrUserObject.id) {
        return <>
        <Button color="warning" onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit</Button>
        </>
    }}

    const viewComments = () => {
        return <>
            <Button color="primary" onClick={() => navigate(`/postcomment/getpostcommentsbypostid/${post.id}`)}>View Comments</Button></>
    }

    return (
        <div className="posts text-center">
        <Card>
            <CardTitle><b>{post.title}</b></CardTitle>
            <CardBody>
                <CardText>Posted by: <Link to={`/userprofiles/${post.userProfileId}`}><b>{post.userProfile?.displayName}</b> </Link>
                on {post.createDateTime}</CardText>
                <CardText>
                {post.body}
                </CardText>
                
                {deleteButtonForUser()}
                {editPostButtonForUser()}
                {viewComments()}                
            </CardBody>
        </Card>
        <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
};