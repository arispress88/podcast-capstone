import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter, Alert } from "reactstrap";
import { deletePostComment, getPostCommentsById } from "../../Managers/CommentManager";

export const PostComment = ({ postComment }) => {
    const [postComments, setPostComments] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {
        getPostCommentsById(postId)
            .then(postComments => setPostComments(postComments))
    }, [postId]);

    const handleDelete = () => {
        deletePostComment(postComment.id).then(() => {
            setShowAlert(false)
            navigate(`/posts/${postComment.post?.id}`)
        });
    };

    const handleCancel = () => {
        setShowAlert(false)
    };

    const deleteCommentAlert = () => {
        return( <>
        <Alert color="danger" key={'danger'}>
            You are about to delete this comment. Continue?
            <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
            </Alert>
            </>)
    }
    

    const editButtonForUser = () => {
        if (postComment.userProfileId === aewrUserObject.id) {
            return <>
            <Button color="warning" onClick={() => navigate(`/postcomment/edit/${postComment.id}`, {state:{postId: postId}})}>
                Edit
            </Button>
            </>
        }
    }

    const deleteButtonForUser = () => {
        if(postComment.userProfileId === aewrUserObject.id) {
            return <>
            <Button
                color="danger"
                type="delete"
                onClick={() => {
                    setShowAlert(true);
                }}>
                    Delete
                </Button>
                {showAlert && deleteCommentAlert()}
            </>
        }
    }

    return (
        <Card className="m-4" color="light">
            <CardBody>
                <CardText>
                    {postComment.body}
                </CardText>
                <CardFooter>
                    Posted by: <Link to={`/userprofiles/${postComment.userProfileId}`}>{postComment.userProfile?.displayName} </Link>
                    on: {new Date(postComment.createDateTime).toLocaleDateString('en-US')}.
                </CardFooter>
                {deleteButtonForUser()}
                {editButtonForUser()}
            </CardBody>
        </Card>
    )
}