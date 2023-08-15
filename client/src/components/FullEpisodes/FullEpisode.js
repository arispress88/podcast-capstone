import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllEpisodes, deleteEpisode } from "../../Managers/FullEpisodeManager";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter, Alert } from "reactstrap"

export const FullEpisode = ({ fullEpisode }) => {
    const [fullEpisodes, setFullEpisodes] = useState([]);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        getAllEpisodes()
        .then(fullEpisodes => setFullEpisodes(fullEpisodes))
    }, [])

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const isAdmin = loggedInUser?.userType?.id === 1;

    const handleDelete = () => {
        deleteEpisode(fullEpisode.id).then(() => {
            setShowAlert(false)
            navigate("/fullepisodes")
        });
    }

    const handleCancel = () => {
        setShowAlert(false)
    }

    const deleteEpisodeAlert = () => {
        return (<>
        <Alert color="danger" key={'danger'}>
            You are about to delete an episode. This action cannot be undone. Are you sure you want to continue?
            <br></br><Link onClick={handleDelete}>Yes</Link> | <Link onClick={handleCancel}>No</Link>
        </Alert>
        </>)
    }

    const deleteButtonForAdmin = () => {
        if (isAdmin) {
            return (<>
                <Button
                    color="danger"
                    type="delete"
                    size="sm"
                    onClick={() => setShowAlert(true)}
                >Delete</Button>
                {showAlert && deleteEpisodeAlert()}
            </>)
        }
    }

    return (
        <Card
            body
            className="text-center"
            style={{width: '100%'}}
        >
            <CardBody>
                <CardTitle tag="h5">
                    <Link to={fullEpisode.episodeUrl}>{fullEpisode.title}</Link>
                </CardTitle>
                <CardText>
                    Posted on: {new Date(fullEpisode.createDateTime).toLocaleDateString('en-US')}
                </CardText>
            </CardBody>
            <CardFooter>
              <h5>{fullEpisode.category?.name}</h5>  
            </CardFooter>
            {deleteButtonForAdmin()}
        </Card>
    )
}