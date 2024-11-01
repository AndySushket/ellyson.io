import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/mainFunc/PositionRotationScale">
                Position Rotation Scale
            </Link>
        </Button>
        <Button>
            <Link to="/mainFunc/Quaternion">Quaternion</Link>
        </Button>
        <Button>
            <Link to="/mainFunc/Matrix">Matrix</Link>
        </Button>
    </div>
</Row>;
