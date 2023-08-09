import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { editClipComment, getClipCommentsById } from "../../Managers/CommentManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";

export const ClipCommentEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const { commentId } = useParams();
    const clipId = location.state.clipId

    const [editedClipComment, setEditedClipComment] = useState({
        body: "",
        createDateTime: Date.now(),
        userProfileId: aewrUserObject.id,
        clipId: clipId
    })

    console.log("clip comment id:", commentId)
    console.log("clip id:", clipId)

    useEffect(() => {
        getClipCommentsById(commentId)
            .then((res) => {
                setEditedClipComment(res)
            })
    }, [commentId, getClipCommentsById]);

    if (!editedClipComment) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const clipCommentToChange = {
            id: commentId,
            body: editedClipComment.body,
            createDateTime: new Date().toISOString(),
            userProfileId: aewrUserObject.id,
            clipId: clipId
        };

        return editClipComment(clipCommentToChange)
            .then(() => {
                navigate(`/clips/${clipId}`)
            })
    };

    console.log(editedClipComment)
    console.log(editedClipComment.id)

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
                                    value={editedClipComment.body}
                                    onChange={
                                        (e) => {
                                            const copy = { ...editedClipComment }
                                            copy.body = e.target.value
                                            setEditedClipComment(copy)
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