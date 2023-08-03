import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";
import { addClip } from "../../Managers/ClipManager";
import { getAllCategories } from "../../Managers/CategoryManager";

export const AddClip = () => {
    const navigate = useNavigate();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    }

    useEffect(() => {
        getCategories()
    }, [])

    const [clip, update] = useState({
        clipUrl: "",
        urlData: "",
        createDateTime: Date.now(),
        categoryId: 0
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const clipToSendToAPI = {
            ClipUrl: clip.clipUrl,
            UrlData: clip.urlData,
            CreateDateTime: new Date().toISOString(),
            CategoryId: clip.categoryId
        }

        return addClip(clipToSendToAPI).then(navigate("/clips"))
    }

    const selectList = (event) => {
        const copy = {...clip}
        copy.categoryId = event.target.value
        update(copy)
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="category-select">Company</Label>
                                <select 
                                    id="type"
                                    value={clip.categoryId}
                                    onChange={event => selectList(event)}
                                >
                                    <option value="0">Pick a company</option>
                                    {
                                        categories.map(category => {
                                            return <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="clipUrl">Clip URL</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="ex. https://www.tiktok.com/@aewrpod316/video/7258259865804573995"
                                    value={clip.clipUrl}
                                    onChange={
                                        (event) => {
                                            const copy = {...clip}
                                            copy.clipUrl = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="urlData">URL Numbers</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="ex. 7258259865804573995"
                                    value={clip.urlData}
                                    onChange={
                                        (event) => {
                                            const copy = {...clip}
                                            copy.urlData = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                        </Form>
                        <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
                        <Button color="success" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                            Add Clip
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};