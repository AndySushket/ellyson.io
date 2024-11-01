import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/akella/Pepyaka">Pepyaka</Link>
        </Button>
        <Button>
            <Link to="/akella/DisplacedBox">Displaced Box</Link>
        </Button>
        <Button>
            <Link to="/akella/TriangleWallpaper">
                TriangleWallpaper
            </Link>
        </Button>
        <Button>
            <Link to="/akella/CreepingStripes">Creeping stripes</Link>
        </Button>
    </div>
</Row>;
