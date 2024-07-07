import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/musicVisualization/MusicVisualization">
                MusicVisualization
            </Link>
        </Button>
    </div>
</Row>;
