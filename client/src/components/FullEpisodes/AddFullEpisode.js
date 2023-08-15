import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";
import { addFullEpisode } from "../../Managers/FullEpisodeManager";
import { getAllCategories } from "../../Managers/CategoryManager";

export const AddFullEpisode = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    }

    useEffect(() => {
        getCategories()
    }, [])

    const [fullEpisode, setFullEpisode] = useState({
        title: "",
        episodeUrl: "",
        createDateTime: Date.now(),
        categoryId: 0
    });

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const newFullEpisode = {
            Title: fullEpisode.title,
            EpisodeUrl: fullEpisode.episodeUrl,
            CreateDateTime: new Date().toISOString(),
            CategoryId: fullEpisode.categoryId
        }

        return addFullEpisode(newFullEpisode).then(() => navigate("/fullepisodes"));
    }

    const selectList = (event) => {
        const copy = { ...fullEpisode };
        copy.categoryId = event.target.value
        setFullEpisode(copy);
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    value={fullEpisode.title}
                                    onChange={
                                        (event) => {
                                            const copy = { ...fullEpisode }
                                            copy.title = event.target.value
                                            setFullEpisode(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="episodeUrl">Episode Url</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the Spotify URL"
                                    value={fullEpisode.episodeUrl}
                                    onChange={
                                        (event) => {
                                            const copy = { ...fullEpisode }
                                            copy.episodeUrl = event.target.value
                                            setFullEpisode(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryId">Company</Label>
                                <select
                                    id="type"
                                    value={fullEpisode.categoryId}
                                    onChange={event => selectList(event)}
                                >
                                    <option value="0">Choose Company</option>
                                    {
                                        categories.map(category => {
                                            return <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </FormGroup>
                        </Form>
                        <Button color="secondary" onClick={() => navigate(-1)}>Back</Button>
                        <Button color="success" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                            Add Episode
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}