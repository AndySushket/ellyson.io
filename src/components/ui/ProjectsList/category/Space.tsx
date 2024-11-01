import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/Space/Galaxy">Galaxy</Link>
        </Button>
        <Button>
            <Link to="/Space/Earth">Earth</Link>
        </Button>
        <Button>
            <Link to="/Space/Planet">Planet</Link>
        </Button>
    </div>
</Row>;
