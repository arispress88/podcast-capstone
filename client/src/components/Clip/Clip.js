import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClips } from "../../Managers/ClipManager";
import { TikTokEmbed } from "react-social-media-embed";
import { Button } from "reactstrap";


export const Clip = ({ clip }) => {
  const [clips, setClips] = useState([]);
  const navigate = useNavigate();

  
  return (
    <><>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TikTokEmbed url={clip.clipUrl} width={325} />
      </div>
      <h4>Posted on: {new Date(clip.createDateTime).toLocaleDateString("en-US")}</h4>
      <Link to={"/category"}><h5>{clip.category?.name}</h5></Link>
    </><>
        <Button
          color="primary"
          onClick={() => navigate(`/clips/${clip.id}`)}
        >
          Details
        </Button>
      </></>
  );
}; 