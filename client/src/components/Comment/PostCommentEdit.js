import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { editPostComment, getPostCommentsById } from "../../Managers/CommentManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";

export const PostCommentEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const { commentId } = useParams();
    const postId = location.state.postId;
 

    const [editedPostComment, setEditedPostComment] = useState({
        body: "",
        createDateTime: Date.now(),
        userProfileId: aewrUserObject.id,
        postId: postId,
    })

    console.log("post comment id:", commentId)
    console.log("post id:", postId)
    

    useEffect(() => {
        getPostCommentsById(commentId)
            .then((res) => {
                setEditedPostComment(res)
            })
    }, [commentId, getPostCommentsById]);
    
    if (!editedPostComment) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const postCommentToChange = {
            id: commentId,
            body: editedPostComment.body,
            createDateTime: new Date().toISOString(),
            userProfileId: aewrUserObject.id,
            postId: postId,
        };


        return editPostComment(postCommentToChange)
            .then(() => {
                navigate(`/posts/${postId}`)
            })
    };

    console.log(editedPostComment)
    console.log(editedPostComment.id)

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="body">Edit Your Comment</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Type comment here..."
                                    value={editedPostComment.body}
                                    onChange={
                                        (e) => {
                                            const copy = { ...editedPostComment }
                                            copy.body = e.target.value
                                            setEditedPostComment(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            color="info"
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        >
                            Submit
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
