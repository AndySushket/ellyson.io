import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/SomeWorks/Aviator">Aviator</Link>
        </Button>
        <Button>
            <Link to="/SomeWorks/PointLights">PointLights</Link>
        </Button>
        <Button>
            <Link to="/testWork/House">House</Link>
        </Button>
        <Button>
            <Link to="/ThreeJsJourney/Texture">Texture</Link>
        </Button>
    </div>
</Row>
