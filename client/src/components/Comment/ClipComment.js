import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter, Alert } from "reactstrap";
import { deleteClipComment, getClipCommentsById } from "../../Managers/CommentManager";

export const ClipComment = ({ clipComment }) => {
    const [clipComments, setClipComments] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const { clipId } = useParams();

    useEffect(() => {
        getClipCommentsById()
            .then(clipComments => setClipComments(clipComments))
    }, [clipId]);

    const handleDelete = () => {
        deleteClipComment(clipComment.id).then(() => {
            setShowAlert(false)
            navigate(`/clipcomment/getclipcomments/${clipId}`)
        });
    };

    const handleCancel = () => {
        setShowAlert(false)
    }

    const deleteCommentAlert = () => {
        return( <>
        <Alert color="danger" key={'danger'}>
            You are about to delete this comment. Continue?
            <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
            </Alert>
            </>)
    }

    const editButtonForUser = () => {
        if (clipComment.userProfileId === aewrUserObject.id) {
            return <>
            <Button color="warning" onClick={() => navigate(`/clipcomment/edit/${clipComment.id}`, {state:{clipId: clipId}})}>
                Edit
            </Button>
            </>
        }
    }

    const deleteButtonForUser = () => {
        if(clipComment.userProfileId === aewrUserObject.id) {
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
                    {clipComment.body}
                </CardText>
                <CardFooter>
                    Posted by: <Link to={`/userprofiles/${clipComment.userProfileId}`}>{clipComment.userProfile?.displayName} </Link>
                    on: {new Date(clipComment.createDateTime).toLocaleDateString('en-US')}.
                </CardFooter>
                {deleteButtonForUser()}
                {editButtonForUser()}
            </CardBody>
        </Card>
    )
}
