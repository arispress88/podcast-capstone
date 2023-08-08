import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { editPostComment, getPostCommentsById } from "../../Managers/CommentManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";

export const PostCommentEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const { postCommentId } = useParams();
 

    const [postComment, update] = useState({
        body: "",
        createDateTime: Date.now(),
        userProfileId: aewrUserObject.id,
    })

    useEffect(() => {
        getPostCommentsById(postCommentId)
            .then((postCommentArray) => {
                update(postCommentArray)
            })
    }, [postCommentId]);

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const postCommentToChange = {
            Id: parseInt(postCommentId),
            Body: postComment.body,
            CreateDateTime: postComment.createDateTime,
            UserProfileId: aewrUserObject.id,
        };


        return editPostComment(postCommentToChange)
            .then(() => {
                navigate("/posts")
            })
    };

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
                                    value={postComment.body}
                                    onChange={
                                        (e) => {
                                            const copy = { ...postComment }
                                            copy.body = e.target.value
                                            update(copy)
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
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
