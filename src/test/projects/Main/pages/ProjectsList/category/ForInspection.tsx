import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/OtherPeoplesWork/Portal">Portal</Link>
        </Button>
        <Button>
            <Link to="/OtherPeoplesWork/Benares">Benares</Link>
        </Button>
    </div>
</Row>
