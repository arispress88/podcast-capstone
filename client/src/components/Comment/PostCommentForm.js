import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPostComment } from "../../Managers/CommentManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";
import { getPostById } from "../../Managers/PostManager";

export const PostCommentForm = () => {
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser);
    const navigate = useNavigate();
    
    const [postComment, update] = useState({
        body: "",
        createDateTime: Date.now(),
        userProfileId: aewrUserObject.id,
        postId: 0,
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const postCommentToAPI = {
            Body: postComment.body,
            CreateDateTime: new Date().toISOString(),
            UserProfileId: aewrUserObject.id,
            postId: postComment.postId
        };

        return addPostComment(postCommentToAPI).then(navigate("/posts"))
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="body">Enter Your Comment</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Type comment here..."
                                    value={postComment.body}
                                    onChange={
                                        (e) => {
                                            const copy = {...postComment}
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