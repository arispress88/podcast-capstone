import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap"
import { getAllClips } from "../../Managers/ClipManager";


export const Clip = ({ clip }) => {
    const [clips, setClips] = useState([]);

    const iframe_container = {
        left: 0,
        width: "100%",
        height: 500,
        position: "relative",
      };
    
      const iframe = {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        border: 0,
      };
    
      return (
        <>
          <div className={iframe_container}>
            <iframe
              src={`https://www.tiktok.com/embed/${clip.urlData}`}
              className={iframe}
              allowFullScreen
              allow="encrypted-media;"
            ></iframe>
          </div>
          <h4>Posted on: {new Date(clip.createDateTime).toLocaleDateString("en-US")}</h4>
          <h5>{clip.category?.name}</h5>
        </>
    );
}; 