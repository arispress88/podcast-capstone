import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllEpisodes } from "../../Managers/FullEpisodeManager";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap"

export const FullEpisode = ({ fullEpisode }) => {
    const [fullEpisodes, setFullEpisodes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEpisodes()
        .then(fullEpisodes => setFullEpisodes(fullEpisodes))
    }, [])

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
                    Posted on: {new Date(fullEpisode.createDateTime).toLocaleDateString('en-US')}.
                </CardText>
            </CardBody>
            <CardFooter>
              <h5>{fullEpisode.category?.name}</h5>  
            </CardFooter>
        </Card>
    )
}