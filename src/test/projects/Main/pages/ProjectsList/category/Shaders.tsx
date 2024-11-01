import {Row} from "react-bootstrap";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default () => <Row>
    <div>
        <Button>
            <Link to="/Shaders/Shader1">Shader1</Link>
        </Button>
        <Button>
            <Link to="/Shaders/Shader2">Shader2</Link>
        </Button>
        <Button>
            <Link to="/Shaders/Shader3">Shader3</Link>
        </Button>
        <Button>
            <Link to="/Shaders/Shader4">Shader4</Link>
        </Button>
    </div>
</Row>;
