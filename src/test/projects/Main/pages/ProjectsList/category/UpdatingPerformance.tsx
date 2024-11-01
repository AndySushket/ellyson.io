import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/remakeTutorialWorks/thanosPortal">
                Thanos Portal
            </Link>
        </Button>
        <Button>
            <Link to="/remakeTutorialWorks/rain">Rain</Link>
        </Button>
    </div>
</Row>;
